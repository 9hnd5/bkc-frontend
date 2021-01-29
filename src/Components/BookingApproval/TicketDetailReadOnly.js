import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"

export const TicketDetailReadOnly = () => {
    const { t } = useTranslation();
    const { ticketId } = useParams();
    const ticket = useSelector(state => state.adminReducer.ticketRequests).find(ticket => {
        return +ticket.id === +ticketId
    });
    return (
        <div className="row">
            <div className="col-12 col-xl-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12 col-xl-3">
                                <h5>{t("thongtinnoidon")}</h5>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6 col-xl-3">
                                <label><strong>{t("ngaydi")}: </strong> {ticket && ticket.startDate}</label>
                            </div>
                            <div className="col-6 col-xl-3">
                                <label><strong>{t("ngayve")}: </strong> {ticket && ticket.endDate} </label>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6 col-xl-3">
                                <label><strong>{t("diadiemdon")}: </strong> {ticket && ticket.fromLocation}</label>
                            </div>
                            <div className="col-6 col-xl-3">
                                <label><strong>{t("diadiemden")}: </strong> {ticket && ticket.toLocation} </label>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6 col-xl-3">
                                <label><strong>{t("songuoidi")}: </strong> {ticket && ticket.totalParticipant}</label>
                            </div>
                            <div className="col-6 col-xl-3">
                                <label><strong>{t("lydodatxe")}: </strong> {ticket && ticket.reasonBooking}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}