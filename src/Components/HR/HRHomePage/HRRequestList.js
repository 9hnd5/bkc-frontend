import { useDispatch, useSelector } from "react-redux";
import { HRRequestItem } from "./HRRequestItem"
import Modal from 'react-responsive-modal';
import { useState } from "react";
import { requestDeclineBkc } from "../../../ActionCreators/appActionCreators";
export const HRRequestList = () => {
    const dispatch = useDispatch();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [decline, setDecline] = useState({
        reason: "",
        bookerId: ""
    });
    const bookerBkInforBkDetails = useSelector(state => state.app.bookerBkInforBkDetails);
    const displaybkcInfors = bookerBkInforBkDetails.map((bookerBkInforBkDetail, index) => {
        return <HRRequestItem onOpenModal={handleOpenModal} index={index} key={index} bookerBkInforBkDetail={bookerBkInforBkDetail} />
    });
    function handleCancelModal(){
        setIsOpenModal(false);
    }
    function handleOpenModal(bookerId){
        setIsOpenModal(true);
        setDecline({
            ...decline,
            bookerId: bookerId
        })
    }
    function handleChange(e){
        setDecline({
            ...decline,
            [e.target.name]: e.target.value
        });
    }
    function handleClick(){
        dispatch(requestDeclineBkc(decline));
        setIsOpenModal(false);
    }
    return (
        <div className="card">
            <div className="card-header">
                <h4>THÔNG TIN YÊU CẦU ĐẶT XE</h4>
            </div>
            <div className="card-body">
                <div className="table-responsive hr_table_request" style={{ height: "300px" }}>
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
                            <textarea name="reason" onChange={handleChange} value={decline.reason} className="form-control" rows="5"></textarea>
                        </div>
                        <div className="w-100" />
                        <div className="col-12 mt-2">
                            <button onClick={handleClick} className="btn btn-outline-primary btn-sm mr-2">LƯU</button>
                            <button onClick={handleCancelModal} className="btn btn-outline-danger btn-sm">HỦY</button>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    );
}
