import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { TicketHistoryItem } from "./TicketHistoryItem";
import orderBy from 'lodash/orderBy';
import moment from 'moment';

export const TicketHistoryTable = () => {
    const { t } = useTranslation();
    const tickets = useSelector(state => state.ticketHistoryReducer.tickets);
    console.log("tickets", tickets);
    const sortTickets = tickets && orderBy(tickets, (ticket) => {
        return moment(ticket.startDate, ["DD/MM/YYYY"], true);
    }, ['desc']);
    console.log("sort", sortTickets)
    const display = sortTickets && sortTickets.map((ticket, index) => {
        return <TicketHistoryItem
            key={index}
            index={index + 1}
            ticket={ticket}
        />
    });
    return (
        <div className="row">
            <div className="col-12 col-xl-12">
                <div className="card">
                    <div className="card-body">
                        <h5>{t("lichsu")}</h5>
                        <div className="table-custom booking-history-table-responsive">
                            <table className="table-hover table-sm table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>{t("sothutu")}</th>
                                        <th>{t("ngaydi")}</th>
                                        <th>{t("ngayve")}</th>
                                        <th>{t("diadiemdon")}</th>
                                        <th>{t("diadiemden")}</th>
                                        <th>{t("songuoidi")}</th>
                                        <th>{t("trangthai")}</th>
                                        <th>Hoàn Thành</th>
                                        <th>{t("hanhdong")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {display}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}