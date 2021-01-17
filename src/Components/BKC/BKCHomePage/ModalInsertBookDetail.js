import 'react-responsive-modal/styles.css';
import Modal from 'react-responsive-modal';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleBkcDetailModalInsert } from '../../../ActionCreators/bkcActionCreators';
import { PICKUP_LOCATION_DEFAULT } from '../../../Constants/bkcConstants';
import Tooltip from '../../Commos/Tooltip';
import { NOT_EMPTY, ONLY_NUMBER, validation } from '../../../Helpers/validation';
import { MultipleSelect } from '../../Commos/MultipleSelect';
import { callApi } from '../../../Helpers/callApi';
import remove from 'lodash/remove';
import { HTTP_METHOD } from '../../../Constants/appConstants';
export const ModalInsertBookDetail = (props) => {
    const dispatch = useDispatch();
    const isOpenBkcDetailModalInsert = useSelector(state => state.bkc.isOpenBkcDetailModalInsert)
    const [suggestionsEmployee, setSuggestionsEmployee] = useState([]);
    const [pickupLocation, setPickupLocation] = useState({ ...PICKUP_LOCATION_DEFAULT })
    const [error, setError] = useState({
        location: "",
        time: "",
        participants: "",
        guest: "",
        phone: ""
    });
    const [isDisabledBtnSave, setIsDisabledBtnSave] = useState(true);
    const [isDisabledGuestNameInput, setIsDisabledGuestNameInput] = useState(false);
    const [isDisabledEmployeeNameInput, setIsDisabledEmployeeNameInput] = useState(false);
    function handleClickSave() {
        let arrayValue = Object.values(error);
        if (arrayValue.length === 0) {
            props.onSave(pickupLocation);
            dispatch(toggleBkcDetailModalInsert(false))
            setPickupLocation({ ...PICKUP_LOCATION_DEFAULT })
            setError({
                location: "",
                time: "",
                participants: "",
                guest: "",
                phone: ""
            })
            setSuggestionsEmployee([]);
            setIsDisabledBtnSave(true);
            setIsDisabledEmployeeNameInput(false);
            setIsDisabledGuestNameInput(false);
        }
    }

    function handleClickCancel() {
        setPickupLocation({ ...PICKUP_LOCATION_DEFAULT })
        dispatch(toggleBkcDetailModalInsert())
        setError({
            location: "",
            time: "",
            participants: "",
            guest: "",
            phone: ""
        })
        setSuggestionsEmployee([]);
        setIsDisabledBtnSave(true);
        setIsDisabledEmployeeNameInput(false);
        setIsDisabledGuestNameInput(false);
    }

    async function handleChange(e) {
        let validateResult = null;
        switch (e.target.name) {
            case "location": {
                validateResult = validation(e.target.value, [NOT_EMPTY]);
                break;
            }
            case "time": {
                validateResult = validation(e.target.value, [NOT_EMPTY]);
                break;
            }
            case "employeeName": {
                const employeeName = e.target.value;
                if (employeeName.length >= 3) {
                    const res = await callApi(`https://localhost:5001/api/bkc/employees/${employeeName}`, HTTP_METHOD.GET);
                    if(res.status !== 200) return;
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
            case "guest": {
                if (isDisabledGuestNameInput) return;
                const guest = e.target.value;
                if (guest.length <= 0) {
                    setIsDisabledEmployeeNameInput(false);
                    setError({
                        ...error,
                        participants: "Employee or guest need to be fill",
                        guest: "Employee or guest need to be fill"
                    });
                } else {
                    const cloneError = { ...error };
                    const { guest: gn, participants: emps, ...rest } = cloneError;
                    setError(rest);
                    setIsDisabledEmployeeNameInput(true);
                }
                setPickupLocation({
                    ...pickupLocation,
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
        setPickupLocation({
            ...pickupLocation,
            [e.target.name]: e.target.value
        })
    }
    function onCloseModal() {
        // dispatch(toggleBkcDetailModalInsert());
        setPickupLocation({ ...PICKUP_LOCATION_DEFAULT })
        dispatch(toggleBkcDetailModalInsert())
        setError({
            location: "",
            time: "",
            participants: "",
            guest: "",
            phone: ""
        })
        setSuggestionsEmployee([]);
        setIsDisabledBtnSave(true);
        setIsDisabledEmployeeNameInput(false);
        setIsDisabledGuestNameInput(false);
        
    }
    function handleChangeTime(momentObject) {
        let time = null;
        if (typeof momentObject === "string" || momentObject instanceof String) {
            time = moment(momentObject, ["H:m", "H:mm"], true);
            if (time.isValid()) {
                let { time: x, ...rest } = error;
                setError(rest);
            } else {
                setError({
                    ...error,
                    time: "This field is not valid"
                })
            }
            setPickupLocation({
                ...pickupLocation,
                time: time.format("H:mm")
            })

        } else {
            time = moment(momentObject, ["H:m", "H:mm"], true);
            let { time: x, ...rest } = error;
            setError(rest);
            setPickupLocation({
                ...pickupLocation,
                time: time.format("H:mm")
            })
        }
    }
    function handleSelectedEmployee(item) {
        const employee = {
            employeeId: item.id,
            employeeName: item.content
        }
        const newEmployees = [...pickupLocation.participants, employee];
        setPickupLocation({
            ...pickupLocation,
            participants: newEmployees
        })
        const { participants: emp, guest: gn, ...rest } = error;
        setError(rest);
        setIsDisabledGuestNameInput(true);
    }
    function handleDeleteEmployee(contentItem) {
        const cloneEmployees = [...pickupLocation.participants];
        if (cloneEmployees.length === 1) {
            setIsDisabledGuestNameInput(false);
            setError({
                ...error,
                participants: "Employee or guest need to be fill",
                guest: "Employee or guest need to be fill"
            })
        }
        remove(cloneEmployees, (item) => {
            return item.id === contentItem;
        });
        setPickupLocation({
            ...pickupLocation,
            participants: cloneEmployees
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
                    <Tooltip active={error.location ? true : false} content={error.location} direction="top">
                        <input
                            value={pickupLocation.location}
                            onChange={handleChange}
                            name="location"
                            className="form-control"
                            autoComplete="nope"
                        />
                    </Tooltip>
                </div>
                <div className="col-6">
                    <Tooltip active={error.time ? true : false} content={error.time} direction="top">
                        <Datetime
                            dateFormat={false}
                            timeFormat="H:mm"
                            onChange={handleChangeTime}
                            initialValue={pickupLocation.time}
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
                    <Tooltip active={error.participants ? true : false} content={error.participants} direction="top">
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

                    <Tooltip active={error.guest ? true : false} content={error.guest} direction="top">
                        <input
                            value={pickupLocation.guest}
                            onChange={handleChange}
                            name="guest"
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
                            value={pickupLocation.phone}
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
                            value={pickupLocation.noteByBooker}
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
