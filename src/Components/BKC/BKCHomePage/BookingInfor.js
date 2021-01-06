import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { insertBookingInfor, requestFilterEmployeeByEmail, toggleBkInforValid } from "../../../ActionCreators/bkcActionCreators";
import { NOT_EMPTY, ONLY_NUMBER, validation } from "../../../Helpers/validation";
import Tooltip from "../../Commos/Tooltip";
import moment from 'moment';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import pickupTimeIcon from './../../../Assets/Bootstrap-icon/calendar2-check.svg'
import locationIcon from './../../../Assets/Bootstrap-icon/geo-alt.svg'
import destinationIcon from './../../../Assets/Bootstrap-icon/geo-alt-fill.svg'
import totalPersonIcon from './../../../Assets/Bootstrap-icon/people.svg'
import React from 'react';
import { AutoComplete1 } from "../../Commos/AutoComplete1";
function inputDtp(props) {
    return (
        <div className="input-group">
            <div className="input-group-prepend">
                <img alt="" className="input-group-text" src={pickupTimeIcon} />
            </div>
            <input
                className="form-control"
                autoComplete="nope"
                {...props}
            />
        </div>
    );
}
function inputCcperson(handleChange, handleBlur, handleClickInput, value) {
    return (
        <div className="input-group">
            <div className="input-group-prepend">
                {/* <img className="input-group-text" alt="" src={ccMailIcon} /> */}
                <i className="bi bi-envelope input-group-text" />
            </div>
            <input className="form-control"
                onChange={handleChange}
                // onBlur={handleBlur}
                onClick={handleClickInput}
                value={value}
                autoComplete="nope"
            />
        </div>
    )
}
export const BookingInfor = (props) => {
    const dispatch = useDispatch();
    const bookingInfor = useSelector(state => state.bkc.bookingInfor);
    const suggestions = useSelector(state => state.bkc.listFilterEmployee);
    const [error, setError] = useState({});
    console.log('error', error);
    const isFirstRender = useRef(true);
    const [tOut, setTOut] = useState("");
    function handleChange(e) {
        let validateResult = null;
        switch (e.target.name) {
            case "pickupTime": {
                validateResult = validation(e.target.value, [NOT_EMPTY]);
                break;
            }
            case "returnTime": {
                validateResult = validation(e.target.value, [NOT_EMPTY]);
                break;
            }
            case "location": {
                validateResult = validation(e.target.value, [NOT_EMPTY]);
                break;
            }
            case "destination": {
                validateResult = validation(e.target.value, [NOT_EMPTY]);
                break;
            }
            case "totalPerson": {
                validateResult = validation(e.target.value, [NOT_EMPTY, ONLY_NUMBER]);
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
        dispatch(insertBookingInfor(e.target.name, e.target.value));
    }
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false;
            return;
        }
        let arrayValue = Object.keys(error);
        if (arrayValue.length === 0) {
            dispatch(toggleBkInforValid(true));
        }
        else {
            dispatch(toggleBkInforValid(false));
        }
    }, [bookingInfor, dispatch, error])

    function handleChangePickup(momentObject) {
        let pickupTime = null;
        if (typeof momentObject === "string" || momentObject instanceof String) {
            pickupTime = moment(momentObject, ["DD/MM/YYYY", "DD-MM-YYYY", "D/M/YYYY", "D-M-YYYY"], true);
            if (pickupTime.isValid()) {
                let { pickupTime: x, ...rest } = error;
                setError(rest);
                dispatch(insertBookingInfor("pickupTime", pickupTime.format("DD/MM/YYYY")));
            } else {
                setError({
                    ...error,
                    pickupTime: "This field is not valid"
                })
                dispatch(insertBookingInfor("pickupTime", momentObject));
            }

        } else {
            pickupTime = moment(momentObject, ["DD/MM/YYYY", "DD-MM-YYYY"], true);
            let { pickupTime: x, ...rest } = error;
            setError(rest);
            dispatch(insertBookingInfor("pickupTime", pickupTime.format("DD/MM/YYYY")));
        }

    }
    function handleChangeReturnTime(momentObject) {
        let returnTime = null;
        if (typeof momentObject === "string" || momentObject instanceof String) {
            returnTime = moment(momentObject, ["DD/MM/YYYY", "DD-MM-YYYY", "D/M/YYYY", "D-M-YYYY"], true);
            if (returnTime.isValid()) {
                let { returnTime: x, ...rest } = error;
                setError(rest);
                dispatch(insertBookingInfor("returnTime", returnTime.format("DD/MM/YYYY")));
            } else {
                setError({
                    ...error,
                    returnTime: "This field is not valid"
                })
                dispatch(insertBookingInfor("returnTime", momentObject));
            }
        } else {
            returnTime = moment(momentObject, ["DD/MM/YYYY", "DD-MM-YYYY", "D/M/YYYY", "D-M-YYYY"], true);
            let { returnTime: x, ...rest } = error;
            setError(rest);
            dispatch(insertBookingInfor("returnTime", returnTime.format("DD/MM/YYYY")));
        }
    }
    function handleChangeCcPerson(value) {
        if (tOut) {
            clearTimeout(tOut);
        }
        const t = setTimeout(() => {
            console.log("Starting search");
            if (value.length >= 3) {
                dispatch(requestFilterEmployeeByEmail(value));
            }
        }, 500);
        setTOut(t);
        dispatch(insertBookingInfor("mailToManager", value));
    }
    function handleClickCcPerson(value) {
        dispatch(insertBookingInfor("mailToManager", value));
    }
    return (
        <div className="row bkc_form">
            <div className="col-12 col-xl-12">
                <div className="card">
                    <div className="card-header">
                        <h4>THÔNG TIN ĐẶT XE</h4>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6 col-xl-4">
                                <label className="d-flex align-items-center">
                                    <i className="fas fa-asterisk fa-xs mr-1 asterisk" />
                                    Ngày Đi
                                    </label>
                            </div>
                            <div className="col-6 col-xl-4">
                                <label className="d-flex align-items-center">
                                    <i className="fas fa-asterisk fa-xs mr-1 asterisk" />
                                    Ngày Về
                                </label>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6 col-xl-4">
                                <Tooltip active={error.pickupTime ? true : false} content={error.pickupTime} direction="top">
                                    <Datetime
                                        renderInput={inputDtp}
                                        dateFormat="DD/MM/YYYY"
                                        timeFormat={false}
                                        closeOnSelect={true}
                                        inputProps={{ name: "pickupTime", placeholder: "dd/mm/yyyy", value: bookingInfor.pickupTime }}
                                        onChange={handleChangePickup}
                                    />

                                </Tooltip>
                            </div>
                            <div className="col-6 col-xl-4">
                                <Tooltip active={error.returnTime ? true : false} content={error.returnTime} direction="top">
                                    <Datetime
                                        renderInput={inputDtp}
                                        dateFormat="DD/MM/YYYY"
                                        timeFormat={false}
                                        closeOnSelect={true}
                                        inputProps={{ name: "returnTime", placeholder: "dd/mm/yyyy", value: bookingInfor.returnTime }}
                                        onChange={handleChangeReturnTime}
                                    />
                                </Tooltip>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6 col-xl-4">
                                <label className="d-flex align-items-center">
                                    <i className="fas fa-asterisk fa-xs mr-1 asterisk" />
                                    Địa Điểm Đón
                                </label>
                            </div>
                            <div className="col-6 col-xl-4">
                                <label className="d-flex align-items-center">
                                    <i className="fas fa-asterisk fa-xs mr-1 asterisk" />
                                    Địa Điểm Đến
                                </label>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6 col-xl-4">
                                <Tooltip active={error.location ? true : false} content={error.location} direction="top">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <img alt="" className="input-group-text" src={locationIcon} />
                                        </div>
                                        <input
                                            onChange={handleChange}
                                            className="form-control"
                                            name="location"
                                            value={bookingInfor.location}
                                            autoComplete={"nope"}
                                        />
                                    </div>
                                </Tooltip>
                            </div>
                            <div className="col-6 col-xl-4">
                                <Tooltip active={error.destination ? true : false} content={error.destination} direction="top">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <img alt="" className="input-group-text" src={destinationIcon} />
                                        </div>
                                        <input onChange={handleChange}
                                            className="form-control"
                                            name="destination"
                                            value={bookingInfor.destination}
                                            autoComplete="nope"
                                        />
                                    </div>

                                </Tooltip>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6 col-xl-4">
                                <label className="d-flex align-items-center">
                                    <i className="fas fa-asterisk fa-xs mr-1 asterisk" />
                                    Số Người Đi
                                </label>
                            </div>
                            <div className="col-6 col-xl-4">
                                <label>Mail Đến Quản Lý</label>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6 col-xl-4">

                                <Tooltip active={error.totalPerson ? true : false} content={error.totalPerson} direction="top">

                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <img alt="" className="input-group-text" src={totalPersonIcon} />
                                        </div>
                                        <input
                                            onChange={handleChange}
                                            className="form-control"
                                            name="totalPerson"
                                            value={bookingInfor.totalPerson}
                                            autoComplete="nope"
                                        />
                                    </div>
                                </Tooltip>
                            </div>
                            <div className="col-6 col-xl-4">
                                <AutoComplete1
                                    suggestions={suggestions}
                                    onChange={handleChangeCcPerson}
                                    onClick={handleClickCcPerson}
                                    inputCustom={inputCcperson}
                                    defaultValue={bookingInfor.mailToManager}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}