import { history } from "../App"
import {
    SET_NOTE_FOR_DRIVER,
    SET_SELECTED_CAR,
    SET_TICKET,
    SET_TICKET_CARS
} from "../Constants/bookingApprovalConstants"
import { END_POINT, HTTP_METHOD } from "../Constants/CommonsConstants"
import { callApi } from "../Helpers/callApi"
import { notification, NOTIFICATION_TYPE } from "../Helpers/notification"


export const setNoteForDriver = noteForDriver => {
    return {
        type: SET_NOTE_FOR_DRIVER,
        noteForDriver
    }
}
export const setSelectedCar = selectedCar => {
    return {
        type: SET_SELECTED_CAR,
        selectedCar
    }
}
export const setTickets = ticket => {
    return {
        type: SET_TICKET,
        ticket
    }
}
export const setTicketCars = ticketCars => {
    return {
        type: SET_TICKET_CARS,
        ticketCars
    }
}


export const fetchTicketsById = ticketId => {
    return async dispatch => {
        const res = await callApi(`${END_POINT}/tickets/?selector=TICKETID&id=${ticketId}`, HTTP_METHOD.GET, null);
        if (res.status !== 200) {
            return;
        }
        const ticket = res.data;
        dispatch(setTickets(ticket));

    }
}
export const fetchTicketCarsByTicketId = ticketId => {
    return async dispatch => {
        const res = await callApi(`${END_POINT}/ticket-car/${ticketId}`, HTTP_METHOD.GET, null);
        if (res.status !== 200) {
            return;
        }
        const ticketCars = res.data;
        dispatch(setTicketCars(ticketCars));
    }
}










