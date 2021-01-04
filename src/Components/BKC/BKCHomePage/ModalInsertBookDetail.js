import 'react-responsive-modal/styles.css';
import Modal from 'react-responsive-modal';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { insertBookingDetail, toggleBkcDetailModalInsert, toggleBkDetailValid } from '../../../ActionCreators/bkcActionCreators';
import { BOOK_DETAIL_DEFAULT } from '../../../Constants/bkcConstants';
import Tooltip from '../../Commos/Tooltip';
import { NOT_EMPTY, ONLY_NUMBER, validation } from '../../../Helpers/validation';
export const ModalInsertBookDetail = (props) => {
    const dispatch = useDispatch();
    const isOpenBkcDetailModalInsert = useSelector(state => state.bkc.isOpenBkcDetailModalInsert)
    const bookingDetailDefault = { ...BOOK_DETAIL_DEFAULT }
    const [bookDetail, setBookDetail] = useState(bookingDetailDefault)
    const [error, setError] = useState({
        pickupLocation: "",
        pickupTime: "",
        employeeName: "",
        phone: "",
    });
    const [isDisable, setIsDisable] = useState(false);
    function handleClickSave() {
        let arrayValue = Object.values(error);
        if (arrayValue.length === 0) {
            dispatch(insertBookingDetail(bookDetail))
            dispatch(toggleBkDetailValid(true))
            dispatch(toggleBkcDetailModalInsert());
            setBookDetail({ ...bookingDetailDefault })

            setError({
                pickupLocation: "",
                pickupTime: "",
                employeeName: "",
                phone: "",
            })
            setIsDisable(true);
        }
    }

    function handleClickCancel() {
        dispatch(toggleBkcDetailModalInsert());
        setBookDetail({ ...bookingDetailDefault })
        setError({
            pickupLocation: "",
            pickupTime: "",
            employeeName: "",
            // guestName: "",
            phone: "",
            // note: ""
        })
        setIsDisable(true);
    }

    function handleChange(e) {
        let validateResult = null;
        switch (e.target.name) {
            case "pickupLocation": {
                validateResult = validation(e.target.value, [NOT_EMPTY]);
                break;
            }
            case "pickupTime": {
                validateResult = validation(e.target.value, [NOT_EMPTY]);
                break;
            }
            case "employeeName": {
                validateResult = validation(e.target.value, [NOT_EMPTY]);
                break;
            }
            case "guestName": {
                // validateResult = validation(e.target.value, [NOT_EMPTY]);
                break;
            }
            case "phone": {
                validateResult = validation(e.target.value, [NOT_EMPTY, ONLY_NUMBER]);
                break;
            }
            case "note": {
                // validateResult = validation(e.target.value, [NOT_EMPTY, ONLY_NUMBER]);
                break;
            }
            default:
                break;
        }
        if (!validateResult) {
            let { [e.target.name]: a, ...rest } = error;
            setError(rest);
        }
        else {
            setError({
                ...error,
                [e.target.name]: validateResult
            })
        }
        setBookDetail({
            ...bookDetail,
            [e.target.name]: e.target.value
        })
    }
    function onCloseModal() {
        dispatch(toggleBkcDetailModalInsert());
        setError({
            pickupLocation: "",
            pickupTime: "",
            employeeName: "",
            phone: "",
        })
        setIsDisable(true);
    }
    useEffect(() => {
        let arrayValue = Object.values(error);
        if (arrayValue.length === 0) setIsDisable(false);
        else setIsDisable(true);
    }, [bookDetail, error]);
    return (
        <Modal
            open={isOpenBkcDetailModalInsert}
            center
            onClose={onCloseModal}
        >
            <h4>THÊM CHI TIẾT</h4>
            <div className="row">
                <div className="col-6">
                    <label>Nơi Đón</label>
                </div>
                <div className="col-6">
                    <label>Giờ Đón</label>
                </div>
                <div className="w-100" />
                <div className="col-6">
                    <Tooltip active={error.pickupLocation ? true : false} content={error.pickupLocation} direction="top">
                        <input
                            value={bookDetail.pickupLocation}
                            onChange={handleChange}
                            name="pickupLocation"
                            className="form-control"
                            autoComplete="nope"
                        />
                    </Tooltip>
                </div>
                <div className="col-6">
                    <Tooltip active={error.pickupTime ? true : false} content={error.pickupTime} direction="top">
                        <input
                            value={bookDetail.pickupTime}
                            onChange={handleChange}
                            name="pickupTime"
                            className="form-control"
                            autoComplete="nope"
                        />
                    </Tooltip>
                </div>
                <div className="w-100" />
                <div className="col-6">
                    <label>Tên Nhân Viên</label>
                </div>
                <div className="col-6">
                    <label>Tên Khách</label>
                </div>
                <div className="w-100" />
                <div className="col-6">

                    <Tooltip active={error.employeeName ? true : false} content={error.employeeName} direction="top">
                        <input
                            value={bookDetail.employeeName}
                            onChange={handleChange}
                            name="employeeName"
                            className="form-control"
                            autoComplete="nope"
                        />

                    </Tooltip>
                </div>
                <div className="col-6">

                    <Tooltip active={error.guestName ? true : false} content={error.guestName} direction="top">
                        <input
                            value={bookDetail.guestName}
                            onChange={handleChange}
                            name="guestName"
                            className="form-control"
                            autoComplete="nope"
                        />
                    </Tooltip>
                </div>
                <div className="w-100" />
                <div className="col-6">
                    <label>Số Điện Thoại</label>
                </div>
                <div className="col-6">
                    <label>Ghi Chú</label>
                </div>
                <div className="w-100" />
                <div className="col-6">

                    <Tooltip active={error.phone ? true : false} content={error.phone} direction="top">
                        <input
                            value={bookDetail.phone}
                            onChange={handleChange}
                            name="phone"
                            className="form-control"
                            autoComplete="nope"
                        />
                    </Tooltip>
                </div>
                <div className="col-6">

                    <Tooltip active={error.note ? true : false} content={error.note} direction="top">
                        <input
                            value={bookDetail.note}
                            onChange={handleChange}
                            name="note"
                            className="form-control"
                            autoComplete="nope"
                        />
                    </Tooltip>
                </div>
                <div className="w-100" />
                <div className="col-6 mt-2">
                    <button
                        disabled={isDisable}
                        onClick={handleClickSave}
                        className="btn btn-outline-primary btn-sm mr-2"
                    >
                        <i className="fas fa-save mr-1"></i>
                        LƯU
                        </button>
                    <button
                        onClick={handleClickCancel}
                        className="btn btn-outline-danger btn-sm"
                    >
                        <i className="fas fa-window-close mr-1"></i>
                        HỦY
                    </button>
                </div>
            </div>
        </Modal>
    );
}
