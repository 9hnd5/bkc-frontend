import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import { requestDeleteBooking } from "../../ActionCreators/bookingHistoryActionCreators";
import { setBookingInforId } from './../../ActionCreators/appActionCreators';

export const BookingHistoryItem = (props) => {
    const {t} = useTranslation();
    const { bookingInfor, index } = props;
    const dispatch = useDispatch();
    const history = useHistory();
    const isDisabledBtnUpdate = (bookingInfor.bookingResult.status === "Waiting" || bookingInfor.bookingResult.status === "Success") ? true : false;
    const isDisabledBtnDelete = (bookingInfor.bookingResult.status === "Waiting" || bookingInfor.bookingResult.status === "Success") ? true : false;
    const [classNameForStatus, setClassNameForStatus] = useState("");
    const [status, setStatus] = useState("");
    function handleEdit(bookingInforId) {
        dispatch(setBookingInforId(bookingInforId));
        history.push(`request-booking/update`);
    }
    function handleDelete(bookingInforId) {
        dispatch(requestDeleteBooking(bookingInforId));
    }
    function handleDuplicate(bookingInforId){
        dispatch(setBookingInforId(bookingInforId));
        history.push(`request-booking/duplicate`);
    }
    useEffect(() => {
        switch (bookingInfor.bookingResult.status) {
            case "Success":{
                setClassNameForStatus("label-custom label-success");
                setStatus(t("duocduyet"));
                break;
            }
            case "Waiting": {
                setClassNameForStatus("label-custom label-info");
                setStatus(t("doiduyet"));
                break;
            }
            case "Draft": {
                setClassNameForStatus("label-custom label-warning");
                setStatus(t("nhap"));
                break;
            }
            case "Reject": {
                setClassNameForStatus("label-custom label-danger");
                setStatus(t("tuchoi"));
                break;
            }
            default:
                break;
        }
    }, [bookingInfor, t])
    return (
        <tr>
            <td>{index}</td>
            <td>{bookingInfor.movingDate}</td>
            <td>{bookingInfor.returningDate}</td>
            <td>{bookingInfor.location}</td>
            <td>{bookingInfor.destination}</td>
            <td>{bookingInfor.totalPerson}</td>
            <td><p className={classNameForStatus}>{status}</p></td>
            <td>
                <div className="btn-group" role="group">
                    <button
                        className="btn btn-outline-primary btn-sm mr-2"
                        onClick={() => handleEdit(bookingInfor.id)}
                        disabled={isDisabledBtnUpdate}
                    >
                        {t("suayeucau")}
                    </button>
                    <button
                        className="btn btn-outline-danger btn-sm mr-2"
                        onClick={() => handleDelete(bookingInfor.id)}
                        disabled={isDisabledBtnDelete}
                    >
                        {t("xoayeucau")}
                    </button>
                    <button
                        className="btn btn-outline-info btn-sm"
                        onClick={() => handleDuplicate(bookingInfor.id)}
                    >
                        {t("nhanban")}
                    </button>
                </div>
            </td>
        </tr>
    )
}