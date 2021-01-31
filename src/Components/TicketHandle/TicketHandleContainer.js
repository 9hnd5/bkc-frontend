import { isEmpty } from "lodash";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { TicketHandleButton } from "./TicketHandleButton";
import { DriverTable } from "./DriverTable";
import { LocationTableReadOnly } from "./LocationTableReadOnly"
import { TicketDetailReadOnly } from "./TicketDetailReadOnly"
import { TicketInformationReadOnly } from "./TicketInformationReadOnly"
import moment from 'moment';
import { END_POINT, HTTP_METHOD, TICKET_STATUS } from "../../Constants/CommonsConstants";
import { notification, NOTIFICATION_TYPE } from "../../Helpers/notification";
import { callApi } from "../../Helpers/callApi";

export const TicketHandleContainer = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const employee = useSelector(state => state.appReducer.employee);
    const ticket = useSelector(state => state.ticketHandleReducer.ticket)
    const ticketCars = useSelector(state => state.ticketHandleReducer.ticketCars);
    const noteForDriver = useSelector(state => state.ticketHandleReducer.noteForDriver)
    const selectedCars = useSelector(state => state.ticketHandleReducer.selectedCars);
    async function handleClickApprove() {
        selectedCars && selectedCars.forEach(async selectedCar => {
            let ticketCar = null;
            if (selectedCar.type === "MOVE_CAR") {
                ticketCar = {
                    startDate: ticket.startDate,
                }
            }else{
                ticketCar = {
                    startDate: ticket.endDate,
                } 
            }
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
            }
            const ticketId = ticketUpdateResponse.data.id;
            const carUpdateResponse = await callApi(`${END_POINT}/cars/`, HTTP_METHOD.PUT, car)
            if (carUpdateResponse.status !== 200) {
                return;
            }
            ticketCar = {
                ...ticketCar,
                type: selectedCar.type,
                ticketId: ticketId,
                carId: selectedCar.id,
                noteForDriver: noteForDriver,
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
            let ticketCarUpdate = null;
            if (selectedCars[i].type === "MOVE_CAR") {
                ticketCarUpdate = {
                    id: ticketCars && ticketCars.find(ticketCar => {
                        return ticketCar.type === selectedCars[i].type
                    }).id,
                    ticketId: ticket.id,
                    carId: selectedCars[i].id,
                    type: selectedCars[i].type,
                    startDate: ticket.startDate,
                }
            } else if (selectedCars[i].type === "RETURN_CAR") {
                ticketCarUpdate = {
                    id: ticketCars && ticketCars.find(ticketCar => {
                        return ticketCar.type === selectedCars[i].type
                    }).id,
                    ticketId: ticket.id,
                    carId: selectedCars[i].id,
                    type: selectedCars[i].type,
                    startDate: ticket.endDate,
                }
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
                        <TicketHandleButton
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