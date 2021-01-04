import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { insertBookingInfor, requestFilterEmployeeByEmail, toggleBkInforValid } from "../../../ActionCreators/bkcActionCreators";
import { NOT_EMPTY, ONLY_NUMBER, validation } from "../../../Helpers/validation";
import Tooltip from "../../Commos/Tooltip";
import moment from 'moment';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import "react-datepicker/dist/react-datepicker.css";
import pickupTimeIcon from './../../../Assets/Bootstrap-icon/calendar2-check.svg'
import locationIcon from './../../../Assets/Bootstrap-icon/geo-alt.svg'
import destinationIcon from './../../../Assets/Bootstrap-icon/geo-alt-fill.svg'
import totalPersonIcon from './../../../Assets/Bootstrap-icon/people.svg'
import ccMailIcon from './../../../Assets/Bootstrap-icon/badge-cc.svg'
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
                <img className="input-group-text" alt="" src={ccMailIcon} />
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
    console.log("booking infr", bookingInfor);
    const suggestions = useSelector(state => state.bkc.listFilterEmployee);
    const [error, setError] = useState({
        pickupTime: "",
        returnTime: "",
        location: "",
        destination: "",
        totalPerson: ""

    });
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
        let arrayValue = Object.values(error);
        if (arrayValue.length === 0) {
            dispatch(toggleBkInforValid(true));
            // dispatch(insertBookingInfor(bookingInfor));
        }
        else {
            dispatch(toggleBkInforValid(false));
            // dispatch(insertBookingInfor({}));
        }
    }, [bookingInfor, dispatch, error])

    function handleChangePickup(momentObject) {
        let pickupTime = null;
        if (typeof momentObject === "string" || momentObject instanceof String) {
            pickupTime = moment(momentObject, ["DD/MM/YYYY", "DD-MM-YYYY", "D/M/YYYY", "D-M-YYYY"], true);
            if (pickupTime.isValid()) {
                let { pickupTime, ...rest } = error;
                setError(rest);
            } else {
                setError({
                    ...error,
                    pickupTime: "This field is not valid"
                })
            }
            dispatch(insertBookingInfor("pickupTime", pickupTime.format("DD/MM/YYYY")));

        } else {
            pickupTime = moment(momentObject, ["DD/MM/YYYY", "DD-MM-YYYY"], true);
            if (pickupTime.isValid()) {
                let { pickupTime, ...rest } = error;
                setError(rest);
            } else {
                setError({
                    ...error,
                    pickupTime: "This field is not valid"
                })
            }
            dispatch(insertBookingInfor("pickupTime", pickupTime.format("DD/MM/YYYY")));
        }

    }
    function handleChangeReturnTime(momentObject) {
        let returnTime = null;
        if (typeof momentObject === "string" || momentObject instanceof String) {
            returnTime = moment(momentObject, ["DD/MM/YYYY", "DD-MM-YYYY", "D/M/YYYY", "D-M-YYYY"], true);
            if (returnTime.isValid()) {
                let { returnTime, ...rest } = error;
                setError(rest);
            } else {
                setError({
                    ...error,
                    returnTime: "This field is not valid"
                })
            }
            dispatch(insertBookingInfor("returnTime", returnTime.format("DD/MM/YYYY")));
        } else {
            returnTime = moment(momentObject, ["DD/MM/YYYY", "DD-MM-YYYY", "D/M/YYYY", "D-M-YYYY"], true);
            if (returnTime.isValid()) {
                let { returnTime, ...rest } = error;
                setError(rest);
            } else {
                setError({
                    ...error,
                    returnTime: "This field is not valid"
                })
            }
           
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
        }, 2000);
        setTOut(t);
        dispatch(insertBookingInfor("ccPerson", value));
    }
    function handleClickCcPerson(value) {
        dispatch(insertBookingInfor("ccPerson", value));
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
                                <label>Ngày Đi</label>
                            </div>
                            <div className="col-6 col-xl-4">
                                <label>Ngày Về</label>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6 col-xl-4">
                                <Tooltip active={error.pickupTime ? true : false} content={error.pickupTime} direction="top">
                                    <Datetime
                                        renderInput={inputDtp}
                                        dateFormat="DD/MM/YYYY"
                                        timeFormat={false}
                                        closeOnSelect={true}
                                        inputProps={{ name: "pickupTime", placeholder: "dd/mm/yyyy" }}
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
                                        inputProps={{ name: "returnTime", placeholder: "dd/mm/yyyy" }}
                                        onChange={handleChangeReturnTime}
                                    />
                                </Tooltip>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6 col-xl-4">
                                <label>Địa Điểm Đón</label>
                            </div>
                            <div className="col-6 col-xl-4">
                                <label>Địa Điểm Đến</label>
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
                                <label>Số Người Đi</label>
                            </div>
                            <div className="col-6 col-xl-4">
                                <label>CC Người Liên Quan</label>
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
                                {/* <div className="input-group">
                                    <div className="input-group-prepend">
                                        <img alt="" className="input-group-text" src={ccMailIcon} />
                                    </div>
                                    <input
                                        onChange={handleChange}
                                        className="form-control"
                                        name="ccPersons"
                                        value={bookingInfor.ccPersons}
                                    />
                                </div> */}
                                {/* <Autocomplete
                                    suggestions={["a", "b", "c", "cc", "ccc"]}
                                    value={bookingInfor.ccPerson}
                                    onChange={handleChange}
                                /> */}
                                <AutoComplete1
                                    suggestions={suggestions}
                                    onChange={handleChangeCcPerson}
                                    onClick={handleClickCcPerson}
                                    inputCustom={inputCcperson}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}