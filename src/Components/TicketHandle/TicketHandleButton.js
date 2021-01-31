import { useHistory } from "react-router-dom";
import Modal from 'react-responsive-modal';
import { useEffect, useState } from "react";
import { TICKET_STATUS } from "../../Constants/CommonsConstants";
import { useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { isEmpty } from "lodash";
export const TicketHandleButton = (props) => {
    const { t } = useTranslation();
    const { ticket } = props;
    const dispatch = useDispatch();
    const history = useHistory();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [reasonReject, setReasonReject] = useState("");
    const [isUpdate, setIsUpdate] = useState(false);
    const selectedCars = useSelector(state => state.ticketHandleReducer.selectedCars);
    const [isDisabledButtonAccepted, setIsDisabledButtonAccepted] = useState(false);
    const [isDisabledButtonRejected, setIsDisabledButtonRejected] = useState(false);
    function handleClickBack() {
        history.push("/ticket-management");
    }
    function handleCloseModal() {
        setIsOpenModal(false);
    }
    function handleReject() {
        setIsOpenModal(true);
    }
    function handleChange(e) {
        setReasonReject(e.target.value)
    }
    function handleClickBackModal() {
        setIsOpenModal(false);
    }
    function handleUpdate() {
        props.onHandleUpdateTicket();
        setIsOpenModal(false);
        history.push("/ticket-management");
    }
    useEffect(() => {
        if (ticket && ticket.status === TICKET_STATUS.APPROVED) {
            setIsUpdate(true);
        } else {
            setIsUpdate(false);
        }
    }, [ticket])
    useEffect(() => {
        if (isEmpty(selectedCars)) {
            setIsDisabledButtonAccepted(true);
        } else {
            setIsDisabledButtonAccepted(false);
        }
    }, [selectedCars]);
    useEffect(() => {
        if(ticket&&ticket.status === TICKET_STATUS.REJECTED){
            setIsDisabledButtonRejected(true)
        }else{
            setIsDisabledButtonRejected(false);
        }
    }, [ticket])
    return (
        <div className="row">
            <div className="col-12 col-xl-12">
                {
                    isUpdate ?
                        <button
                            className="btn btn-outline-primary btn-sm mr-1"
                            onClick={handleUpdate}
                        >
                            <i className="fas fa-check-circle mr-1"></i>
                            {t("suayeucau")}
                        </button> :
                        <button
                            onClick={props.onHandleClickApprove}
                            className="btn btn-outline-primary btn-sm mr-1"
                            disabled={isDisabledButtonAccepted}
                        >
                            <i className="fas fa-check-circle mr-1"></i>
                            {t("xacnhan")}
                        </button>
                }

                <button
                    onClick={handleReject}
                    className="btn btn-outline-danger btn-sm mr-1"
                    disabled={isDisabledButtonRejected}
                >
                    <i className="fas fa-times-circle mr-1"></i>
                    {t("huybo")}
                </button>
                <button onClick={handleClickBack} className="btn btn-outline-info btn-sm">
                    <i className="fas fa-backspace mr-1"></i>
                    {t("quaylai")}
                </button>
            </div>
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
                            onClick={props.onHandleDeleteTicket}
                            className="btn btn-outline-primary btn-sm mr-1"
                        >
                            <i className="fas fa-check-circle mr-1"></i>
                            {t("xacnhan")}
                        </button>
                        <button
                            onClick={handleClickBackModal}
                            className="btn btn-outline-info btn-sm"
                        >
                            <i className="fas fa-backspace mr-1"></i>
                            {t("quaylai")}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}