import { useHistory } from "react-router-dom";
import Modal from 'react-responsive-modal';
import { updateTicketRequest } from "../../ActionCreators/adminActionCreator";
import { useEffect, useState } from "react";
import { TICKET_STATUS } from "../../Constants/CommonsConstants";
import { useDispatch } from "react-redux";
import { setBookedTrips, setMoveCar, setReturnCar, setTrips } from "../../ActionCreators/bookingApprovalActionCreator";
import { useTranslation } from "react-i18next";
export const BookingApprovalButton = (props) => {
    const { t } = useTranslation();
    const { ticket } = props;
    const dispatch = useDispatch();
    const history = useHistory();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [reasonReject, setReasonReject] = useState("");
    const [isUpdate, setIsUpdate] = useState(false);
    function handleClickBack() {
        dispatch(setBookedTrips([]));
        dispatch(setTrips([]));
        dispatch(setMoveCar({}));
        dispatch(setReturnCar({}));
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
    function handleClickAccept() {
        var data = {
            id: props.ticket.id,
            reasonReject: reasonReject,
            status: TICKET_STATUS.REJECTED
        }
        setIsOpenModal(false);
        dispatch(updateTicketRequest(data))
        dispatch(setBookedTrips([]));
        dispatch(setTrips([]));
        dispatch(setMoveCar({}));
        dispatch(setReturnCar({}));
    }
    function handleClickBackModal() {
        setIsOpenModal(false);
    }
    function handleUpdate() {
        props.onHandleUpdateTicket();
        setIsOpenModal(false);
        dispatch(setBookedTrips([]));
        dispatch(setTrips([]));
        dispatch(setMoveCar({}));
        dispatch(setReturnCar({}));
        history.push("/ticket-management");
    }
    useEffect(() => {
        if (ticket && ticket.status === TICKET_STATUS.APPROVED) {
            setIsUpdate(true);
        } else {
            setIsUpdate(false);
        }
    }, [ticket])
    return (
        <div className="row">
            <div className="col-12 col-xl-12">
                {
                    isUpdate ?
                        <button
                            disabled
                            className="btn btn-outline-primary btn-sm mr-1"
                            onClick={handleUpdate}
                        >
                            <i className="fas fa-check-circle mr-1"></i>
                            {t("suayeucau")}
                        </button> :
                        <button
                            onClick={props.onHandleClickApprove}
                            className="btn btn-outline-primary btn-sm mr-1"
                        >
                            <i className="fas fa-check-circle mr-1"></i>
                            {t("xacnhan")}
                        </button>
                }

                <button onClick={handleReject} className="btn btn-outline-danger btn-sm mr-1">
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
                            onClick={handleClickAccept}
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