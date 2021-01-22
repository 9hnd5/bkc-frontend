import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

export const TicketInformationReadOnly = () => {
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
                            <div className="col-6 col-xl-3">
                                <label>Họ Và Tên: {ticket&&ticket.employeeName}</label>
                            </div>
                            <div className="col-6 col-xl-3">
                                <label>Số Điện Thoại: {ticket&&ticket.employeePhone} </label>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6 col-xl-3">
                                <label>Tên BU: {ticket&&ticket.employeeBuName} </label>
                            </div>
                            <div className="col-6 col-xl-3">
                                <label>Phòng Ban: {ticket&&ticket.employeeDepartment}</label>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6 col-xl-3">
                                <label>Quản Lí: {ticket&&ticket.employeeLineManagerName}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}