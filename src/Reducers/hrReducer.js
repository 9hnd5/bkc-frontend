import { SAVE_BOOKING_HISTORY_LIST } from "../Constants/hrConstants"

const initialState = {
    bookingHistoryList: []
}
export const hrReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_BOOKING_HISTORY_LIST:{
            return {
                ...state,
                bookingHistoryList: action.bookingHistoryList
            }
        }
        default:
            return {
                ...state
            }
    }
}