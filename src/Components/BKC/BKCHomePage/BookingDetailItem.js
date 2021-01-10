import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import moment from 'moment';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBookingDetail, toggleBkDetailValid, updateBookingDetail } from "../../../ActionCreators/bkcActionCreators";
import { NOT_EMPTY, ONLY_NUMBER, validation } from "../../../Helpers/validation";
import Tooltip from '../../Commos/Tooltip';
import { MultipleSelect } from '../../Commos/MultipleSelect';
import { callApi } from '../../../Helpers/callApi';

export const BookingDetailItem = (props) => {
    const [bookingDetail, setBookingDetail] = useState(props.bookingDetail);
    const [prevBookingDetail, setPrevBookingDetail] = useState({ ...bookingDetail });
    const [isUpdate, setIsUpdate] = useState(false);
    const [error, setError] = useState({});
    const [suggestionsEmployee, setSuggestionsEmployee] = useState([]);
    const dispatch = useDispatch();
    useEffect(() => {
        setBookingDetail(props.bookingDetail);
    }, [props]);
    function handleClick(event) {
        switch (event) {
            case "update":
                setIsUpdate(true);
                break;
            case "cancel":
                setIsUpdate(false);
                setBookingDetail({ ...prevBookingDetail });
                break;
            case "save":
                // dispatch(updateBookingDetail(bookingDetail));
                props.onSaveUpdate(bookingDetail);
                setIsUpdate(false);
                setPrevBookingDetail({ ...bookingDetail });
                break;
            case "delete":
                props.onDelete(bookingDetail);
                // dispatch(deleteBookingDetail(bookingDetail));
                dispatch(toggleBkDetailValid(false));
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
                // validateResult = validation(e.target.value, [NOT_EMPTY]);
                // break;
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
        setBookingDetail({
            ...bookingDetail,
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
            setBookingDetail({
                ...bookingDetail,
                pickupTime: pickupTime
            })
        } else {
            pickupTime = moment(momentObject, ["H:m", "H:mm"], true);
            let { pickupTime: x, ...rest } = error;
            setError(rest);
            setBookingDetail({
                ...bookingDetail,
                pickupTime: pickupTime.format("H:mm")
            })
        }
    }
    function handleSelectedEmployee(item){
        const employee = {
            id: item.id,
            name: item.content
        }
        const newEmployees = [...bookingDetail.employees, employee];
        setBookingDetail({
            ...bookingDetail,
            employees: newEmployees
        })
        const { employees: emp, ...rest } = error;
        setError(rest);
        // setIsDisabledGuestNameInput(true);
    }
    return (
        <tr>
            <td className="w_4">
                {bookingDetail.stt}
            </td>
            <td className="w_12">
                <Tooltip active={error.pickupLocation ? true : false} content={error.pickupLocation} direction="top">
                    {isUpdate ? <input onChange={handleChange} value={bookingDetail.pickupLocation} className="form-control" name="pickupLocation" /> : bookingDetail.pickupLocation}

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
                                initialValue={bookingDetail.pickupTime}
                            />
                            : bookingDetail.pickupTime
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
                                // onDeleteItem={handleDeleteEmployee}
                                // isDisabled={isDisabledEmployeeNameInput}
                            />
                            // <MultipleSelect /> 
                            :
                            bookingDetail.employees.map(employee => { return employee.name }).join(", ")
                    }
                </Tooltip>

            </td>
            <td className="w_12">
                {isUpdate ? <input onChange={handleChange} value={bookingDetail.guestName} className="form-control" name="guestName" /> : bookingDetail.guestName}

            </td>
            <td className="w_12">
                <Tooltip active={error.phone ? true : false} content={error.phone} direction="top">
                    {isUpdate ? <input onChange={handleChange} value={bookingDetail.phone} className="form-control" name="phone" /> : bookingDetail.phone}
                </Tooltip>

            </td>
            <td className="w_12">
                {isUpdate ? <input onChange={handleChange} value={bookingDetail.noteByBooker} className="form-control" name="noteByBooker" /> : bookingDetail.noteByBooker}

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