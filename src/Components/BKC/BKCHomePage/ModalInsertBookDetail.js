import 'react-responsive-modal/styles.css';
import Modal from 'react-responsive-modal';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { insertBookingDetail, toggleBkcDetailModalInsert, toggleBkDetailValid } from '../../../ActionCreators/bkcActionCreators';
import { BOOKING_DETAIL_DEFAULT } from '../../../Constants/bkcConstants';
import Tooltip from '../../Commos/Tooltip';
import Select from 'react-select';
import { NOT_EMPTY, ONLY_NUMBER, validation } from '../../../Helpers/validation';
import { MultipleSelect } from '../../Commos/MultipleSelect';
import { callApi } from '../../../Helpers/callApi';
export const ModalInsertBookDetail = (props) => {
    const dispatch = useDispatch();
    const isOpenBkcDetailModalInsert = useSelector(state => state.bkc.isOpenBkcDetailModalInsert)
    const bookingDetails = useSelector(state => state.bkc.bookingDetails);
    const bookingInfor = useSelector(state => state.bkc.bookingInfor);
    const [suggestionsName, setSuggestionsName] = useState([]);
    const [bookingDetail, setBookingDetail] = useState({ ...BOOKING_DETAIL_DEFAULT })
    const [error, setError] = useState({
        pickupLocation: "",
        pickupTime: "",
        employeeName: "",
        phone: "",
    });
    console.log("bookingDetail", bookingDetail);
    const [isDisable, setIsDisable] = useState(false);
    function handleClickSave() {
        let arrayValue = Object.values(error);
        if (arrayValue.length === 0) {
            // dispatch(insertBookingDetail(bookingDetail))
            props.onSave(bookingDetail);
            dispatch(toggleBkcDetailModalInsert());
            setBookingDetail({ ...BOOKING_DETAIL_DEFAULT })
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
        setBookingDetail({ ...BOOKING_DETAIL_DEFAULT })
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

    async function handleChange(e) {
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
                // validateResult = validation(e.target.value, [NOT_EMPTY]);\
                
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
        setBookingDetail({
            ...bookingDetail,
            [e.target.name]: e.target.value
        })
    }
    function onCloseModal() {
        dispatch(toggleBkcDetailModalInsert());
    }
    useEffect(() => {
        let arrayValue = Object.keys(error);
        if (arrayValue.length === 0) setIsDisable(false);
        else setIsDisable(true);
    }, [bookingDetail, error]);
    useEffect(() => {
        if (bookingDetails.length === parseInt(bookingInfor.totalPerson)) {
            return dispatch(toggleBkDetailValid(true));
        }
        dispatch(toggleBkDetailValid(false));
    }, [bookingDetails, bookingInfor, dispatch]);
    function handleChangePickupTime(momentObject) {
        let pickupTime = null;
        if (typeof momentObject === "string" || momentObject instanceof String) {
            pickupTime = moment(momentObject, ["H:m", "H:mm"], true);
            if (pickupTime.isValid()) {
                let { pickupTime: x, ...rest } = error;
                setError(rest);
            } else {
                setError({
                    ...error,
                    pickupTime: "This field is not valid"
                })
            }
            setBookingDetail({
                ...bookingDetail,
                pickupTime: pickupTime.format("H:mm")
            })

        } else {
            pickupTime = moment(momentObject, ["H:m", "H:mm"], true);
            let { pickupTime: x, ...rest } = error;
            setError(rest);
            setBookingDetail({
                ...bookingDetail,
                pickupTime: pickupTime.format("H:mm")
            })
        }
    }
    function handleSelectedEmployeeName(item){
        setBookingDetail({
            ...bookingDetail,
            employeeName: item
        })
    }
    useEffect(() => {
        if (!(bookingDetail.employeeName.length >= 3)) return;
        const fetchListEmployeeName = async () => {
            const res = await callApi(`https://localhost:5001/api/bkc/search-by-employee-name/${bookingDetail.employeeName}`);
            const employees = res.data
            const suggestionsName=[];
            for(let i = 0; i < employees.length; i++){
                suggestionsName.push({
                    label: employees[i].name + " " + employees[i].buName,
                    value: employees[i].name
                }); 
            }
            setSuggestionsName(suggestionsName);
        }
        fetchListEmployeeName();
    }, [bookingDetail.employeeName]);
    return (
        <Modal
            open={isOpenBkcDetailModalInsert}
            center
            onClose={onCloseModal}
        >
            <h4>THÊM CHI TIẾT</h4>
            <div className="row">
                <div className="col-6">
                    <label className="d-flex align-items-center">
                        <i className="fas fa-asterisk fa-xs mr-1 asterisk" />
                        Nơi Đón
                    </label>
                </div>
                <div className="col-6">
                    <label className="d-flex align-items-center">
                        <i className="fas fa-asterisk fa-xs mr-1 asterisk" />
                        Giờ Đón
                    </label>
                </div>
                <div className="w-100" />
                <div className="col-6">
                    <Tooltip active={error.pickupLocation ? true : false} content={error.pickupLocation} direction="top">
                        <input
                            value={bookingDetail.pickupLocation}
                            onChange={handleChange}
                            name="pickupLocation"
                            className="form-control"
                            autoComplete="nope"
                        />
                    </Tooltip>
                </div>
                <div className="col-6">
                    <Tooltip active={error.pickupTime ? true : false} content={error.pickupTime} direction="top">
                        <Datetime
                            dateFormat={false}
                            timeFormat="H:mm"
                            onChange={handleChangePickupTime}
                            initialValue={bookingDetail.pickupTime}
                        />
                    </Tooltip>
                </div>
                <div className="w-100" />
                <div className="col-6">
                    <label className="d-flex align-items-center">
                        <i className="fas fa-asterisk fa-xs mr-1 asterisk" />
                        Tên Nhân Viên
                    </label>
                </div>
                <div className="col-6">
                    <label>Tên Khách</label>
                </div>
                <div className="w-100" />
                <div className="col-6">

                    {/* <Tooltip active={error.employeeName ? true : false} content={error.employeeName} direction="top">
                        <input
                            value={bookingDetail.employeeName}
                            onChange={handleChange}
                            name="employeeName"
                            className="form-control"
                            autoComplete="nope"
                        />

                    </Tooltip> */}
                    {/* <Select 
                        defaultValue={bookingDetail.employeeName}
                        onChange={setSelectedOption}
                        options={options}
                        isMulti
                    /> */}
                    <MultipleSelect
                        suggestions={suggestionsName}
                        onChange={handleChange}
                        className="form-control"
                        name="employeeName"
                        onSelectedItem={handleSelectedEmployeeName}
                    />
                    {/* <select className="custom-select" multiple={true}>
                        <option value="a">a</option>
                        <option value="b">b</option>
                    </select> */}
                </div>
                <div className="col-6">

                    <Tooltip active={error.guestName ? true : false} content={error.guestName} direction="top">
                        <input
                            value={bookingDetail.guestName}
                            onChange={handleChange}
                            name="guestName"
                            className="form-control"
                            autoComplete="nope"
                        />
                    </Tooltip>
                </div>
                <div className="w-100" />
                <div className="col-6">
                    <label className="d-flex align-items-center">
                        <i className="fas fa-asterisk fa-xs mr-1 asterisk" />
                        Số Điện Thoại
                    </label>
                </div>
                <div className="col-6">
                    <label>Ghi Chú</label>
                </div>
                <div className="w-100" />
                <div className="col-6">

                    <Tooltip active={error.phone ? true : false} content={error.phone} direction="top">
                        <input
                            value={bookingDetail.phone}
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
                            value={bookingDetail.noteByBooker}
                            onChange={handleChange}
                            name="noteByBooker"
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
                        <i className="fas fa-check-circle mr-1"></i>
                        XÁC NHẬN
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
