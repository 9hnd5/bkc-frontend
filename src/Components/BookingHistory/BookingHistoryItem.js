import { useTranslation } from "react-i18next";

import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteTicketByIdRequest } from "../../ActionCreators/bookingHistoryActionCreator";

export const BookingHistoryItem = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { ticket, index } = props;
    const { t } = useTranslation();
    function handleEdit() {
        history.push(`/booking-request/update/${ticket.id}`);
    }
    function handleDelete() {
        dispatch(deleteTicketByIdRequest(ticket.id));
    }
    function handleDuplicate() {
        history.push(`/booking-request/duplicate/${ticket.id}`);
    }
    useEffect(() => {
        switch (true) {
            case "Success": {
                // setClassNameForStatus("label-custom label-success");
                // setStatus(t("duocduyet"));
                break;
            }
            case "Waiting": {
                // setClassNameForStatus("label-custom label-info");
                // setStatus(t("doiduyet"));
                break;
            }
            case "Draft": {
                // setClassNameForStatus("label-custom label-warning");
                // setStatus(t("nhap"));
                break;
            }
            case "Reject": {
                // setClassNameForStatus("label-custom label-danger");
                // setStatus(t("tuchoi"));
                break;
            }
            default:
                break;
        }
    }, [t])
    return (
        <tr>
            <td>{index}</td>
            <td>{ticket.startDate}</td>
            <td>{ticket.endDate}</td>
            <td>{ticket.fromLocation}</td>
            <td>{ticket.toLocation}</td>
            <td>{ticket.totalParticipant}</td>
            <td><p>{ticket.ticketStatus }</p></td>
            <td>
                <div className="btn-group" role="group">
                    <button
                        className="btn btn-outline-primary btn-sm mr-2"
                        onClick={() => handleEdit()}
                    // disabled={isDisabledBtnUpdate}
                    >
                        {t("suayeucau")}
                    </button>
                    <button
                        className="btn btn-outline-danger btn-sm mr-2"
                        onClick={() => handleDelete()}
                    // disabled={isDisabledBtnDelete}
                    >
                        {t("xoayeucau")}
                    </button>
                    <button
                        className="btn btn-outline-info btn-sm"
                        onClick={() => handleDuplicate()}
                    >
                        {t("nhanban")}
                    </button>
                </div>
            </td>
        </tr>
    )
}