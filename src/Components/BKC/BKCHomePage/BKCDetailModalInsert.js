import 'react-responsive-modal/styles.css';
import Modal from 'react-responsive-modal';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { insertBkcDetail, toggleBkcDetailModalInsert } from '../../../ActionCreators/bkcActionCreators';
function BKCDetailModalInsert(props) {
    const dispatch = useDispatch();
    const isOpenBkcDetailModalInsert = useSelector(state => state.bkc.isOpenBkcDetailModalInsert)
    const [bkcDetail, setBkcDetail] = useState({
        id: "",
        pickupLocation: "",
        arriveTime: "",
        employeeName: "",
        guestName: "",
        phone: "",
        note: ""
    })
    function handleClickSave() {
        dispatch(insertBkcDetail(bkcDetail))
        dispatch(toggleBkcDetailModalInsert());
        setBkcDetail({
            id: "",
            pickupLocation: "",
            arriveTime: "",
            employeeName: "",
            guestName: "",
            phone: "",
            note: ""
        })

    }

    function handleClickCancel() {
        dispatch(toggleBkcDetailModalInsert());
    }

    function handleChange(e) {
        setBkcDetail({
            ...bkcDetail,
            [e.target.name]: e.target.value
        })
    }
    function onCloseModal(){
        dispatch(toggleBkcDetailModalInsert());
    }
    return (
        <Modal
            open={isOpenBkcDetailModalInsert}
            center
            onClose={onCloseModal}
        >
            <h2>THÊM CHI TIẾT</h2>
            <div className="row">
                <div className="col">
                    <label>Nơi Đón</label>
                </div>
                <div className="col">
                    <label>Giờ Đón</label>
                </div>
                <div className="w-100" />
                <div className="col">
                    <input value={bkcDetail.pickupLocation} onChange={handleChange} name="pickupLocation" className="form-control" />
                </div>
                <div className="col">
                    <input value={bkcDetail.arriveTime} onChange={handleChange} name="arriveTime" className="form-control" />
                </div>
                <div className="w-100" />
                <div className="col">
                    <label>Tên Nhân Viên</label>
                </div>
                <div className="col">
                    <label>Tên Khách</label>
                </div>
                <div className="w-100" />
                <div className="col">
                    <input value={bkcDetail.employeeName} onChange={handleChange} name="employeeName" className="form-control" />
                </div>
                <div className="col">
                    <input value={bkcDetail.guestName} onChange={handleChange} name="guestName" className="form-control" />
                </div>
                <div className="w-100" />
                <div className="col">
                    <label>Số Điện Thoại</label>
                </div>
                <div className="col">
                    <label>Ghi Chú</label>
                </div>
                <div className="w-100" />
                <div className="col">
                    <input value={bkcDetail.phone} onChange={handleChange} name="phone" className="form-control" />
                </div>
                <div className="col">
                    <input value={bkcDetail.note} onChange={handleChange} name="note" className="form-control" />
                </div>
                <div className="w-100" />
                <div className="col-2 mt-2">
                    <button onClick={handleClickSave} className="btn btn-success btn-block">LƯU</button>
                </div>
                <div className="col-2 mt-2">
                    <button onClick={handleClickCancel} className="btn btn-danger btn-block">HỦY</button>
                </div>
            </div>
        </Modal>
    );
}
export default BKCDetailModalInsert;