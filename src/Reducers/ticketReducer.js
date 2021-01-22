import {
    SET_TICKET_INFORMATION,
    SET_TICKET_DETAIL,
    SET_LOCATION,
    TOGGLE_MODAL_ADD_LOCATION,
} from "../Constants/TicketConstants";

export const initialState = {
    ticketInformation: {},
    ticketDetail: {},
    locations: [],
    isOpenModalAddLocation: false
}
export const ticketReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TICKET_INFORMATION: {
            return {
                ...state,
                ticketInformation: action.ticketInformation
            }
        }
        case SET_TICKET_DETAIL:
            return {
                ...state,
                ticketDetail: action.ticketDetail
            }
        case SET_LOCATION: {
            return {
                ...state,
                locations: action.locations
            }
        }
        case TOGGLE_MODAL_ADD_LOCATION: {
            return {
                ...state,
                isOpenModalAddLocation: !state.isOpenModalAddLocation
            }
        }
        default:
            return {
                ...state
            }
    }
}