import { useSelector } from "react-redux";
import { useParams } from "react-router-dom"

export const TicketDetailReadOnly = () => {
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
                            <div className="col-6 col-xl-3">
                                <label>Ngày Đi: {ticket && ticket.startDate}</label>
                            </div>
                            <div className="col-6 col-xl-3">
                                <label>Ngày Về: {ticket && ticket.endDate} </label>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6 col-xl-3">
                                <label>Địa Điểm Đón: {ticket && ticket.fromLocation}</label>
                            </div>
                            <div className="col-6 col-xl-3">
                                <label>Địa Điểm Đến: {ticket && ticket.toLocation} </label>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6 col-xl-3">
                                <label>Số Người Đi: {ticket && ticket.totalParticipant}</label>
                            </div>
                            <div className="col-6 col-xl-3">
                                <label>Lí Do Đặt Xe: {ticket && ticket.reasonBooking}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}