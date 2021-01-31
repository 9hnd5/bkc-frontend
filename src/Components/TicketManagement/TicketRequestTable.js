import { useSelector } from 'react-redux';
import { TicketRequestItem } from './TicketRequestItem';
import moment from 'moment';
import orderBy from 'lodash/orderBy';
import { useTranslation } from 'react-i18next';
export const TicketRequestTable = (props) => {
    const { t } = useTranslation();
    const ticketRequests = useSelector(state => state.ticketManagementReducer.ticketRequests);
    const ticketSorts = ticketRequests && orderBy(ticketRequests, (ticket) => {
        return moment(ticket.startDate, ["DD/MM/YYYY"], true);
    }, ['desc']);
    const displayTicketRequests = ticketSorts && ticketSorts.map((ticketRequestItem, index) => {
        return <TicketRequestItem
            key={index}
            no={index + 1}
            ticketRequestItem={ticketRequestItem}
        />
    });
    return (
        <div className="row">
            <div className="col-12 col-xl-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12 col-3">
                                <h5>{t("danhsachyeucau")}</h5>
                            </div>
                        </div>
                        <div className="table-custom ticket-request-table-responsive">
                            <table className="table-sm table-bordered table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>{t("stt")}</th>
                                        <th>{t("hovaten")}</th>
                                        <th>{t("ngaydi")}</th>
                                        <th>{t("ngayve")}</th>
                                        <th>Địa Điểm Đón</th>
                                        <th>Địa Điểm Đến</th>
                                        <th>{t("songuoidi")}</th>
                                        <th>{t("trangthai")}</th>
                                        <th>{t("hanhdong")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayTicketRequests}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}