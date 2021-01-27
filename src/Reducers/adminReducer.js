import {
    SET_TICKET_REQUESTS,
    SET_DRIVERS,
    SET_TRIPS,
    UPDATE_TICKET_REQUEST
} from "../Constants/AdminConstants";

const initialState = {
    ticketRequests: [],
    drivers: [],
    trips: []
}
export const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TICKET_REQUESTS: {
            return {
                ...state,
                ticketRequests: action.ticketRequests
            }
        }
        case UPDATE_TICKET_REQUEST: {
            return {
                ...state,
                ticketRequests: state.ticketRequests.map(ticket => {
                    if(+ticket.id === +action.ticket.id){
                        return action.ticket
                    }
                    return ticket;
                })
            }
        }
        case SET_DRIVERS: {
            return {
                ...state,
                drivers: action.drivers
            }
        }
        case SET_TRIPS: {
            return {
                ...state,
                trips: action.trips
            }
        }
        default:
            return {
                ...state
            }
    }
}