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
export const setDrivers = (drivers) => {
    return {
        type: SET_DRIVERS,
        drivers
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
