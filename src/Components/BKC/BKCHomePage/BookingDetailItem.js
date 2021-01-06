import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import moment from 'moment';
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBookingDetail, toggleBkDetailValid, updateBookingDetail } from "../../../ActionCreators/bkcActionCreators";
import { NOT_EMPTY, ONLY_NUMBER, validation } from "../../../Helpers/validation";
import Tooltip from '../../Commos/Tooltip';

export const BookingDetailItem = (props) => {
    const [bookingDetail, setBookingDetail] = useState(props.bookingDetail);
    const [prevBookingDetail, setPrevBookingDetail] = useState({ ...bookingDetail });
    const [isUpdate, setIsUpdate] = useState(false);
    const [error, setError] = useState({});
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
                dispatch(updateBookingDetail(bookingDetail));
                setIsUpdate(false);
                setPrevBookingDetail({ ...bookingDetail });
                break;
            case "delete":
                dispatch(deleteBookingDetail(bookingDetail));
                dispatch(toggleBkDetailValid(false));
                break;
            default:
                break;
        }
    }
    function handleChange(e) {
        let validateResult = null;
        switch (e.target.name) {
            case "pickupLocation": {
                validateResult = validation(e.target.value, [NOT_EMPTY]);
                break;
            }
            case "employeeName": {
                validateResult = validation(e.target.value, [NOT_EMPTY]);
                break;
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
                <Tooltip active={error.employeeName ? true : false} content={error.employeeName} direction="top">
                    {isUpdate ? <input onChange={handleChange} value={bookingDetail.employeeName} className="form-control" name="employeeName" /> : bookingDetail.employeeName}
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