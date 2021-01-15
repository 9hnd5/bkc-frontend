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

export const PickupLocationItem = (props) => {
    const [pickupLocation, setPickupLocation] = useState(props.pickupLocation);
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
                if (pickupLocation.employees.length > 0) {
                    setIsDisabledEmployeeNameInput(false);
                    setIsDisabledGuestNameInput(true);
                }
                else if (pickupLocation.guestName != undefined && pickupLocation.guestName.length != 0) {
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
            case "pickupLocation": {
                validateResult = validation(e.target.value, [NOT_EMPTY]);
                break;
            }
            case "employeeName": {
                const employeeName = e.target.value;
                if (employeeName.length >= 3) {
                    const res = await callApi(`https://localhost:5001/api/bkc/search-by-employee-name/${employeeName}`);
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
            case "guestName": {
                if (isDisabledGuestNameInput) return;
                const guestName = e.target.value;
                if (guestName.length <= 0) {
                    setIsDisabledEmployeeNameInput(false);
                    setError({
                        ...error,
                        employees: "Employee or guest need to be fill",
                        guestName: "Employee or guest need to be fill"
                    });
                } else {
                    const cloneError = { ...error };
                    const { guestName: gn, employees: emps, ...rest } = cloneError;
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
    function handleChangePickupTime(momentObject) {
        let pickupTime = null;
        if (typeof momentObject === "string" || momentObject instanceof String) {
            pickupTime = moment(momentObject, ["H:m", "H:mm"], true);
            if (pickupTime.isValid()) {
                let { pickupTime: x, ...rest } = error;
                setError(rest);
            } else {
                setError({
                    ...error,
                    pickupTime: "This field is not valid"
                })
            }
            setPickupLocation({
                ...pickupLocation,
                pickupTime: pickupTime
            })
        } else {
            pickupTime = moment(momentObject, ["H:m", "H:mm"], true);
            let { pickupTime: x, ...rest } = error;
            setError(rest);
            setPickupLocation({
                ...pickupLocation,
                pickupTime: pickupTime.format("H:mm")
            })
        }
    }
    function handleSelectedEmployee(item) {
        const employee = {
            id: item.id,
            name: item.content
        }
        const newEmployees = [...pickupLocation.employees, employee];
        setPickupLocation({
            ...pickupLocation,
            employees: newEmployees
        })
        const { employees: emp, guestName: gn, ...rest } = error;
        setError(rest);
        setIsDisabledGuestNameInput(true);
    }
    function handleDeleteEmployee(employeeId) {
        const cloneEmployees = [...pickupLocation.employees];
        if (cloneEmployees.length === 1) {
            setIsDisabledGuestNameInput(false);
        }
        if (cloneEmployees.length === 1 && pickupLocation.guestName.length === 0) {
            setError({
                ...error,
                employees: "Employee or guest need to be fill",
                guestName: "Employee or guest need to be fill"
            })
        }
        remove(cloneEmployees, (item) => {
            return item.id === employeeId;
        });
        setPickupLocation({
            ...pickupLocation,
            employees: cloneEmployees
        })
    }
    useEffect(() => {
        setPickupLocation(props.pickupLocation);

    }, [props.pickupLocation]);
    return (
        <tr>
            <td className="w_4">
                {pickupLocation.stt}
            </td>
            <td className="w_12">
                <Tooltip active={error.pickupLocation ? true : false} content={error.pickupLocation} direction="top">
                    {isUpdate ? <input onChange={handleChange} value={pickupLocation.pickupLocation} className="form-control" name="pickupLocation" /> : pickupLocation.pickupLocation}

                </Tooltip>
            </td>
            <td className="w_12">
                <Tooltip active={error.pickupTime ? true : false} content={error.pickupTime} direction="top">
                    {
                        isUpdate ?
                            <Datetime
                                dateFormat={false}
                                timeFormat="H:mm"
                                onChange={handleChangePickupTime}
                                initialValue={pickupLocation.pickupTime}
                            />
                            : pickupLocation.pickupTime
                    }
                </Tooltip>
            </td>
            <td className="w_12">
                <Tooltip active={error.employees ? true : false} content={error.employees} direction="top">
                    {
                        isUpdate ?
                            <MultipleSelect
                                suggestions={suggestionsEmployee}
                                onChange={handleChange}
                                className="form-control"
                                name="employeeName"
                                onSelectedItem={handleSelectedEmployee}
                                onDeleteItem={handleDeleteEmployee}
                                initialValue={pickupLocation.employees.map(employee => { return { id: employee.id, content: employee.name } })}
                                isDisabled={isDisabledEmployeeNameInput}
                            />
                            :
                            pickupLocation.employees.map(employee => { return employee.name }).join(", ")
                    }
                </Tooltip>

            </td>
            <td className="w_12">
                <Tooltip active={error.guestName ? true : false} content={error.guestName} direction="top">
                    {
                        isUpdate ?
                            <input disabled={isDisabledGuestNameInput}
                                onChange={handleChange}
                                value={pickupLocation.guestName}
                                className="form-control" name="guestName"
                            />
                            : pickupLocation.guestName
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