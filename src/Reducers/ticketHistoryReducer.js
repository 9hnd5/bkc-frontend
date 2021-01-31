import { DELETE_TICKET_BY_ID, SET_TICKETS } from "../Constants/TicketHistoryConstants";

const initialState = {
    tickets: []
}
export const ticketHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TICKETS: {
            return {
                ...state,
                tickets: action.tickets
            }
        }
        case DELETE_TICKET_BY_ID: {
            return {
                ...state,
                tickets: [...state.tickets].filter(ticket => {
                    return +ticket.id !== +action.ticketId;
                })
            }
        }
        default: {
            return {
                ...state
            }
        }

    }
}