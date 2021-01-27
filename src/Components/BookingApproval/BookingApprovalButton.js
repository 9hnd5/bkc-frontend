import { useHistory } from "react-router-dom";
import Modal from 'react-responsive-modal';
import { updateTicketRequest } from "../../ActionCreators/adminActionCreator";
import { useState } from "react";
import { TICKET_STATUS } from "../../Constants/CommonsConstants";
import { useDispatch } from "react-redux";
import { setBookedTrips, setMoveCar, setReturnCar, setTrips } from "../../ActionCreators/bookingApprovalActionCreator";
export const BookingApprovalButton = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    function handleClickBack() {
        dispatch(setBookedTrips([]));
        dispatch(setTrips([]));
        dispatch(setMoveCar({}));
        dispatch(setReturnCar({}));
        history.push("/admin");
    }
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [reasonReject, setReasonReject] = useState("");
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
    return (
        <div className="row">
            <div className="col-12 col-xl-12">
                <div className="btn-group">
                    <button
                        onClick={props.onHandleClickApprove}
                        className="btn btn-outline-primary btn-sm mr-1"
                    >
                        <i className="fas fa-check-circle mr-1"></i>
                        Duyệt Yêu Cầu
                    </button>
                    <button onClick={handleReject} className="btn btn-outline-danger btn-sm mr-1">
                        <i className="fas fa-times-circle mr-1"></i>
                        Hủy Yêu Cầu
                    </button>
                    <button onClick={handleClickBack} className="btn btn-outline-info btn-sm">
                        <i className="fas fa-backspace mr-1"></i>
                        Quay Lại
                    </button>
                </div>
            </div>
            <Modal
                open={isOpenModal}
                center
                onClose={handleCloseModal}
            >
                <h4>Lí Do Từ Chối</h4>
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
                        <div className="btn-group">
                            <button
                                onClick={handleClickAccept}
                                className="btn btn-outline-primary btn-sm mr-1"
                            >
                                <i className="fas fa-check-circle mr-1"></i>
                                Xác Nhận
                        </button>
                            <button
                                onClick={handleClickBackModal}
                                className="btn btn-outline-danger btn-sm"
                            >
                                <i className="fas fa-backspace mr-1"></i>
                                Quay Lại
                        </button>
                        </div>
                    </div>
                </div>
            </Modal>
        </div>
    );
}