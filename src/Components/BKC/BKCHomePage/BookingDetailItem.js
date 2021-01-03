import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBookingDetail, updateBookingDetail } from "../../../ActionCreators/bkcActionCreators";

export const BookingDetailItem = (props) => {
    const [bookDetail, setBookDetail] = useState(props.bookDetail);
    const [isUpdate, setIsUpdate] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        setBookDetail(props.bookDetail);
    }, [props]);
    function handleClick(event) {
        switch (event) {
            case "update":
                setIsUpdate(true);
                break;
            case "cancel":
                setIsUpdate(false);
                break;
            case "save":
                dispatch(updateBookingDetail(bookDetail));
                setIsUpdate(false);
                break;
            case "delete":
                dispatch(deleteBookingDetail(bookDetail));
                break;
            default:
                break;
        }
    }
    function handleChange(e) {
        setBookDetail({
            ...bookDetail,
            [e.target.name]: e.target.value
        })
    }
    return (
        <tr>
            <td className="w_4">
                {bookDetail.stt}
            </td>
            <td className="w_12">
                {isUpdate ? <input onChange={handleChange} value={bookDetail.pickupLocation} className="form-control" name="pickupLocation" /> : bookDetail.pickupLocation}

            </td>
            <td className="w_12">
                {isUpdate ? <input onChange={handleChange} value={bookDetail.pickupTime} className="form-control" name="pickupTime" /> : bookDetail.pickupTime}

            </td>
            <td className="w_12">
                {isUpdate ? <input onChange={handleChange} value={bookDetail.employeeName} className="form-control" name="employeeName" /> : bookDetail.employeeName}

            </td>
            <td className="w_12">
                {isUpdate ? <input onChange={handleChange} value={bookDetail.guestName} className="form-control" name="guestName" /> : bookDetail.guestName}

            </td>
            <td className="w_12">
                {isUpdate ? <input onChange={handleChange} value={bookDetail.phone} className="form-control" name="phone" /> : bookDetail.phone}

            </td>
            <td className="w_12">
                {isUpdate ? <input onChange={handleChange} value={bookDetail.note} className="form-control" name="note" /> : bookDetail.note}

            </td>
            <td className="w-10">
                <div className="d-flex justify-content-center">
                    <button
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