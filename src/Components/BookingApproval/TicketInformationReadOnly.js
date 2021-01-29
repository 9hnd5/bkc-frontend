import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import formatPhoneNumber from "../../Helpers/formatPhoneNumber";

export const TicketInformationReadOnly = () => {
    const { t } = useTranslation();
    const { ticketId } = useParams();
    const ticket = useSelector(state => state.adminReducer.ticketRequests).find(ticket => {
        return +ticket.id === +ticketId;
    });
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
                                <label><strong>{t("hovaten")}: </strong>{ticket && ticket.employeeName}</label>
                            </div>
                            <div className="col-6 col-xl-3">
                                <label><strong>{t("sodienthoai")}: </strong>{ticket && formatPhoneNumber(ticket.employeePhone)} </label>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6 col-xl-3">
                                <label><strong>{t("tenbu")}: </strong>{ticket && ticket.employeeBuName} </label>
                            </div>
                            <div className="col-6 col-xl-3">
                                <label><strong>{t("phongban")}: </strong>{ticket && ticket.employeeDepartment}</label>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6 col-xl-3">
                                <label><strong>{t("nguoiquanli")}: </strong>{ticket && ticket.employeeLineManagerName}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}