import { history } from "../App"
import {
    SET_DRIVERS,
    SET_NOTE_FOR_DRIVER,
    SET_SELECTED_CAR,
    SET_TICKET,
    SET_TICKET_CARS,
    SET_DRIVER_WAS_BOOKED
} from "../Constants/TicketHandleConstants"
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
export const setDrivers = drivers => {
    return{
        type: SET_DRIVERS,
        drivers
    }
}
export const setDriversWasBooked = driversWasBooked => {
    return {
        type: SET_DRIVER_WAS_BOOKED,
        driversWasBooked
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
export const fetchDriversWasBooked = buId => {
    return async dispatch => {
        const res = await callApi(`${END_POINT}/drivers/?buId=${buId}&&isFinish=${false}`, HTTP_METHOD.GET, null)
        if(res.status !== 200){
            return notification(NOTIFICATION_TYPE.ERROR, "Load drivers fail");
        }
        const driversWasBooked = res.data;
        dispatch(setDriversWasBooked(driversWasBooked));
    }
}

export const fetchDriversByBuId = buId => {
    return async dispatch => {
        const res = await callApi(`${END_POINT}/drivers/${buId}`, HTTP_METHOD.GET, null)
        if(res.status !== 200){
            return notification(NOTIFICATION_TYPE.ERROR, "Load drivers fail");
        }
        const drivers = res.data;
        dispatch(setDrivers(drivers));
    }
}










