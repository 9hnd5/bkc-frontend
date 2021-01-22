import { useState } from 'react';
import { useSelector } from 'react-redux';
import Modal from 'react-responsive-modal';
import { TicketRequestItem } from './TicketRequestItem';

export const TicketRequestTable = (props) => {
    const ticketRequests = useSelector(state => state.adminReducer.ticketRequests);
    const displayTicketRequests = ticketRequests && ticketRequests.map((ticketRequestItem, index) => {
        return <TicketRequestItem
            key={index}
            no={index + 1}
            ticketRequestItem={ticketRequestItem}
        />
    });
    const [isOpenModal, setIsOpenModal] = useState(false);
    function handleCloseModal() {
        setIsOpenModal(false);
    }
    return (
        <div className="row">
            <div className="col-12 col-xl-12">
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
                            {displayTicketRequests}
                        </tbody>
                    </table>
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
            </div>
        </div>
    );
}