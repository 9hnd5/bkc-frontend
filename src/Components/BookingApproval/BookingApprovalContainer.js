import { isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { BookingApprovalButton } from "./BookingApprovalButton";
import { DriverTable } from "./DriverTable";
import { LocationTableReadOnly } from "./LocationTableReadOnly"
import { TicketDetailReadOnly } from "./TicketDetailReadOnly"
import { TicketInformationReadOnly } from "./TicketInformationReadOnly"
import moment from 'moment';
import { END_POINT, HTTP_METHOD, TICKET_STATUS } from "../../Constants/CommonsConstants";
import { notification, NOTIFICATION_TYPE } from "../../Helpers/notification";
import { callApi } from "../../Helpers/callApi";

export const BookingApprovalContainer = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const employee = useSelector(state => state.appReducer.employee);
    const ticket = useSelector(state => state.bookingApprovalReducer.ticket)
    const ticketCars = useSelector(state => state.bookingApprovalReducer.ticketCars);
    const noteForDriver = useSelector(state => state.bookingApprovalReducer.noteForDriver)
    const selectedCars = useSelector(state => state.bookingApprovalReducer.selectedCars);
    async function handleClickApprove() {
        selectedCars && selectedCars.forEach(async selectedCar => {
            const ticketUpdate = {
                ...ticket,
                handlerId: employee.id,
                handlerName: employee.name,
                handledDate: moment().format("DD/MM/YYYY"),
                status: TICKET_STATUS.APPROVED
            }
            const ticketUpdateResponse = await callApi(`${END_POINT}/tickets`, HTTP_METHOD.PUT, ticketUpdate);
            if (ticketUpdateResponse.status !== 200) {
                notification(NOTIFICATION_TYPE.ERROR, "Update ticket fail");
                return;
            }
            const car = {
                ...selectedCar,
                isBooked: true,
            }
            const ticketId = ticketUpdateResponse.data.id;
            const carUpdateResponse = await callApi(`${END_POINT}/cars/`, HTTP_METHOD.PUT, car)
            if (carUpdateResponse.status !== 200) {
                return;
            }
            const ticketCar = {
                ticketId: ticketId,
                carId: selectedCar.id
            }
            const ticketCarUpdateResponse = await callApi(`${END_POINT}/ticket-car`, HTTP_METHOD.POST, ticketCar)
            if (ticketCarUpdateResponse.status !== 200) {
                return
            }
        });
        notification(NOTIFICATION_TYPE.SUCCESS, "Thành Công");
        history.push("/ticket-management");

    }
    async function handleUpdateTicket() {
        for (let i = 0; i < selectedCars.length; i++) {
            const ticketCarUpdate = {
                id: ticketCars[i].id,
                ticketId: ticket.id,
                carId: selectedCars[i].id
            }
            const ticketCarUpdateResponse = await callApi(`${END_POINT}/ticket-car`, HTTP_METHOD.PUT, ticketCarUpdate);
            if (ticketCarUpdateResponse.status !== 200) {
                return notification(NOTIFICATION_TYPE.ERROR, "Cập Nhật Thất Bại");
            }
        }
        notification(NOTIFICATION_TYPE.SUCCESS, "Cập Nhật Thành Công");
        history.push("/ticket-management");
    }
    async function handleCancelTicket() {
        const ticketUpdate = {
            ...ticket,
            handlerId: employee.id,
            handlerName: employee.name,
            handledDate: moment().format("DD/MM/YYYY"),
            status: TICKET_STATUS.REJECTED
        }
        const ticketUpdateResponse = await callApi(`${END_POINT}/tickets`, HTTP_METHOD.PUT, ticketUpdate);
        if (ticketUpdateResponse.status !== 200) {
            notification(NOTIFICATION_TYPE.ERROR, "Update ticket fail");
            return;
        }
        ticketCars.forEach(async ticketCar => {
            const ticketCarDeleteResponse = await callApi(`${END_POINT}/ticket-car`, HTTP_METHOD.DELETE, ticketCar);
            if (ticketCarDeleteResponse.status !== 200) {
                notification(NOTIFICATION_TYPE.ERROR, "Delete ticket car fail");
                return;
            }
        });
        notification(NOTIFICATION_TYPE.SUCCESS, "Thành Công");
        history.push("/ticket-management");
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
                            onHandleDeleteTicket={handleCancelTicket}
                            ticket={ticket}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}