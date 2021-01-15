import { useTranslation } from "react-i18next";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react/cjs/react.development";
import { saveBookerId } from "../../ActionCreators/appActionCreators";
import { requestDeleteBooking } from "../../ActionCreators/bookingHistoryActionCreators";

export const BookingHistoryItem = (props) => {
    const {t} = useTranslation();
    const { bookingHistoryItem, index } = props;
    console.log("bookinghistoryItem", bookingHistoryItem);
    const dispatch = useDispatch();
    const history = useHistory();
    const isDisabledBtnUpdate = (bookingHistoryItem.status === "Waiting" || bookingHistoryItem.status === "Success") ? true : false;
    const isDisabledBtnDelete = (bookingHistoryItem.status === "Waiting" || bookingHistoryItem.status === "Success") ? true : false;
    const [classNameForStatus, setClassNameForStatus] = useState("");
    const [status, setStatus] = useState("");
    function handleEdit(bookerId) {
        dispatch(saveBookerId(bookerId))
        history.push(`request-booking/update`);
    }
    function handleDelete(bookerId) {
        dispatch(requestDeleteBooking(bookerId));
    }
    function handleDuplicate(bookerId){
        dispatch(saveBookerId(bookerId))
        history.push(`request-booking/duplicate`);
    }
    useEffect(() => {
        switch (bookingHistoryItem.status) {
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
    }, [bookingHistoryItem, t])
    return (
        <tr>
            <td>{index}</td>
            <td>{bookingHistoryItem.moveDate}</td>
            <td>{bookingHistoryItem.returnDate}</td>
            <td>{bookingHistoryItem.location}</td>
            <td>{bookingHistoryItem.destination}</td>
            <td>{bookingHistoryItem.totalPerson}</td>
            <td><p className={classNameForStatus}>{status}</p></td>
            <td>
                <div className="btn-group" role="group">
                    <button
                        className="btn btn-outline-primary btn-sm mr-2"
                        onClick={() => handleEdit(bookingHistoryItem.bookerId)}
                        disabled={isDisabledBtnUpdate}
                    >
                        {t("suayeucau")}
                    </button>
                    <button
                        className="btn btn-outline-danger btn-sm mr-2"
                        onClick={() => handleDelete(bookingHistoryItem.bookerId)}
                        disabled={isDisabledBtnDelete}
                    >
                        {t("xoayeucau")}
                    </button>
                    <button
                        className="btn btn-outline-info btn-sm"
                        onClick={() => handleDuplicate(bookingHistoryItem.bookerId)}
                    >
                        {t("nhanban")}
                    </button>
                </div>
            </td>
        </tr>
    )
}