import {
    SET_TICKET_REQUESTS,
    SET_DRIVERS,
} from "../Constants/AdminConstants";

const initialState = {
    ticketRequests: [],
    drivers: [],
}
export const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TICKET_REQUESTS: {
            return {
                ...state,
                ticketRequests: action.ticketRequests
            }
        }
        case SET_DRIVERS: {
            return {
                ...state,
                drivers: action.drivers
            }
        }
        default:
            return {
                ...state
            }
    }
}