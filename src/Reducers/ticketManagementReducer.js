import {
    SET_TICKET_REQUESTS,
} from "../Constants/TicketManagementConstants";

const initialState = {
    ticketRequests: [],
}
export const ticketManagementReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TICKET_REQUESTS: {
            return {
                ...state,
                ticketRequests: action.ticketRequests
            }
        }
        default:
            return {
                ...state
            }
    }
}