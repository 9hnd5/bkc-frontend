import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import moment from 'moment';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { NOT_EMPTY, ONLY_NUMBER, validation } from "../../../Helpers/validation";
import Tooltip from '../../Commos/Tooltip';
import { MultipleSelect } from '../../Commos/MultipleSelect';
import { callApi } from '../../../Helpers/callApi';
import remove from 'lodash/remove';
import { HTTP_METHOD } from '../../../Constants/appConstants';
import { PICKUP_LOCATION_DEFAULT } from '../../../Constants/bkcConstants';

export const PickupLocationItem = (props) => {
    const [pickupLocation, setPickupLocation] = useState({...PICKUP_LOCATION_DEFAULT});
    const [prevPickupLocation, setPrevPickupLocation] = useState({ ...pickupLocation });
    const [isUpdate, setIsUpdate] = useState(false);
    const [error, setError] = useState({});
    const [prevError, setPrevError] = useState({ ...error });
    const [suggestionsEmployee, setSuggestionsEmployee] = useState([]);
    const [isDisabledGuestNameInput, setIsDisabledGuestNameInput] = useState(false);
    const [isDisabledEmployeeNameInput, setIsDisabledEmployeeNameInput] = useState(false);
    const dispatch = useDispatch();
    function handleClick(event) {
        switch (event) {
            case "update": {
                setIsUpdate(true);
                if (pickupLocation.participants.length > 0) {
                    setIsDisabledEmployeeNameInput(false);
                    setIsDisabledGuestNameInput(true);
                }
                else if (pickupLocation.guest != undefined && pickupLocation.guest.length != 0) {
                    setIsDisabledEmployeeNameInput(true);
                    setIsDisabledGuestNameInput(false);
                } else {
                    setIsDisabledEmployeeNameInput(false);
                    setIsDisabledGuestNameInput(false);
                }
                break;
            }
            case "cancel":
                setIsUpdate(false);
                setPickupLocation({ ...prevPickupLocation });
                setError({ ...prevError });
                break;
            case "save":
                props.onSaveUpdate(pickupLocation);
                setIsUpdate(false);
                setPrevPickupLocation({ ...pickupLocation });
                break;
            case "delete":
                props.onDelete(pickupLocation);
                break;
            default:
                break;
        }
    }
    async function handleChange(e) {
        let validateResult = null;
        switch (e.target.name) {
            case "location": {
                validateResult = validation(e.target.value, [NOT_EMPTY]);
                break;
            }
            case "employeeName": {
                const employeeName = e.target.value;
                if (employeeName.length >= 3) {
                    const res = await callApi(`https://localhost:5001/api/bkc/employees/${employeeName}`, HTTP_METHOD.GET);
                    if(res.status !== 200) return;
                    const employees = res.data
                    const suggestionsEmployee = [];
                    for (let i = 0; i < employees.length; i++) {
                        suggestionsEmployee.push({
                            id: employees[i].id,
                            label: employees[i].name + " " + employees[i].buName,
                            content: employees[i].name
                        });
                    }
                    setSuggestionsEmployee(suggestionsEmployee);
                }
                return;
            }
            case "guest": {
                if (isDisabledGuestNameInput) return;
                const guest = e.target.value;
                if (guest.length <= 0) {
                    setIsDisabledEmployeeNameInput(false);
                    setError({
                        ...error,
                        participants: "participant or guest need to be fill",
                        guest: "participant or guest need to be fill"
                    });
                } else {
                    const cloneError = { ...error };
                    const { guest: gn, participants: emps, ...rest } = cloneError;
                    setError(rest);
                    setIsDisabledEmployeeNameInput(true);
                }
                setPickupLocation({
                    ...pickupLocation,
                    [e.target.name]: e.target.value
                })
                return;
            }
            case "phone": {
                validateResult = validation(e.target.value, [NOT_EMPTY, ONLY_NUMBER]);
            }
            default:
                break;
        }
        if (!validateResult) {
            let { [e.target.name]: a, ...rest } = error;
            setError(rest);
        }
        else {
            setError({
                ...error,
                [e.target.name]: validateResult
            })
        }
        setPickupLocation({
            ...pickupLocation,
            [e.target.name]: e.target.value
        })
    }
    function handleChangeTime(momentObject) {
        let time = null;
        if (typeof momentObject === "string" || momentObject instanceof String) {
            time = moment(momentObject, ["H:m", "H:mm"], true);
            if (time.isValid()) {
                let { time: x, ...rest } = error;
                setError(rest);
            } else {
                setError({
                    ...error,
                    time: "This field is not valid"
                })
            }
            setPickupLocation({
                ...pickupLocation,
                time: time
            })
        } else {
            time = moment(momentObject, ["H:m", "H:mm"], true);
            let { time: x, ...rest } = error;
            setError(rest);
            setPickupLocation({
                ...pickupLocation,
                time: time.format("H:mm")
            })
        }
    }
    function handleSelectedEmployee(item) {
        const participant = {
            employeeId: item.id,
            employeeName: item.content
        }
        const newParticipants = [...pickupLocation.participants, participant];
        setPickupLocation({
            ...pickupLocation,
            participants: newParticipants
        })
        const { participants: emp, guest: gn, ...rest } = error;
        setError(rest);
        setIsDisabledGuestNameInput(true);
    }
    function handleDeleteEmployee(employeeId) {
        const cloneParticipants = [...pickupLocation.participants];
        if (cloneParticipants.length === 1) {
            setIsDisabledGuestNameInput(false);
        }
        if (cloneParticipants.length === 1 && pickupLocation.guest.length === 0) {
            setError({
                ...error,
                participants: "participant or guest need to be fill",
                guest: "participant or guest need to be fill"
            })
        }
        remove(cloneParticipants, (item) => {
            return item.employeeId === employeeId;
        });
        setPickupLocation({
            ...pickupLocation,
            participants: cloneParticipants
        })
    }
    useEffect(() => {
        setPickupLocation(props.pickupLocation);
        setPrevPickupLocation(props.pickupLocation);
    }, [props.pickupLocation]);
    return (
        <tr>
            <td className="w_4">
                {props.index}
            </td>
            <td className="w_12">
                <Tooltip active={error.location ? true : false} content={error.location} direction="top">
                    {isUpdate ? <input onChange={handleChange} value={pickupLocation.location} className="form-control" name="location" /> : pickupLocation.location}

                </Tooltip>
            </td>
            <td className="w_12">
                <Tooltip active={error.time ? true : false} content={error.time} direction="top">
                    {
                        isUpdate ?
                            <Datetime
                                dateFormat={false}
                                timeFormat="H:mm"
                                onChange={handleChangeTime}
                                initialValue={pickupLocation.time}
                            />
                            : pickupLocation.time
                    }
                </Tooltip>
            </td>
            <td className="w_12">
                <Tooltip active={error.participants ? true : false} content={error.participants} direction="top">
                    {
                        isUpdate ?
                            <MultipleSelect
                                suggestions={suggestionsEmployee}
                                onChange={handleChange}
                                className="form-control"
                                name="employeeName"
                                onSelectedItem={handleSelectedEmployee}
                                onDeleteItem={handleDeleteEmployee}
                                initialValue={pickupLocation.participants.map(participant => { return { id: participant.employeeId, content: participant.employeeName } })}
                                isDisabled={isDisabledEmployeeNameInput}
                            />
                            :
                            pickupLocation.participants.map(participant => { return participant.employeeName }).join(", ")
                    }
                </Tooltip>

            </td>
            <td className="w_12">
                <Tooltip active={error.guest ? true : false} content={error.guest} direction="top">
                    {
                        isUpdate ?
                            <input disabled={isDisabledGuestNameInput}
                                onChange={handleChange}
                                value={pickupLocation.guest}
                                className="form-control" name="guest"
                            />
                            : pickupLocation.guest
                    }
                </Tooltip>

            </td>
            <td className="w_12">
                <Tooltip active={error.phone ? true : false} content={error.phone} direction="top">
                    {isUpdate ? <input onChange={handleChange} value={pickupLocation.phone} className="form-control" name="phone" /> : pickupLocation.phone}
                </Tooltip>

            </td>
            <td className="w_12">
                {isUpdate ? <input onChange={handleChange} value={pickupLocation.noteByBooker} className="form-control" name="noteByBooker" /> : pickupLocation.noteByBooker}

            </td>
            <td className="w-10">
                <div className="d-flex justify-content-center">
                    <button
                        disabled={Object.keys(error).length === 0 ? false : true}
                        onClick={() => handleClick(isUpdate ? "save" : "update")}
                        className="btn btn-outline-primary btn-sm mr-2">
                        <i className="fas fa-edit mr-1"></i>
                        {isUpdate ? "LƯU" : "SỬA"}

                    </button>
                    <button
                        onClick={() => handleClick(isUpdate ? "cancel" : "delete")}
                        className="btn btn-outline-danger btn-sm">
                        <i className="fas fa-trash-alt mr-1"></i>
                        {isUpdate ? "HỦY" : "XÓA"}

                    </button>
                </div>
            </td>
        </tr>
    );
}