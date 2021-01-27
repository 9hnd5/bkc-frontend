import { useTranslation } from "react-i18next";

import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteTicketByIdRequest } from "../../ActionCreators/bookingHistoryActionCreator";
import { TICKET_STATUS } from "../../Constants/CommonsConstants";

export const BookingHistoryItem = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { ticket, index } = props;
    const { t } = useTranslation();
    const [status, setStatus] = useState("");
    const [classNameForStatus, setClassNameForStatus] = useState("");
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
        switch (ticket.status) {
            case TICKET_STATUS.APPROVED: {
                setClassNameForStatus("label-custom label-success");
                setStatus(t("duocduyet"));
                break;
            }
            case TICKET_STATUS.WAITING: {
                setClassNameForStatus("label-custom label-info");
                setStatus(t("doiduyet"));
                break;
            }
            case TICKET_STATUS.DRAFT: {
                setClassNameForStatus("label-custom label-warning");
                setStatus(t("nhap"));
                break;
            }
            case TICKET_STATUS.REJECTED: {
                setClassNameForStatus("label-custom label-danger");
                setStatus(t("tuchoi"));
                break;
            }
            default:
                break;
        }
    }, [t, ticket])
    return (
        <tr>
            <td>{index}</td>
            <td>{ticket.startDate}</td>
            <td>{ticket.endDate}</td>
            <td>{ticket.fromLocation}</td>
            <td>{ticket.toLocation}</td>
            <td>{ticket.totalParticipant}</td>
            <td><p className={classNameForStatus}>{status}</p></td>
            <td>
                <div className="btn-group" role="group">
                    <button
                        className="btn btn-outline-primary btn-sm mr-2"
                        onClick={() => handleEdit()}
                    // disabled={isDisabledBtnUpdate}
                    >
                        <i className="fas fa-edit mr-1"></i>
                        {t("suayeucau")}
                    </button>
                    <button
                        className="btn btn-outline-danger btn-sm mr-2"
                        onClick={() => handleDelete()}
                    // disabled={isDisabledBtnDelete}
                    >
                        <i className="fas fa-trash-alt mr-1"></i>
                        {t("xoayeucau")}
                    </button>
                    <button
                        className="btn btn-outline-info btn-sm"
                        onClick={() => handleDuplicate()}
                    >
                        <i className="fas fa-clone mr-1"></i>
                        {t("nhanban")}
                    </button>
                </div>
            </td>
        </tr>
    )
}