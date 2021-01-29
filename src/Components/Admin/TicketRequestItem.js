import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { TICKET_STATUS } from "../../Constants/CommonsConstants";
import Modal from 'react-responsive-modal';
import { updateTicketRequest } from "../../ActionCreators/adminActionCreator";
import { useDispatch } from "react-redux";

export const TicketRequestItem = (props) => {
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const history = useHistory();
    const { ticketRequestItem, no } = props;
    const [status, setStatus] = useState("");
    const [classNameForStatus, setClassNameForStatus] = useState("");
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [reasonReject, setReasonReject] = useState("");
    const [isDisabledButtonReject, setIsDisabledButtonReject] = useState(false);
    function handleClickDetail() {
        history.push(`/booking-approval/${ticketRequestItem.id}`)
    }
    function handleCloseModal() {
        setIsOpenModal(false);
    }
    function handleReject() {
        setIsOpenModal(true);
    }
    function handleClickAccept() {
        var data = {
            id: ticketRequestItem.id,
            reasonReject: reasonReject,
            status: TICKET_STATUS.REJECTED
        }
        dispatch(updateTicketRequest(data))
        setIsOpenModal(false);
    }
    function handleClickBack() {
        setIsOpenModal(false);
    }
    function handleChange(e) {
        setReasonReject(e.target.value)
    }
    useEffect(() => {
        switch (ticketRequestItem.status) {
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
    }, [t, ticketRequestItem])
    useEffect(() => {
        if (ticketRequestItem && ticketRequestItem.status === TICKET_STATUS.REJECTED) {
            setIsDisabledButtonReject(true);
        } else {
            setIsDisabledButtonReject(false);
        }
    }, [ticketRequestItem])
    return (
        <Fragment>
            <tr>
                <td data-label={t("stt")}>{no}</td>
                <td data-label={t("hovaten")}>{ticketRequestItem.employeeName}</td>
                <td data-label={t("ngaydi")}>{ticketRequestItem.startDate}</td>
                <td data-label={t("ngayve")}>{ticketRequestItem.endDate}</td>
                <td data-label={t("songuoidi")}>{ticketRequestItem.totalParticipant}</td>
                <td data-label={t("trangthai")}><label className={classNameForStatus}>{status}</label></td>
                <td data-label={t("hanhdong")}>
                    <button
                        onClick={handleClickDetail}
                        className="btn btn-outline-primary btn-sm mr-1"
                    >
                        <i className="fas fa-info-circle mr-1"></i>
                        {t("chitiet")}
                    </button>
                    <button disabled={isDisabledButtonReject} onClick={handleReject} className="btn btn-outline-danger btn-sm">
                        <i className="fas fa-times-circle mr-1"></i>
                        {t("huybo")}
                    </button>
                </td>
            </tr>
            <Modal
                open={isOpenModal}
                center
                onClose={handleCloseModal}
            >
                <h4>{t("lido")}</h4>
                <div className="row">
                    <div className="col-12">
                        <textarea
                            value={reasonReject}
                            name="reasonReject"
                            className="form-control"
                            rows="5"
                            onChange={handleChange}
                        >
                        </textarea>
                    </div>
                    <div className="w-100" />
                    <div className="col-12 mt-2">
                        <button
                            onClick={handleClickAccept}
                            className="btn btn-outline-primary btn-sm mr-2"
                        >
                            <i className="fas fa-check-circle mr-1"></i>
                            {t("xacnhan")}
                        </button>
                        <button
                            onClick={handleClickBack}
                            className="btn btn-outline-danger btn-sm"
                        >
                            <i className="fas fa-backspace mr-1"></i>
                            {t("quaylai")}
                        </button>
                    </div>
                </div>
            </Modal>
        </Fragment>
    );
}