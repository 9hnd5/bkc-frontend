import { useDispatch, useSelector } from "react-redux";
import { HRRequestItem } from "./HRRequestItem"
import Modal from 'react-responsive-modal';
import { useState } from "react";
import { requestRejectBkc } from "../../../ActionCreators/appActionCreators";
import { useHistory } from "react-router-dom";
export const HRRequestList = () => {
    const dispatch = useDispatch();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [reasonReject, setReasonReject] = useState("");
    const [bookerId, setBookerId] = useState(null);
    const bookerBkInforBkDetails = useSelector(state => state.app.bookerBkInforBkDetails);
    const displaybkcInfors = bookerBkInforBkDetails.map((bookerBkInforBkDetail, index) => {
        return <HRRequestItem onOpenModal={handleOpenModal} index={index} key={index} bookerBkInforBkDetail={bookerBkInforBkDetail} />
    });
    function handleCancelModal() {
        setIsOpenModal(false);
    }
    function handleOpenModal(bookerId) {
        setBookerId(bookerId);
        setIsOpenModal(true);

    }
    function handleChange(e) {
        setReasonReject(e.target.value);
    }
    function handleClick() {
        const rejectObject = {
            bookerId: bookerId,
            reasonReject: reasonReject
        }
        dispatch(requestRejectBkc(rejectObject));
        setIsOpenModal(false);
    }
    return (
        <div className="card">
            <div className="card-header">
                <h4>THÔNG TIN YÊU CẦU ĐẶT XE</h4>
            </div>
            <div className="card-body">
                <div className="table-responsive hr_table_request" style={{ height: "500px" }}>
                    <table className="table table-sm table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Status</th>
                                <th>Tên</th>
                                <th>Tuyến Đường</th>
                                <th>Ngày Xuất Phát</th>
                                <th>Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displaybkcInfors}
                        </tbody>
                    </table>
                </div>
                <Modal
                    open={isOpenModal}
                    center
                    onClose={handleCancelModal}
                >
                    <h4>Lí Do Từ Chối</h4>
                    <div className="row">
                        <div className="col-12">
                            <textarea name="reasonReject" onChange={handleChange} value={reasonReject} className="form-control" rows="5"></textarea>
                        </div>
                        <div className="w-100" />
                        <div className="col-12 mt-2">
                            <button
                                onClick={handleClick}
                                className="btn btn-outline-primary btn-sm mr-2"
                            >
                                <i className="fas fa-check-circle mr-1"></i>
                                XÁC NHẬN
                            </button>
                            <button
                                onClick={handleCancelModal}
                                className="btn btn-outline-danger btn-sm"
                            >
                                <i className="fas fa-backspace mr-1"></i>
                                QUAY LẠI
                            </button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
}
