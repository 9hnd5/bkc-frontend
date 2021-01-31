import { Fragment, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { deleteDriver, deleteDriverRequest, updateDriverRequest } from "../../ActionCreators/driverManagementActionCreator";
import { DRIVER_ADD_DEFAULT, END_POINT, HTTP_METHOD } from "../../Constants/CommonsConstants";
import { callApi } from "../../Helpers/callApi";
import formatPhoneNumber from "../../Helpers/formatPhoneNumber";
import { notification, NOTIFICATION_TYPE } from "../../Helpers/notification";
import { AutoComplete1 } from "../Commons/AutoComplete1";
import isEmpty from 'lodash/isEmpty';

export const DriverItem = props => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { no } = props;
    const [isUpdate, setIsUpdate] = useState(false);
    const [employees, setEmployees] = useState([]);
    const [suggestionDriverNames, setSuggestionDriverNames] = useState([]);
    const [driverLocal, setDriverLocal] = useState({ ...DRIVER_ADD_DEFAULT })
    const [prevDriverLocal, setPrevDriverLocal] = useState({ ...DRIVER_ADD_DEFAULT })
    const cars = useSelector(state => state.driverManagementReducer.cars);
    console.log("cars", cars);
    console.log("driverLocal", driverLocal);
    async function handleChange(e) {
        if (e.target.name === "employeeName") {
            const employeeName = e.target.value;
            const res = await callApi(`${END_POINT}/employees/${employeeName}`, HTTP_METHOD.GET, null);
            const employees = res.data;
            const suggestionDriverNames = employees && employees.map(e => {
                return {
                    id: e.id,
                    content: e.name
                }
            });
            setEmployees(employees);
            setSuggestionDriverNames(suggestionDriverNames);
        }
        setDriverLocal({
            ...driverLocal,
            [e.target.name]: e.target.value
        })
    }
    function handleClick(suggestion) {
        const employee = employees.find(e => {
            return +e.id === +suggestion.id
        });
        setDriverLocal({
            ...driverLocal,
            employeeName: employee.name,
            employeeId: employee.id,
            employeePhone: employee.phone,
            employeeBuName: employee.buName,
            employeeBuId: employee.buId,
            employeeEmail: employee.email
        })
    }
    function handleClickAccepted() {
        dispatch(updateDriverRequest(driverLocal));
        setIsUpdate(false);
    }
    function handleClickCancel() {
        setIsUpdate(false);
        setDriverLocal(prevDriverLocal);
    }
    function handleClickUpdate() {
        setIsUpdate(true);
    }
    function handleClickDelete() {
        dispatch(deleteDriverRequest(driverLocal));
        setIsUpdate(false);
    }
    function handleCarChange(e) {
        const car = cars.find(car => {
            return +car.id === +e.target.value
        });
        setDriverLocal({
            ...driverLocal,
            carId: e.target.value,
            car: car
        })
    }
    // useEffect(() => {
    //     async function fetchCars() {
    //         const res = await callApi(`${END_POINT}/cars/?buId=${employee.buId}`, HTTP_METHOD.GET, null);
    //         if (res.status !== 200) return notification(NOTIFICATION_TYPE.ERROR, "Load car fail");
    //         const cars = res.data;
    //         setCars(cars);
    //     }
    //     fetchCars();
    // }, []);
    useEffect(() => {
        setDriverLocal(props.driver);
        setPrevDriverLocal(props.driver);
    }, [props.driver]);
    return (
        <Fragment>
            <tr>
                <td data-label={t("stt")}>{no}</td>
                <td data-label={t("tentaixe")}>
                    {
                        isUpdate ?
                            <AutoComplete1
                                suggestions={suggestionDriverNames}
                                onChange={handleChange}
                                className="form-control form-control-sm"
                                onClick={handleClick}
                                name="employeeName"
                                initialValue={driverLocal.employeeName}
                            />
                            : driverLocal.employeeName
                    }
                </td>
                <td data-label={t("sodienthoaitaixe")}>{isUpdate ? <input autoComplete="off" value={formatPhoneNumber(driverLocal.employeePhone)} onChange={handleChange} type="text" className="form-control form-control-sm" name="employeePhone" /> : formatPhoneNumber(driverLocal.employeePhone)}</td>
                <td data-label={t("tenbu")}>{isUpdate ? <input autoComplete="off" value={driverLocal.employeeBuName} onChange={handleChange} type="text" className="form-control form-control-sm" name="employeeBuName" /> : driverLocal.employeeBuName}</td>
                <td data-label={t("biensoxe")}>
                    {
                        isUpdate ?
                            <select onChange={handleCarChange} value={driverLocal.carId} className="custom-select custom-select-sm">
                                <option value="">---{isEmpty(cars) ? "Hết xe" : t("chonxe")}---</option>
                                {
                                    cars && cars.map((car, index) => {
                                        return <option key={index} value={car.id}>{car.number}</option>
                                    })
                                }
                            </select> :
                            driverLocal && driverLocal.car && driverLocal.car.number ? driverLocal.car.number : "Chưa gán xe"
                    }
                </td>
                <td data-label={t("socho")}>{driverLocal.car && driverLocal.car.totalSeat}</td>
                <td data-label={t("hanhdong")}>
                    {
                        isUpdate ?
                            <Fragment>
                                <button onClick={handleClickAccepted} className="btn btn-outline-primary btn-sm mr-1">
                                    <i className="fas fa-check-circle mr-1"></i>
                                    {t("xacnhan")}
                                </button>
                                {/* <div className="col-12 col-xl-6">
                                </div>
                                <div className="col-12 col-xl-6">
                                </div> */}
                                <button onClick={handleClickCancel} className="btn btn-outline-info btn-sm">
                                    <i className="fas fa-backspace mr-1"></i>
                                    {t("quaylai")}
                                </button>
                            </Fragment> :
                            <Fragment>
                                <button onClick={handleClickUpdate} className="btn btn-outline-primary btn-sm mr-1">
                                    <i className="fas fa-edit mr-1"></i>
                                    {t("suayeucau")}
                                </button>
                                <button onClick={handleClickDelete} className="btn btn-outline-danger btn-sm">
                                    <i className="fas fa-trash-alt mr-1"></i>
                                    {t("xoayeucau")}
                                </button>
                            </Fragment>
                    }
                </td>
            </tr>
        </Fragment>
    );
}