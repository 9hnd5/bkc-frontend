import { SET_DRIVERS, SET_TICKET_REQUESTS, SET_TRIPS, UPDATE_TICKET_REQUEST } from "../Constants/AdminConstants";
import { END_POINT, HTTP_METHOD } from "../Constants/CommonsConstants"
import { callApi } from "../Helpers/callApi"
import { notification, NOTIFICATION_TYPE } from "../Helpers/notification";
export const setTicketRequests = (ticketRequests) => {
    return {
        type: SET_TICKET_REQUESTS,
        ticketRequests
    }
}
export const updateTicket = ticket => {
    return {
        type: UPDATE_TICKET_REQUEST,
        ticket
    }
}
export const setDrivers = (drivers) => {
    return {
        type: SET_DRIVERS,
        drivers
    }
}
export const setTrips = trips => {
    return {
        type: SET_TRIPS,
        trips
    }
}



export const fetchTicketsByBuId = (buId) => {
    return async dispatch => {
        const res = await callApi(`${END_POINT}/tickets/?selector=BU&id=${buId}`, HTTP_METHOD.GET, null);
        if(res.status !== 200){
            notification(NOTIFICATION_TYPE.ERROR, "Failed");
            return;
        }
        const ticketRequests = res.data;
        dispatch(setTicketRequests(ticketRequests));
    }
}

export const fetchDriversByBuId = buId => {
    return async dispatch => {
        const res = await callApi(`${END_POINT}/drivers/${buId}`, HTTP_METHOD.GET, null);
        if(res.status !== 200) return notification(NOTIFICATION_TYPE.ERROR, "Loading Driver Fail");
        const drivers = res.data;
        dispatch(setDrivers(drivers));
    }
}

export const updateTicketRequest = data => {
    return async dispatch => {
        const res = await callApi(`${END_POINT}/ticket-approval/tickets`, HTTP_METHOD.PATCH, data);
        if(res.status !== 200) return notification(NOTIFICATION_TYPE.ERROR, "Reject Fail");
        notification(NOTIFICATION_TYPE.SUCCESS, "Succcess");
        const ticket = res.data;
        dispatch(updateTicket(ticket));
    }
}