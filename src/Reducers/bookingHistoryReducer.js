import { DELETE_BOOKING_HISTORY_ITEM, SAVE_BOOKING_HISTORY } from "../Constants/bookingHistoryConstants"
import remove from 'lodash/remove'
const initialState = {
    bookingHistoryList: []
}
export const bookingHistoryReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_BOOKING_HISTORY: {
            return {
                ...state,
                bookingHistoryList: action.bookingHistoryList
            }
        }
        case DELETE_BOOKING_HISTORY_ITEM: {
            const cloneBookingHistoryList = [...state.bookingHistoryList];
            remove(cloneBookingHistoryList, (item) => {
                return item.bookerId === action.bookerId
            })
           
            return {
                ...state,
                bookingHistoryList: cloneBookingHistoryList
            }
        }
        default:
            return {
                ...state
            }
    }
}