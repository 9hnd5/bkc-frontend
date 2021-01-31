import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setTicketInformation } from "../../ActionCreators/ticketActionCreator";
import formatPhoneNumber from "../../Helpers/formatPhoneNumber";

export const TicketInformation = (props) => {
    const dispatch = useDispatch();
    const employee = useSelector(state => state.appReducer.employee);
    const { name, phone, buName, lineManagerName, department } = employee;
    const { t } = useTranslation();
    useEffect(() => {
        const ticketInformation = {
            employeeId: employee.id,
            employeeName: employee.name,
            employeeLineManagerId: employee.lineManagerId,
            employeeLineManagerName: employee.lineManagerName,
            employeePhone: employee.phone,
            employeeBuId: employee.buId,
            employeeBuName: employee.buName,
            employeeDepartment: employee.department,
        }
        dispatch(setTicketInformation(ticketInformation));
    }, [employee]);
    return (
        <div className="row">
            <div className="col-12 col-xl-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12 col-xl-3">
                                <h5>{t("thongtinnguoidat")}</h5>
                            </div>
                            <div className="w-100"></div>
                            
                            <div className="col-6 col-xl-3">
                                <label><strong>{t("hovaten")}: </strong> {name}</label>
                            </div>
                            <div className="col-6 col-xl-6">
                                <label><strong>{t("sodienthoai")}: </strong> {formatPhoneNumber(phone)}</label>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6 col-xl-3">
                                <label><strong>{t("tenbu")}: </strong> {buName}</label>
                            </div>
                            <div className="col-6 col-xl-6">
                                <label><strong>{t("phongban")}: </strong> {department}</label>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6 col-xl-6">
                                <label><strong>{t("nguoiquanli")}: </strong> {lineManagerName}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}