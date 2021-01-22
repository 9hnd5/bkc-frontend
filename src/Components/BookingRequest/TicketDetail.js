import moment from 'moment';
import Datetime from 'react-datetime';
import "react-datetime/css/react-datetime.css";
import pickupTimeIcon from './../../Assets/Bootstrap-icon/calendar2-check.svg'
import locationIcon from './../../Assets/Bootstrap-icon/geo-alt.svg'
import destinationIcon from './../../Assets/Bootstrap-icon/geo-alt-fill.svg'
import totalPersonIcon from './../../Assets/Bootstrap-icon/people.svg'
import emailIcon from './../../Assets/Bootstrap-icon/people.svg';
import { Tooltip } from "../Commons/Tooltip";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from 'react-redux';
import { remove, omit, isEmpty } from 'lodash';
import { NOT_EMPTY, ONLY_NUMBER, validation } from '../../Helpers/validation';
import { callApi } from '../../Helpers/callApi';
import { useEffect, useState } from 'react';
import { MultipleSelect } from '../Commons/MultipleSelect';
import { BOOKING_DETAIL_DEFAULT, END_POINT, HTTP_METHOD } from '../../Constants/CommonsConstants';
import { setTicketDetail } from '../../ActionCreators/ticketActionCreator';
import { useParams } from 'react-router-dom';
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
export const TicketDetail = () => {
    const { t } = useTranslation();
    const { ticketId, action } = useParams();
    const dispatch = useDispatch();
    const tickets = useSelector(state => state.bookingHistoryReducer.tickets)
    const [ticketDetailLocal, setTicketDetailLocal] = useState({ ...BOOKING_DETAIL_DEFAULT });
    console.log("ticketDetailLocal", ticketDetailLocal);
    const [suggestionsEmail, setSuggestionsEmail] = useState([]);
    const [errors, setErrors] = useState({
        startDate: "",
        fromLocation: "",
        toLocation: "",
        totalParticipant: ""
    });
    async function handleChange(e) {
        let validateResult = null;
        switch (e.target.name) {
            case "employeeName": {
                const employeeName = e.target.value;
                if (employeeName.length >= 3) {
                    const res = await callApi(`${END_POINT}/employees/${employeeName}`, HTTP_METHOD.GET, null);
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
            case "startDate": {
                validateResult = validation(e.target.value, [NOT_EMPTY]);
                break;
            }
            case "fromLocation": {
                validateResult = validation(e.target.value, [NOT_EMPTY]);
                break;
            }
            case "toLocation": {
                validateResult = validation(e.target.value, [NOT_EMPTY]);
                break;
            }
            case "totalParticipant": {
                validateResult = validation(e.target.value, [NOT_EMPTY, ONLY_NUMBER]);
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
        setTicketDetailLocal({
            ...ticketDetailLocal,
            [e.target.name]: e.target.value
        })
    }
    function handleChangePickup(momentObject) {
        let startDate = null;
        if (typeof momentObject === "string" || momentObject instanceof String) {
            startDate = moment(momentObject, ["DD/MM/YYYY", "DD-MM-YYYY", "D/M/YYYY", "D-M-YYYY"], true);
            if (startDate.isValid()) {
                let { startDate: x, ...rest } = errors;
                setErrors(rest);
                setTicketDetailLocal({
                    ...ticketDetailLocal,
                    startDate: startDate.format("DD/MM/YYYY")
                });
            } else {
                setErrors({
                    ...errors,
                    startDate: "This field is not valid"
                })
                setTicketDetailLocal({
                    ...ticketDetailLocal,
                    startDate: startDate.format("DD/MM/YYYY")
                });
            }

        } else {
            startDate = moment(momentObject, ["DD/MM/YYYY", "DD-MM-YYYY"], true);
            let { startDate: x, ...rest } = errors;
            setErrors(rest);
            setTicketDetailLocal({
                ...ticketDetailLocal,
                startDate: startDate.format("DD/MM/YYYY")
            });
        }

    }
    function handleChangeReturnTime(momentObject) {
        let endDate = null;
        if (typeof momentObject === "string" || momentObject instanceof String) {
            if (momentObject.length === 0) {
                setErrors(omit(errors, "endDate"));
                setTicketDetailLocal({
                    ...ticketDetailLocal,
                    endDate: ""
                })
                return;
            }
            endDate = moment(momentObject, ["DD/MM/YYYY", "DD-MM-YYYY", "D/M/YYYY", "D-M-YYYY"], true);
            if (endDate.isValid()) {
                let { endDate: x, ...rest } = errors;
                setErrors(rest);
                setTicketDetailLocal({
                    ...ticketDetailLocal,
                    endDate: endDate.format("DD/MM/YYYY")
                });
            } else {
                setErrors({
                    ...errors,
                    endDate: "This field is not valid"
                })
                setTicketDetailLocal({
                    ...ticketDetailLocal,
                    endDate: momentObject
                });
            }
        } else {
            endDate = moment(momentObject, ["DD/MM/YYYY", "DD-MM-YYYY", "D/M/YYYY", "D-M-YYYY"], true);
            let { endDate: x, ...rest } = errors;
            setErrors(rest);
            setTicketDetailLocal({
                ...ticketDetailLocal,
                endDate: endDate.format("DD/MM/YYYY")
            });
        }
    }
    function handleSelectedEmployee(item) {
        const objEmail = {
            employeeId: item.id,
            employeeEmail: item.content
        }
        const newRelatePersons = [...ticketDetailLocal.relatedPeoples, objEmail];
        setTicketDetailLocal({
            ...ticketDetailLocal,
            relatedPeoples: newRelatePersons
        })
    }
    function handleDeleteEmployee(itemId) {
        const cloneRelatePersons = [...ticketDetailLocal.relatedPeoples];
        if (cloneRelatePersons.length === 1) {

        }
        remove(cloneRelatePersons, (item) => {
            return item.employeeId === itemId;
        });
        setTicketDetailLocal({
            ...ticketDetailLocal,
            relatedPeoples: cloneRelatePersons
        })

    }
    useEffect(() => {
        if (!isEmpty(errors)) return dispatch(setTicketDetail({}));;
        dispatch(setTicketDetail(ticketDetailLocal));
    }, [ticketDetailLocal, errors])
    useEffect(() => {
        const ticket = tickets.find(item => {
            return item.id === +ticketId;
        });
        if (ticket) {
            const ticketDetail = {
                startDate: ticket.startDate,
                endDate: ticket.endDate,
                fromLocation: ticket.fromLocation,
                toLocation: ticket.toLocation,
                totalParticipant: ticket.totalParticipant,
                relatedPeoples: ticket.relatedPeoples ? ticket.relatedPeoples : [],
                reasonBooking: ticket.reasonBooking
            }
            setTicketDetailLocal(ticketDetail);
            setErrors({});
        } else {
            setTicketDetailLocal({ ...BOOKING_DETAIL_DEFAULT });
            setErrors({
                startDate: "",
                fromLocation: "",
                toLocation: "",
                totalParticipant: ""
            })
        }
    }, [tickets]);
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
                                    {t("ngayve")}
                                </label>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6 col-xl-4">
                                <Tooltip active={errors.startDate ? true : false} content={errors.startDate} direction="top">
                                    <Datetime
                                        renderInput={inputDtp}
                                        dateFormat="DD/MM/YYYY"
                                        timeFormat={false}
                                        closeOnSelect={true}
                                        inputProps={{ name: "startDate", placeholder: "dd/mm/yyyy", value: ticketDetailLocal.startDate }}
                                        onChange={handleChangePickup}
                                    />

                                </Tooltip>
                            </div>
                            <div className="col-6 col-xl-4">
                                <Tooltip active={errors.endDate ? true : false} content={errors.endDate} direction="top">
                                    <Datetime
                                        renderInput={inputDtp}
                                        dateFormat="DD/MM/YYYY"
                                        timeFormat={false}
                                        closeOnSelect={true}
                                        inputProps={{ name: "endDate", placeholder: "dd/mm/yyyy", value: ticketDetailLocal.endDate }}
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
                                <Tooltip active={errors.fromLocation ? true : false} content={errors.fromLocation} direction="top">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <img alt="" className="input-group-text" src={locationIcon} />
                                        </div>
                                        <input
                                            onChange={handleChange}
                                            className="form-control"
                                            name="fromLocation"
                                            value={ticketDetailLocal.fromLocation}
                                            autoComplete={"nope"}
                                        />
                                    </div>
                                </Tooltip>
                            </div>
                            <div className="col-6 col-xl-4">
                                <Tooltip active={errors.toLocation ? true : false} content={errors.toLocation} direction="top">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <img alt="" className="input-group-text" src={destinationIcon} />
                                        </div>
                                        <input onChange={handleChange}
                                            className="form-control"
                                            name="toLocation"
                                            value={ticketDetailLocal.toLocation}
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
                                <Tooltip active={errors.totalParticipant ? true : false} content={errors.totalParticipant} direction="top">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <img alt="" className="input-group-text" src={totalPersonIcon} />
                                        </div>
                                        <input
                                            onChange={handleChange}
                                            className="form-control"
                                            name="totalParticipant"
                                            value={ticketDetailLocal.totalParticipant}
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
                                        ticketDetailLocal && ticketDetailLocal.relatedPeoples.map((item) => {
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
                                <Tooltip active={errors.reasonBooking ? true : false} content={errors.reasonBooking} direction="top">
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <i className="bi bi-question-circle input-group-text"></i>
                                        </div>
                                        <input
                                            onChange={handleChange}
                                            className="form-control"
                                            name="reasonBooking"
                                            value={ticketDetailLocal.reasonBooking}
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