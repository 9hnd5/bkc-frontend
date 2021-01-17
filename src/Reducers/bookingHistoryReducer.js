import {
    DELETE_BOOKING_HISTORY,
    SET_BOOKING_HISTORY
}from "../Constants/bookingHistoryConstants"
import remove from 'lodash/remove'
const initialState = {
    bookingInfors: []
}
export const bookingHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_BOOKING_HISTORY: {
            return {
                ...state,
                bookingInfors: action.bookingInfors
            }
        }
        case DELETE_BOOKING_HISTORY: {
            const cloneBookingInfors = [...state.bookingInfors];
            remove(cloneBookingInfors, (item) => {
                return item.bookerId === action.bookerId
            })

            return {
                ...state,
                bookingInfors: cloneBookingInfors
            }
        }
        default:
            return {
                ...state
            }
    }
}