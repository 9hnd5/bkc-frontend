import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react/cjs/react.development";
import { setBooker } from "../../../ActionCreators/bkcActionCreators";

export const Booker = (props) => {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const employee = useSelector(state => state.app.employee);
    useEffect(() => {
        const booker = {
            employeeId: employee.id,
            employeeName: employee.name,
            employeeLineManagerId: employee.lineManagerId,
            employeeLineManagerName: employee.lineManagerName,
            employeePhone: employee.phone,
            employeeBuId: employee.buId,
            employeeBuName: employee.buName,
            employeeDepartment: employee.department
        }
        dispatch(setBooker(booker));
    }, [employee]);
    return (
        <div className="row">
            <div className="col-12 col-xl-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6 col-xl-3">
                                <label>{t("hovaten")}: {employee.name}</label>
                            </div>
                            <div className="col-6 col-xl-6">
                                <label>{t("sodienthoai")}: {employee.phone}</label>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6 col-xl-3">
                                <label>{t("tenbu")}: {employee.buName}</label>
                            </div>
                            <div className="col-6 col-xl-6">
                                <label>{t("phongban")}: {employee.department}</label>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6 col-xl-6">
                                <label>{t("nguoiquanli")}: {employee.lineManagerName}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}