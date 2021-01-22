import { Fragment } from "react";
import { useHistory } from "react-router-dom";

export const TicketRequestItem = (props) => {
    const history = useHistory();
    const {ticketRequestItem, no} = props;
    function handleClickDetail(){
        history.push(`/booking-approval/${ticketRequestItem.id}`)
    }
    return(
        <Fragment>
            <tr>
                <td>{no}</td>
                <td>{ticketRequestItem.employeeName}</td>
                <td>{ticketRequestItem.startDate}</td>
                <td>{ticketRequestItem.endDate}</td>
                <td>{ticketRequestItem.totalParticipant}</td>
                <td>{ticketRequestItem.ticketStatus}</td>
                <td>
                    <div className="btn-block">
                        <button 
                        onClick={handleClickDetail}
                        className="btn btn-outline-primary btn-sm mr-2"
                        >
                            Xem Chi Tiết
                        </button>
                        <button className="btn btn-outline-danger btn-sm">
                            Từ Chối
                        </button>
                    </div>
                </td>
            </tr>
        </Fragment>
    );
}