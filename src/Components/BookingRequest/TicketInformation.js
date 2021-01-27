import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setTicketInformation } from "../../ActionCreators/ticketActionCreator";

export const TicketInformation = (props) => {
    const dispatch = useDispatch();
    const employee = useSelector(state => state.appReducer.employee);
    const { name, phone, buName, lineManagerName, department } = employee;
    const [formatPhone, setFormatPhone] = useState("");
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
        var phone = employee.phone && employee.phone.split("");
        if (phone) {
            if (phone[0] === "8" && phone[1] === "4") {
                setFormatPhone(phone)
            } else {
                phone && phone.unshift("0");
                setFormatPhone(phone);
            }
        }
        dispatch(setTicketInformation(ticketInformation));
    }, [employee]);
    return (
        <div className="row">
            <div className="col-12 col-xl-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6 col-xl-3">
                                <h5>Thông Tin Người Đặt</h5>
                            </div>
                            <div className="w-100"></div>
                            
                            <div className="col-6 col-xl-3">
                                <label>{t("hovaten")}: {name}</label>
                            </div>
                            <div className="col-6 col-xl-6">
                                <label>{t("sodienthoai")}: {formatPhone}</label>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6 col-xl-3">
                                <label>{t("tenbu")}: {buName}</label>
                            </div>
                            <div className="col-6 col-xl-6">
                                <label>{t("phongban")}: {department}</label>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6 col-xl-6">
                                <label>{t("nguoiquanli")}: {lineManagerName}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}