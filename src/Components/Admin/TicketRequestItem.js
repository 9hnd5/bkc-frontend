import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";
import { TICKET_STATUS } from "../../Constants/CommonsConstants";
import Modal from 'react-responsive-modal';

export const TicketRequestItem = (props) => {
    const { t } = useTranslation();
    const history = useHistory();
    const { ticketRequestItem, no } = props;
    const [status, setStatus] = useState("");
    const [classNameForStatus, setClassNameForStatus] = useState("");
    const [isOpenModal, setIsOpenModal] = useState(false);
    function handleClickDetail() {
        history.push(`/booking-approval/${ticketRequestItem.id}`)
    }
    function handleCloseModal() {
        setIsOpenModal(false);
    }
    function handleReject(){
        setIsOpenModal(true);
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
    return (
        <Fragment>
            <tr>
                <td>{no}</td>
                <td>{ticketRequestItem.employeeName}</td>
                <td>{ticketRequestItem.startDate}</td>
                <td>{ticketRequestItem.endDate}</td>
                <td>{ticketRequestItem.totalParticipant}</td>
                <td><p className={classNameForStatus}>{status}</p></td>
                <td>
                    <div className="btn-block">
                        <button
                            onClick={handleClickDetail}
                            className="btn btn-outline-primary btn-sm mr-2"
                        >
                            Xem Chi Tiết
                        </button>
                        <button onClick={handleReject} className="btn btn-outline-danger btn-sm">
                            Từ Chối
                        </button>
                    </div>
                </td>
            </tr>
            <Modal
                open={isOpenModal}
                center
                onClose={handleCloseModal}
            >
                <h4>Lí Do Từ Chối</h4>
                <div className="row">
                    <div className="col-12">
                        <textarea
                            name="reasonReject"
                            className="form-control"
                            rows="5"
                        >
                        </textarea>
                    </div>
                    <div className="w-100" />
                    <div className="col-12 mt-2">
                        <button
                            className="btn btn-outline-primary btn-sm mr-2"
                        >
                            <i className="fas fa-check-circle mr-1"></i>
                                XÁC NHẬN
                            </button>
                        <button
                            className="btn btn-outline-danger btn-sm"
                        >
                            <i className="fas fa-backspace mr-1"></i>
                                QUAY LẠI
                            </button>
                    </div>
                </div>
            </Modal>
        </Fragment>
    );
}