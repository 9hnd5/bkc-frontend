import 'react-responsive-modal/styles.css';
import Modal from 'react-responsive-modal';
import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { insertBookDetail, toggleBkcDetailModalInsert } from '../../../ActionCreators/bkcActionCreators';
import { BOOK_DETAIL_DEFAULT } from '../../../Constants/bkcConstants';
export const ModalInsertBookDetail = (props) => {
    const dispatch = useDispatch();
    const isOpenBkcDetailModalInsert = useSelector(state => state.bkc.isOpenBkcDetailModalInsert)
    const bookDetailDefault = {...BOOK_DETAIL_DEFAULT}
    const [bookDetail, setBookDetail] = useState(bookDetailDefault)
    function handleClickSave() {
        dispatch(insertBookDetail(bookDetail))
        dispatch(toggleBkcDetailModalInsert());
        setBookDetail(bookDetailDefault)

    }

    function handleClickCancel() {
        dispatch(toggleBkcDetailModalInsert());
    }

    function handleChange(e) {
        setBookDetail({
            ...bookDetail,
            [e.target.name]: e.target.value
        })
    }
    function onCloseModal() {
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
                    <input
                        value={bookDetail.pickupLocation}
                        onChange={handleChange}
                        name="pickupLocation"
                        className="form-control" />
                </div>
                <div className="col">
                    <input
                        value={bookDetail.pickupTime}
                        onChange={handleChange}
                        name="pickupTime"
                        className="form-control" />
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
                    <input
                        value={bookDetail.employeeName}
                        onChange={handleChange}
                        name="employeeName"
                        className="form-control" />
                </div>
                <div className="col">
                    <input
                        value={bookDetail.guestName}
                        onChange={handleChange}
                        name="guestName"
                        className="form-control" />
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
                    <input
                        value={bookDetail.phone}
                        onChange={handleChange}
                        name="phone"
                        className="form-control" />
                </div>
                <div className="col">
                    <input
                        value={bookDetail.note}
                        onChange={handleChange}
                        name="note"
                        className="form-control" />
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
