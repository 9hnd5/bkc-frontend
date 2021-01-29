import { history } from "../App"
import { END_POINT, HTTP_METHOD } from "../Constants/CommonsConstants"
import {
    SET_TICKET_INFORMATION,
    SET_TICKET_DETAIL,
    SET_LOCATION,
    TOGGLE_MODAL_ADD_LOCATION,
} from "../Constants/TicketConstants"
import { callApi } from "../Helpers/callApi"
import { notification, NOTIFICATION_TYPE } from "../Helpers/notification"



export const setTicketInformation = (ticketInformation) => {
    return {
        type: SET_TICKET_INFORMATION,
        ticketInformation
    }
}
export const setTicketDetail = (ticketDetail) => {
    return {
        type: SET_TICKET_DETAIL,
        ticketDetail
    }
}
export const setLocations = (locations) => {
    return {
        type: SET_LOCATION,
        locations
    }
}
export const toggleModalAddLocation = () => {
    return {
        type: TOGGLE_MODAL_ADD_LOCATION
    }
}







export const addTicketRequest = (ticket) => {
    return async dispatch => {
        const res = await callApi(`${END_POINT}/tickets`, HTTP_METHOD.POST, ticket);
        if (res.status !== 200) {
            return notification(NOTIFICATION_TYPE.ERROR, "Thêm ticket thất bại");
        }
        notification(NOTIFICATION_TYPE.SUCCESS, "Thành công");
        history.push("/ticket-history")
    }
}
export const updateTicketRequest = ticket => {
    return async dispatch => {
        const res = await callApi(`${END_POINT}/tickets`, HTTP_METHOD.PUT, ticket);
        if (res.status !== 200) return notification(NOTIFICATION_TYPE.ERROR, "Fail");
        notification(NOTIFICATION_TYPE.SUCCESS, "Success");
        history.push("/ticket-history")
    }
}