import { isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { BookingApprovalButton } from "./BookingApprovalButton";
import { DriverTable } from "./DriverTable";
import { LocationTableReadOnly } from "./LocationTableReadOnly"
import { TicketDetailReadOnly } from "./TicketDetailReadOnly"
import { TicketInformationReadOnly } from "./TicketInformationReadOnly"
import moment from 'moment';
import { TICKET_STATUS } from "../../Constants/CommonsConstants";
import { ticketTripsAddRequest, updateTicketTripsRequest } from "../../ActionCreators/bookingApprovalActionCreator";

export const BookingApprovalContainer = () => {
    const { ticketId } = useParams();
    const dispatch = useDispatch();
    const employee = useSelector(state => state.appReducer.employee);
    const ticket = useSelector(state => state.adminReducer.ticketRequests).find(ticket => {
        return +ticket.id === +ticketId;
    });
    const moveCar = useSelector(state => state.bookingApprovalReducer.moveCar);
    const returnCar = useSelector(state => state.bookingApprovalReducer.returnCar);
    const noteForDriver = useSelector(state => state.bookingApprovalReducer.noteForDriver)
    const bookedTrips = useSelector(state => state.bookingApprovalReducer.bookedTrips)
    console.log("bookedTrips", bookedTrips);
    function handleClickApprove() {
        if (isEmpty(returnCar)) {
            const ticketTrip1 = {
                ticket: {
                    id: ticket.id,
                    approverId: employee.id,
                    approverName: employee.name,
                    approvedDate: moment().format("DD/MM/YYYY"),
                    status: TICKET_STATUS.APPROVED
                },
                trip: {
                    isFinish: false,
                    startDate: ticket.startDate,
                    // fromLocation: ticket.fromLocation,
                    // toLocation: ticket.toLocation,
                    noteForDriver: noteForDriver,
                    driverId: moveCar.driverId,
                    carId: moveCar.carId,
                    type: "MOVE"
                }
            }
            const data = {
                ticketTripRequests: [ticketTrip1]
            }
            dispatch(ticketTripsAddRequest(data));
        }
        else {
            const ticketTrip1 = {
                ticket: {
                    id: ticket.id,
                    approverId: employee.id,
                    approverName: employee.name,
                    approvedDate: moment().format("DD/MM/YYYY"),
                    status: TICKET_STATUS.APPROVED
                },
                trip: {
                    isFinish: false,
                    startDate: ticket.startDate,
                    // fromLocation: ticket.fromLocation,
                    // toLocation: ticket.toLocation,
                    noteForDriver: noteForDriver,
                    driverId: moveCar.driverId,
                    carId: moveCar.carId,
                    type: "MOVE"
                }
            }
            const ticketTrip2 = {
                ticket: {
                    id: ticket.id,
                    approverId: employee.id,
                    approverName: employee.name,
                    approvedDate: moment().format("DD/MM/YYYY"),
                    status: TICKET_STATUS.APPROVED
                },
                trip: {
                    isFinish: false,
                    startDate: ticket.endDate,
                    // fromLocation: ticket.toLocation,
                    // toLocation: ticket.fromLocation,
                    noteForDriver: noteForDriver,
                    driverId: returnCar.driverId,
                    carId: returnCar.carId,
                    type: "RETURN"
                }
            }
            const data = {
                ticketTripRequests: [ticketTrip1, ticketTrip2]
            }
            dispatch(ticketTripsAddRequest(data));
        }

    }
    function handleUpdateTicket() {
        if (isEmpty(returnCar)) {
            const ticketTrip1 = {
                id: bookedTrips && bookedTrips.find(item => item.type === "MOVE").id,
                startDate: ticket.startDate,
                noteForDriver: noteForDriver,
                driverId: moveCar.driverId,
                carId: moveCar.carId,
                type: "MOVE"

            }
            const data = [ticketTrip1]

            dispatch(updateTicketTripsRequest(ticketId, data));
        }
        else {
            const ticketTrip1 = {
                id: bookedTrips && bookedTrips.find(item => item.type === "MOVE").id,
                isFinish: false,
                startDate: ticket.startDate,
                noteForDriver: noteForDriver,
                driverId: moveCar.driverId,
                carId: moveCar.carId,
                type: "MOVE"

            }
            const ticketTrip2 = {
                id: bookedTrips && bookedTrips.find(item => item.type === "RETURN").id,
                isFinish: false,
                startDate: ticket.endDate,
                noteForDriver: noteForDriver,
                driverId: returnCar.driverId,
                carId: returnCar.carId,
                type: "RETURN"

            }
            const data = [ticketTrip1, ticketTrip2]

            dispatch(updateTicketTripsRequest(ticketId, data));
        }
    }
    return (
        <div className="row">
            <div className="col-12 col-xl-12">
                <div className="card">
                    <div className="card-body">
                        <TicketInformationReadOnly />
                        <div className="mb-1"></div>
                        <TicketDetailReadOnly />
                        <div className="mb-1"></div>
                        <LocationTableReadOnly />
                        <div className="mb-1"></div>
                        <DriverTable />
                        <div className="mb-1"></div>
                        <BookingApprovalButton
                            onHandleClickApprove={handleClickApprove}
                            onHandleUpdateTicket={handleUpdateTicket}
                            ticket={ticket}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}