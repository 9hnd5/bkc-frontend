import { useDispatch, useSelector } from "react-redux";
import { HRRequestItem } from "./HRRequestItem"
import Modal from 'react-responsive-modal';
import { useState } from "react";
import { requestRejectBkc } from "../../../ActionCreators/appActionCreators";
export const HRRequestList = () => {
    const dispatch = useDispatch();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [reasonReject, setReasonReject] = useState("");
    const [bookerId, setBookerId] = useState(null);
    const bookingHistoryList = useSelector(state => state.hr.bookingHistoryList);
    const displayHrRequestItem = bookingHistoryList.map((bookingHistory, index) => {
        return <HRRequestItem onOpenModal={handleOpenModal} index={index} key={index} bookingHistory={bookingHistory} />
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
                                <th>Người Đặt</th>
                                <th>Ngày Đi</th>
                                <th>Ngày Về</th>
                                <th>Số Người Đi</th>
                                <th>Trạng Thái</th>
                                <th>Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayHrRequestItem}
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
