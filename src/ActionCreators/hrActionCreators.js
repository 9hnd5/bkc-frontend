import { URL } from "../Constants/appConstants"
import { SAVE_BOOKING_HISTORY_LIST } from "../Constants/hrConstants"
import { callApi } from "../Helpers/callApi"
import { notification, NOTIFICATION_TYPE } from "../Helpers/notification"

export const saveBookingHistoryList = (bookingHistoryList) => {
    return {
        type: SAVE_BOOKING_HISTORY_LIST,
        bookingHistoryList
    }
}

export const fetchBookingHistoryByBuId = (buId) => {
    return async dispatch => {
        const res = await callApi(`${URL}/booking-history/bus/${buId}`)
        if(res.status !== 200){
            return notification(NOTIFICATION_TYPE.ERROR, res.data);
        }
        const bookingHistoryList = res.data;
        dispatch(saveBookingHistoryList(bookingHistoryList))
    }
}