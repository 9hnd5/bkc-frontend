import { useSelector } from 'react-redux';
import { TicketRequestItem } from './TicketRequestItem';
export const TicketRequestTable = (props) => {
    const ticketRequests = useSelector(state => state.adminReducer.ticketRequests);
    const displayTicketRequests = ticketRequests && ticketRequests.map((ticketRequestItem, index) => {
        return <TicketRequestItem
            key={index}
            no={index + 1}
            ticketRequestItem={ticketRequestItem}
        />
    });
    return (
        <div className="row">
            <div className="col-12 col-xl-12">
                <div className="table-responsive hr_table_request" style={{ height: "500px" }}>
                    <table className="table table-sm table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Người Đặt</th>
                                <th>Ngày Đi</th>
                                <th>Ngày Về</th>
                                <th>Số Người Đi</th>
                                <th>Trạng Thái</th>
                                <th>Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayTicketRequests}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}