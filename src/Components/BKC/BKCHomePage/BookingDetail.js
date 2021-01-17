import { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setBookingDetail } from "../../../ActionCreators/bkcActionCreators";
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
import { BOOKING_DETAIL_DEFAULT } from "../../../Constants/bkcConstants";
import omit from "lodash/omit";
import { callApi } from "../../../Helpers/callApi";
import remove from 'lodash/remove';
import { MultipleSelect } from "../../Commos/MultipleSelect";
import emailIcon from './../../../Assets/Bootstrap-icon/email.svg'
import { HTTP_METHOD, URL } from "../../../Constants/appConstants";
import { useTranslation } from "react-i18next";
import isEmpty from 'lodash/isEmpty';
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
export const BookingDetail = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.bkc.isLoading);
    const [bookingDetailLocal, setBookingDetailLocal] = useState({ ...BOOKING_DETAIL_DEFAULT });
    const [suggestionsEmail, setSuggestionsEmail] = useState([]);
    console.log("bookingDetail", bookingDetailLocal);
    const [error, setError] = useState({
        movingDate: "",
        location: "",
        destination: "",
        totalPerson: ""

    });
    async function handleChange(e) {
        let validateResult = null;
        switch (e.target.name) {
            case "employeeName": {
                const employeeName = e.target.value;
                if (employeeName.length >= 3) {
                    const res = await callApi(`https://localhost:5001/api/bkc/employees/${employeeName}`);
                    if (res.status !== 200) return;
                    const employees = res.data
                    const suggestionsEmail = [];
                    for (let i = 0; i < employees.length; i++) {
                        suggestionsEmail.push({
                            id: employees[i].id,
                            label: employees[i].name + " " + employees[i].email,
                            content: employees[i].email
                        });
                    }
                    setSuggestionsEmail(suggestionsEmail);
                }
                return;
            }
            case "movingDate": {
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
            // case "reasonBooking": {
            //     validateResult = validation(e.target.value, [NOT_EMPTY]);
            // }
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
        setBookingDetailLocal({
            ...bookingDetailLocal,
            [e.target.name]: e.target.value
        })
    }
    function handleChangePickup(momentObject) {
        let movingDate = null;
        if (typeof momentObject === "string" || momentObject instanceof String) {
            movingDate = moment(momentObject, ["DD/MM/YYYY", "DD-MM-YYYY", "D/M/YYYY", "D-M-YYYY"], true);
            if (movingDate.isValid()) {
                let { movingDate: x, ...rest } = error;
                setError(rest);
                setBookingDetailLocal({
                    ...bookingDetailLocal,
                    movingDate: movingDate.format("DD/MM/YYYY")
                });
            } else {
                setError({
                    ...error,
                    movingDate: "This field is not valid"
                })
                setBookingDetailLocal({
                    ...bookingDetailLocal,
                    movingDate: movingDate.format("DD/MM/YYYY")
                });
            }

        } else {
            movingDate = moment(momentObject, ["DD/MM/YYYY", "DD-MM-YYYY"], true);
            let { movingDate: x, ...rest } = error;
            setError(rest);
            setBookingDetailLocal({
                ...bookingDetailLocal,
                movingDate: movingDate.format("DD/MM/YYYY")
            });
        }

    }
    function handleChangeReturnTime(momentObject) {
        let returningDate = null;
        if (typeof momentObject === "string" || momentObject instanceof String) {
            if (momentObject.length === 0) {
                setError(omit(error, "returningDate"));
                setBookingDetailLocal({
                    ...bookingDetailLocal,
                    returningDate: ""
                })
                return;
            }
            returningDate = moment(momentObject, ["DD/MM/YYYY", "DD-MM-YYYY", "D/M/YYYY", "D-M-YYYY"], true);
            if (returningDate.isValid()) {
                let { returningDate: x, ...rest } = error;
                setError(rest);
                setBookingDetailLocal({
                    ...bookingDetailLocal,
                    returningDate: returningDate.format("DD/MM/YYYY")
                });
            } else {
                setError({
                    ...error,
                    returningDate: "This field is not valid"
                })
                setBookingDetailLocal({
                    ...bookingDetailLocal,
                    returningDate: momentObject
                });
            }
        } else {
            returningDate = moment(momentObject, ["DD/MM/YYYY", "DD-MM-YYYY", "D/M/YYYY", "D-M-YYYY"], true);
            let { returningDate: x, ...rest } = error;
            setError(rest);
            setBookingDetailLocal({
                ...bookingDetailLocal,
                returningDate: returningDate.format("DD/MM/YYYY")
            });
        }
    }
    function handleSelectedEmployee(item) {
        const objEmail = {
            employeeId: item.id,
            employeeEmail: item.content
        }
        const newRelatePersons = [...bookingDetailLocal.relatePersons, objEmail];
        setBookingDetailLocal({
            ...bookingDetailLocal,
            relatePersons: newRelatePersons
        })
    }
    function handleDeleteEmployee(itemId) {
        const cloneRelatePersons = [...bookingDetailLocal.relatePersons];
        if (cloneRelatePersons.length === 1) {

        }
        remove(cloneRelatePersons, (item) => {
            return item.employeeId === itemId;
        });
        setBookingDetailLocal({
            ...bookingDetailLocal,
            relatePersons: cloneRelatePersons
        })

    }
    useEffect(() => {
        if (Object.keys(error).length === 0) {
            dispatch(setBookingDetail(bookingDetailLocal));
        }else{
            dispatch(setBookingDetail({}));
        }
    }, [error, bookingDetailLocal]);
    useEffect(() => {
        if(isLoading){
            setBookingDetailLocal({...BOOKING_DETAIL_DEFAULT});
        }
    }, [isLoading])
    useEffect(() => {
        if(isEmpty(props.bookingDetail)) return;
        setBookingDetailLocal({ ...props.bookingDetail });
        setError({});
    }, [props.bookingDetail])
    return (
        <div className="row bkc_form">
            <div className="col-12 col-xl-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6 col-xl-4">
                                <label className="d-flex align-items-center">
                                    <i className="fas fa-asterisk fa-xs mr-1 asterisk" />
                                    {t("ngaydi")}
                                </label>
                            </div>
                            <div className="col-6 col-xl-4">
                                <label className="d-flex align-items-center">
                                    {/* <i className="fas fa-asterisk fa-xs mr-1 asterisk" /> */}
                                    {t("ngayve")}
                                </label>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6 col-xl-4">
                                <Tooltip active={error.movingDate ? true : false} content={error.movingDate} direction="top">
                                    <Datetime
                                        renderInput={inputDtp}
                                        dateFormat="DD/MM/YYYY"
                                        timeFormat={false}
                                        closeOnSelect={true}
                                        inputProps={{ name: "movingDate", placeholder: "dd/mm/yyyy", value: bookingDetailLocal.movingDate }}
                                        onChange={handleChangePickup}
                                    />

                                </Tooltip>
                            </div>
                            <div className="col-6 col-xl-4">
                                <Tooltip active={error.returningDate ? true : false} content={error.returningDate} direction="top">
                                    <Datetime
                                        renderInput={inputDtp}
                                        dateFormat="DD/MM/YYYY"
                                        timeFormat={false}
                                        closeOnSelect={true}
                                        inputProps={{ name: "returningDate", placeholder: "dd/mm/yyyy", value: bookingDetailLocal.returningDate }}
                                        onChange={handleChangeReturnTime}
                                    />
                                </Tooltip>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6 col-xl-4">
                                <label className="d-flex align-items-center">
                                    <i className="fas fa-asterisk fa-xs mr-1 asterisk" />
                                    {t("diadiemden")}
                                </label>
                            </div>
                            <div className="col-6 col-xl-4">
                                <label className="d-flex align-items-center">
                                    <i className="fas fa-asterisk fa-xs mr-1 asterisk" />
                                    {t("diadiemdon")}
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
                                            value={bookingDetailLocal.location}
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
                                            value={bookingDetailLocal.destination}
                                            autoComplete="nope"
                                        />
                                    </div>

                                </Tooltip>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6 col-xl-4">
                                <label className="d-flex align-items-center">
                                    <i className="fas fa-asterisk fa-xs mr-1 asterisk" />
                                    {t("songuoidi")}
                                </label>
                            </div>
                            <div className="col-6 col-xl-4">
                                <label>{t("maildennguoilienquan")}</label>
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
                                            value={bookingDetailLocal.totalPerson}
                                            autoComplete="nope"
                                        />
                                    </div>
                                </Tooltip>
                            </div>

                            <div className="col-6 col-xl-4">
                                <MultipleSelect
                                    suggestions={suggestionsEmail}
                                    onChange={handleChange}
                                    className="form-control"
                                    name="employeeName"
                                    onSelectedItem={handleSelectedEmployee}
                                    onDeleteItem={handleDeleteEmployee}
                                    icon={emailIcon}
                                    initialValue={
                                        bookingDetailLocal.relatePersons.map((item) => {
                                            return {
                                                id: item.employeeId,
                                                content: item.employeeEmail
                                            }
                                        })
                                    }
                                />
                            </div>

                            <div className="w-100"></div>
                            <div className="col-6 col-xl-4">
                                <label>{t("lydodatxe")}</label>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6 col-xl-4">
                                <Tooltip active={error.reasonBooking ? true : false} content={error.reasonBooking} direction="top">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <i className="bi bi-question-circle input-group-text"></i>
                                        </div>
                                        <input
                                            onChange={handleChange}
                                            className="form-control"
                                            name="reasonBooking"
                                            value={bookingDetailLocal.reasonBooking}
                                            autoComplete="nope"
                                        />
                                    </div>
                                </Tooltip>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}