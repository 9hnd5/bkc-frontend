import { isEmpty } from "lodash";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BookingApprovalButton } from "./BookingApprovalButton";
import { DriverTable } from "./DriverTable";
import { LocationTableReadOnly } from "./LocationTableReadOnly"
import { TicketDetailReadOnly } from "./TicketDetailReadOnly"
import { TicketInformationReadOnly } from "./TicketInformationReadOnly"
import moment from 'moment';
import { TICKET_STATUS } from "../../Constants/CommonsConstants";

export const BookingApprovalContainer = () => {
    const { ticketId } = useParams();
    const employee = useSelector(state => state.appReducer.employee);
    const ticket = useSelector(state => state.adminReducer.ticketRequests).find(ticket => {
        return +ticket.id === +ticketId;
    });
    const moveCar = useSelector(state => state.bookingApprovalReducer.moveCar);
    const returnCar = useSelector(state => state.bookingApprovalReducer.returnCar);
    function handleClickApprove() {
        if (isEmpty(ticket.endDate)) {
            const moveTrip = {
                isFinish: false,
                startDate: ticket.startDate,
                fromLocation: ticket.fromLocation,
                toLocation: ticket.toLocation,
                noteByAdmin: "",
                driverId: moveCar.driverId,
                carId: moveCar.carId
            }
            const data = {
                trips: [moveTrip],
                ticket: {
                    id: ticket.id,
                    approverId: employee.employeeId,
                    approverName: employee.name,
                    approvedDate: moment().format("DD/MM/YYYY"),
                    status: TICKET_STATUS.APPROVED
                }

            }
        }
        else {
            if(moveCar.carId === returnCar.carId){
                const moveTrip = {
                    isFinish: false,
                    startDate: ticket.startDate,
                    fromLocation: ticket.fromLocation,
                    toLocation: ticket.toLocation,
                    noteByAdmin: "",
                    driverId: moveCar.driverId,
                    carId: moveCar.carId
                }
                const returnTrip = {
                    isFinish: false,
                    startDate: ticket.endDate,
                    fromLocation: ticket.toLocation,
                    toLocation: ticket.fromLocation,
                    noteByAdmin: "",
                    driverId: returnCar.driverId,
                    carId: returnCar.carId
                }
                const data = {
                    trips: [moveTrip, returnTrip],
                    ticket: {
                        approverId: employee.employeeId,
                        approverName: employee.name,
                        approvedDate: moment().format("DD/MM/YYYY"),
                        ticketStatus: TICKET_STATUS.APPROVED
                    }
    
                }
            }else{
                const moveTrip = {
                    isFinish: false,
                    startDate: ticket.startDate,
                    fromLocation: ticket.fromLocation,
                    toLocation: ticket.toLocation,
                    noteByAdmin: "",
                    driverId: moveCar.driverId,
                    carId: moveCar.carId
                }
                const returnTrip = {
                    isFinish: false,
                    startDate: ticket.endDate,
                    fromLocation: ticket.toLocation,
                    toLocation: ticket.fromLocation,
                    noteByAdmin: "",
                    driverId: returnCar.driverId,
                    carId: returnCar.carId
                }
                const data = {
                    trips: [moveTrip, returnTrip],
                    ticket: {
                        approverId: employee.employeeId,
                        approverName: employee.name,
                        approvedDate: moment().format("DD/MM/YYYY"),
                        ticketStatus: TICKET_STATUS.APPROVED
                    }
    
                }
            }
        }
    }
    return (
        <div className="row">
            <div className="col-12 col-xl-12">
                <div className="card">
                    <div className="card-header">
                        <h4>Thông Tin Chi Tiết</h4>
                    </div>
                    <div className="card-body">
                        <TicketInformationReadOnly />
                        <TicketDetailReadOnly />
                        <LocationTableReadOnly />
                        <DriverTable />
                        <BookingApprovalButton
                            onHandleClickApprove={handleClickApprove}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}