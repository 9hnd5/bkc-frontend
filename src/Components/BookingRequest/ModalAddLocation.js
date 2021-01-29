import 'react-responsive-modal/styles.css';
import Modal from 'react-responsive-modal';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import moment from 'moment';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { NOT_EMPTY, ONLY_NUMBER, validation } from './../../Helpers/validation';
import { callApi } from './../../Helpers/callApi';
import remove from 'lodash/remove';
import { HTTP_METHOD, END_POINT, LOCATION_DEFAULT } from '../../Constants/CommonsConstants';
import { MultipleSelect } from './../Commons/MultipleSelect';
import { Tooltip } from './../Commons/Tooltip';
import { toggleModalAddLocation } from '../../ActionCreators/ticketActionCreator';
import { isEmpty } from 'lodash';
import { useTranslation } from 'react-i18next';
export const ModalAddLocation = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const isOpenModal = useSelector(state => state.ticketReducer.isOpenModalAddLocation)
    const [suggestionsEmployee, setSuggestionsEmployee] = useState([]);
    const [employees, setEmployees] = useState([]);
    const [location, setLocation] = useState({ ...LOCATION_DEFAULT })
    const [errors, setErrors] = useState({
        place: "",
        time: "",
        participants: "",
        guestName: "",
        phone: ""
    });
    const [isDisabledBtnSave, setIsDisabledBtnSave] = useState(true);
    const [isDisabledGuestNameInput, setIsDisabledGuestNameInput] = useState(false);
    const [isDisabledEmployeeNameInput, setIsDisabledEmployeeNameInput] = useState(false);
    function handleClickSave() {
        let arrayValue = Object.values(errors);
        if (arrayValue.length === 0) {
            props.onSave(location);
            dispatch(toggleModalAddLocation())
            setLocation({ ...LOCATION_DEFAULT })
            setErrors({
                place: "",
                time: "",
                participants: "",
                guestName: "",
                phone: ""
            })
            setSuggestionsEmployee([]);
            setIsDisabledBtnSave(true);
            setIsDisabledEmployeeNameInput(false);
            setIsDisabledGuestNameInput(false);
        }
    }
    function handleClickCancel() {
        dispatch(toggleModalAddLocation())
        setLocation({ ...LOCATION_DEFAULT })
        setErrors({
            place: "",
            time: "",
            participants: "",
            guestName: "",
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
            case "place": {
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
                    // const res = await callApi(`https://localhost:5001/api/bkc/employees/${employeeName}`, HTTP_METHOD.GET);
                    const res = await callApi(`${END_POINT}/employees/${employeeName}`, HTTP_METHOD.GET, null);
                    if (res.status !== 200) return;
                    const employees = res.data
                    const suggestionsEmployee = [];
                    for (let i = 0; i < employees.length; i++) {
                        suggestionsEmployee.push({
                            id: employees[i].id,
                            label: employees[i].name + " " + employees[i].buName,
                            content: employees[i].name
                        });
                    }
                    setEmployees(employees);
                    setSuggestionsEmployee(suggestionsEmployee);
                }
                return;
            }
            case "guestName": {
                if (isDisabledGuestNameInput) return;
                const guestName = e.target.value;
                if (guestName.length <= 0) {
                    setIsDisabledEmployeeNameInput(false);
                    setErrors({
                        ...errors,
                        participants: "Employee or guestName need to be fill",
                        guestName: "Employee or guestName need to be fill"
                    });
                } else {
                    const cloneError = { ...errors };
                    const { guestName: gn, participants: emps, ...rest } = cloneError;
                    setErrors(rest);
                    setIsDisabledEmployeeNameInput(true);
                }
                setLocation({
                    ...location,
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
            let { [e.target.name]: a, ...rest } = errors;
            setErrors(rest);
        }
        else {
            setErrors({
                ...errors,
                [e.target.name]: validateResult
            })
        }
        setLocation({
            ...location,
            [e.target.name]: e.target.value
        })
    }
    function onCloseModal() {
        dispatch(toggleModalAddLocation());
        setLocation({ ...LOCATION_DEFAULT })
        setErrors({
            place: "",
            time: "",
            participants: "",
            guestName: "",
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
                let { time: x, ...rest } = errors;
                setErrors(rest);
            } else {
                setErrors({
                    ...errors,
                    time: "This field is not valid"
                })
            }
            setLocation({
                ...location,
                time: time.format("H:mm")
            })

        } else {
            time = moment(momentObject, ["H:m", "H:mm"], true);
            let { time: x, ...rest } = errors;
            setErrors(rest);
            setLocation({
                ...location,
                time: time.format("H:mm")
            })
        }
    }
    function handleSelectedEmployee(item) {
        const employee = employees && employees.find(e => +e.id === +item.id);
        if (isEmpty(employee)) return;
        const participant = {
            employeeId: employee.id,
            employeeName: employee.name,
            employeeEmail: employee.email
        }
        const newParticipants = [...location.participants, participant];
        setLocation({
            ...location,
            participants: newParticipants
        })
        const { participants: emp, guestName: gn, ...rest } = errors;
        setErrors(rest);
        setIsDisabledGuestNameInput(true);
    }
    function handleDeleteEmployee(contentItem) {
        const cloneEmployees = [...location.participants];
        if (cloneEmployees.length === 1) {
            setIsDisabledGuestNameInput(false);
            setErrors({
                ...errors,
                participants: "Employee or guestName need to be fill",
                guestName: "Employee or guestName need to be fill"
            })
        }
        remove(cloneEmployees, (item) => {
            return item.employeeId === contentItem;
        });
        setLocation({
            ...location,
            participants: cloneEmployees
        })

    }
    useEffect(() => {
        if (Object.keys(errors).length === 0) {
            setIsDisabledBtnSave(false);
        }
        else {
            setIsDisabledBtnSave(true);
        }
    });
    return (
        <Modal
            open={isOpenModal}
            center
            onClose={onCloseModal}
        >
            <h5>{t("themchitiet")}</h5>
            <div className="row">
                <div className="col-6">
                    <label className="d-flex align-items-center">
                        <strong>{t("noidon")}</strong>
                        <i className="fas fa-asterisk fa-xs ml-1 asterisk" />
                    </label>
                </div>
                <div className="col-6">
                    <label className="d-flex align-items-center">
                        <strong>{t("giodon")}</strong>
                        <i className="fas fa-asterisk fa-xs ml-1 asterisk" />
                    </label>
                </div>
                <div className="w-100" />
                <div className="col-6">
                    <Tooltip active={errors.place ? true : false} content={errors.place} direction="top">
                        <input
                            value={location.place}
                            onChange={handleChange}
                            name="place"
                            className="form-control form-control-sm"
                            autoComplete="off"
                        />
                    </Tooltip>
                </div>
                <div className="col-6">
                    <Tooltip active={errors.time ? true : false} content={errors.time} direction="top">
                        <Datetime
                            dateFormat={false}
                            timeFormat="H:mm"
                            onChange={handleChangeTime}
                            initialValue={location.time}
                            inputProps={{ className: "form-control form-control-sm" }}
                        />
                    </Tooltip>
                </div>
                <div className="w-100" />
                <div className="col-6">
                    <label className="d-flex align-items-center">
                        <strong>{t("nhanvien")}</strong>
                        <i className="fas fa-asterisk fa-xs ml-1 asterisk" />
                    </label>
                </div>
                <div className="col-6">
                    <label><strong>{t("khach")}</strong></label>
                </div>
                <div className="w-100" />
                <div className="col-6">
                    <Tooltip active={errors.participants ? true : false} content={errors.participants} direction="top">
                        <MultipleSelect
                            suggestions={suggestionsEmployee}
                            onChange={handleChange}
                            className="form-control"
                            name="employeeName"
                            onSelectedItem={handleSelectedEmployee}
                            onDeleteItem={handleDeleteEmployee}
                            isDisabled={isDisabledEmployeeNameInput}
                            isMultipleSelected={true}
                        />
                    </Tooltip>
                </div>
                <div className="col-6">

                    <Tooltip active={errors.guestName ? true : false} content={errors.guestName} direction="top">
                        <input
                            value={location.guestName}
                            onChange={handleChange}
                            name="guestName"
                            className="form-control form-control-sm"
                            autoComplete="off"
                            disabled={isDisabledGuestNameInput}
                        />
                    </Tooltip>
                </div>
                <div className="w-100" />
                <div className="col-6">
                    <label className="d-flex align-items-center">
                        <strong>{t("sodienthoai")}</strong>
                        <i className="fas fa-asterisk fa-xs ml-1 asterisk" />
                    </label>
                </div>
                <div className="col-6">
                    <label><strong>{t("ghichu")}</strong></label>
                </div>
                <div className="w-100" />
                <div className="col-6">

                    <Tooltip active={errors.phone ? true : false} content={errors.phone} direction="top">
                        <input
                            value={location.phone}
                            onChange={handleChange}
                            name="phone"
                            className="form-control form-control-sm"
                            autoComplete="off"
                        />
                    </Tooltip>
                </div>
                <div className="col-6">

                    <Tooltip active={errors.note ? true : false} content={errors.note} direction="top">
                        <input
                            value={location.note}
                            onChange={handleChange}
                            name="note"
                            className="form-control form-control-sm"
                            autoComplete="off"
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
                            {t("xacnhan")}
                        </button>
                        <button
                            onClick={handleClickCancel}
                            className="btn btn-outline-info btn-sm"
                        >
                            <i className="fas fa-backspace mr-1"></i>
                            {t("quaylai")}
                        </button>
                    </div>
                </div>
            </div>
        </Modal>
    );
}
