import 'react-responsive-modal/styles.css';
import Modal from 'react-responsive-modal';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBkcDetailModalInsert } from '../../../ActionCreators/bkcActionCreators';
import { BOOKING_DETAIL_DEFAULT1 } from '../../../Constants/bkcConstants';
import Tooltip from '../../Commos/Tooltip';
import { NOT_EMPTY, ONLY_NUMBER, validation } from '../../../Helpers/validation';
import { MultipleSelect } from '../../Commos/MultipleSelect';
import { callApi } from '../../../Helpers/callApi';
import remove from 'lodash/remove';
export const ModalInsertBookDetail = (props) => {
    const dispatch = useDispatch();
    const isOpenBkcDetailModalInsert = useSelector(state => state.bkc.isOpenBkcDetailModalInsert)
    const [suggestionsEmployee, setSuggestionsEmployee] = useState([]);
    const [bookingDetail, setBookingDetail] = useState({ ...BOOKING_DETAIL_DEFAULT1 })
    const [error, setError] = useState({
        pickupLocation: "",
        pickupTime: "",
        employees: "",
        guestName: "",
        phone: ""
    });
    const [isDisabledBtnSave, setIsDisabledBtnSave] = useState(true);
    const [isDisabledGuestNameInput, setIsDisabledGuestNameInput] = useState(false);
    const [isDisabledEmployeeNameInput, setIsDisabledEmployeeNameInput] = useState(false);
    function handleClickSave() {
        let arrayValue = Object.values(error);
        if (arrayValue.length === 0) {
            props.onSave(bookingDetail);
            dispatch(toggleBkcDetailModalInsert(false))
            setBookingDetail({ ...BOOKING_DETAIL_DEFAULT1 })
            setError({
                pickupLocation: "",
                pickupTime: "",
                employees: "",
                guestName: "",
                phone: ""
            })
            setIsDisabledBtnSave(true);
            setIsDisabledEmployeeNameInput(false);
            setIsDisabledGuestNameInput(false);
        }
    }

    function handleClickCancel() {
        setBookingDetail({ ...BOOKING_DETAIL_DEFAULT1 })
        dispatch(toggleBkcDetailModalInsert(false))
        setError({
            pickupLocation: "",
            pickupTime: "",
            employees: "",
            guestName: "",
            phone: ""
        })
        setIsDisabledBtnSave(true);
        setIsDisabledEmployeeNameInput(false);
        setIsDisabledGuestNameInput(false);
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
                const employeeName = e.target.value;
                if (employeeName.length >= 3) {
                    const res = await callApi(`https://localhost:5001/api/bkc/search-by-employee-name/${employeeName}`);
                    const employees = res.data
                    const suggestionsEmployee = [];
                    for (let i = 0; i < employees.length; i++) {
                        suggestionsEmployee.push({
                            id: employees[i].id,
                            label: employees[i].name + " " + employees[i].buName,
                            content: employees[i].name
                        });
                    }
                    setSuggestionsEmployee(suggestionsEmployee);
                }
                return;
            }
            case "guestName": {
                if (isDisabledGuestNameInput) return;
                const guestName = e.target.value;
                if (guestName.length <= 0) {
                    setIsDisabledEmployeeNameInput(false);
                    setError({
                        ...error,
                        employees: "Employee or guest need to be fill",
                        guestName: "Employee or guest need to be fill"
                    });
                } else {
                    const cloneError = { ...error };
                    const { guestName: gn, employees: emps, ...rest } = cloneError;
                    setError(rest);
                    setIsDisabledEmployeeNameInput(true);
                }
                setBookingDetail({
                    ...bookingDetail,
                    [e.target.name]: e.target.value
                })
                return;
            }
            case "phone": {
                validateResult = validation(e.target.value, [NOT_EMPTY, ONLY_NUMBER]);
                break;
            }
            case "note": {
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
    function handleSelectedEmployee(item) {
        const employee = {
            id: item.id,
            name: item.content
        }
        const newEmployees = [...bookingDetail.employees, employee];
        setBookingDetail({
            ...bookingDetail,
            employees: newEmployees
        })
        const { employees: emp, guestName: gn, ...rest } = error;
        setError(rest);
        setIsDisabledGuestNameInput(true);
    }
    function handleDeleteEmployee(contentItem) {
        const cloneEmployees = [...bookingDetail.employees];
        if (cloneEmployees.length === 1) {
            setIsDisabledGuestNameInput(false);
            setError({
                ...error,
                employees: "Employee or guest need to be fill",
                guestName: "Employee or guest need to be fill"
            })
        }
        remove(cloneEmployees, (item) => {
            return item.id === contentItem;
        });
        setBookingDetail({
            ...bookingDetail,
            employees: cloneEmployees
        })

    }
    useEffect(() => {
        if (Object.keys(error).length === 0) {
            setIsDisabledBtnSave(false);
        }
        else {
            setIsDisabledBtnSave(true);
        }
    });
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
                    <Tooltip active={error.employees ? true : false} content={error.employees} direction="top">
                        <MultipleSelect
                            suggestions={suggestionsEmployee}
                            onChange={handleChange}
                            className="form-control"
                            name="employeeName"
                            onSelectedItem={handleSelectedEmployee}
                            onDeleteItem={handleDeleteEmployee}
                            isDisabled={isDisabledEmployeeNameInput}
                        />
                    </Tooltip>
                </div>
                <div className="col-6">

                    <Tooltip active={error.guestName ? true : false} content={error.guestName} direction="top">
                        <input
                            value={bookingDetail.guestName}
                            onChange={handleChange}
                            name="guestName"
                            className="form-control"
                            autoComplete="nope"
                            disabled={isDisabledGuestNameInput}
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
                    <div className="btn-group" role="group">
                        <button
                            disabled={isDisabledBtnSave}
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
            </div>
        </Modal>
    );
}
