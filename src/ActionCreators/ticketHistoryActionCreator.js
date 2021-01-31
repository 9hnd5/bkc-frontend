import { DELETE_TICKET_BY_ID, SET_TICKETS } from "../Constants/TicketHistoryConstants"
import { END_POINT, HTTP_METHOD } from "../Constants/CommonsConstants"
import { callApi } from "../Helpers/callApi"
import { notification, NOTIFICATION_TYPE } from "../Helpers/notification"


export const setTickets = (tickets) => {
    return {
        type: SET_TICKETS,
        tickets
    }
}
export const deleteTicketById = (ticketId) => {
    return {
        type: DELETE_TICKET_BY_ID,
        ticketId
    }
}





export const fetchTicketsByEmployeeId = (employeeId) => {
    return async dispatch => {
        const res = await callApi(`${END_POINT}/tickets/?selector=EMPLOYEE&id=${employeeId}`, HTTP_METHOD.GET, null);
        if (res.status !== 200) return;
        const tickets = res.data;
        dispatch(setTickets(tickets));
    }
}
export const deleteTicketByIdRequest = (ticketId) => {
    return async dispatch => {
        const res = await callApi(`${END_POINT}/tickets/${ticketId}`, HTTP_METHOD.DELETE, null);
        if (res.status !== 200) notification(NOTIFICATION_TYPE.ERROR, "Failed");
        dispatch(deleteTicketById(ticketId));
        notification(NOTIFICATION_TYPE.SUCCESS, "Success");
    }
}