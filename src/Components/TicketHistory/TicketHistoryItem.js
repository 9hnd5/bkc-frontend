import { useTranslation } from "react-i18next";

import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deleteTicketByIdRequest } from "../../ActionCreators/ticketHistoryActionCreator";
import { TICKET_STATUS } from "../../Constants/CommonsConstants";

export const TicketHistoryItem = (props) => {
    const history = useHistory();
    const dispatch = useDispatch();
    const { ticket, index } = props;
    const { t } = useTranslation();
    const [status, setStatus] = useState("");
    const [classNameForStatus, setClassNameForStatus] = useState("");
    const [isFinish, setIsFinish] = useState("");
    const [classNameForIsFinish, setClassNameForIsFinish] = useState("");
    const [isDisabledBtnUpdate, setIsDisabledBtnUpdate] = useState(false);
    const [isDisabledBtnDelete, setIsDisabledBtnDelete] = useState(false);
    function handleEdit() {
        history.push(`/ticket-request/update/${ticket.id}`);
    }
    function handleDelete() {
        dispatch(deleteTicketByIdRequest(ticket.id));
    }
    function handleDuplicate() {
        history.push(`/ticket-request/duplicate/${ticket.id}`);
    }
    useEffect(() => {
        switch (ticket.status) {
            case TICKET_STATUS.APPROVED: {
                setClassNameForStatus("label-custom label-success");
                setStatus(t("duocduyet"));
                setIsDisabledBtnUpdate(true);
                setIsDisabledBtnDelete(true);
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
                setIsDisabledBtnUpdate(true);
                setIsDisabledBtnDelete(true);
                break;
            }
            default:
                break;
        }

        switch (ticket.isFinish) {
            case true: {
                setIsFinish("Hoàn Thành");
                setClassNameForIsFinish("label-custom label-success")
                break;
            }
            case false: {
                setIsFinish("Chưa Hoàn Thành");
                setClassNameForIsFinish("label-custom label-info")
                break; 
            }

            default:
                break;
        }
    }, [t, ticket])
    return (
        <tr>
            <td data-label="STT">{index}</td>
            <td data-label="Ngày Đi">{ticket.startDate}</td>
            <td data-label="Ngày Về">{ticket.endDate}</td>
            <td data-label="Địa Điểm Đón">{ticket.fromLocation}</td>
            <td data-label="Địa Điểm Đến">{ticket.toLocation}</td>
            <td data-label="Số Người Đi">{ticket.totalParticipant}</td>
            <td data-label="Trạng Thái"><label className={classNameForStatus}>{status}</label></td>
            <td data-label="Hoàn Thành"><label className={classNameForIsFinish}>{isFinish}</label></td>
            <td data-label="Hành Động">
                <button
                    className="btn btn-outline-primary btn-sm mr-2"
                    onClick={() => handleEdit()}
                    disabled={isDisabledBtnUpdate}
                >
                    <i className="fas fa-edit mr-1"></i>
                    {t("suayeucau")}
                </button>
                <button
                    className="btn btn-outline-danger btn-sm mr-2"
                    onClick={() => handleDelete()}
                    disabled={isDisabledBtnDelete}
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
            </td>
        </tr>
    )
}