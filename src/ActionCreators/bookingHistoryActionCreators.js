import { HTTP_METHOD, URL } from "../Constants/appConstants"
import { DELETE_BOOKING_HISTORY_ITEM, SAVE_BOOKING_HISTORY } from "../Constants/bookingHistoryConstants"
import { callApi } from "../Helpers/callApi"
import { notification, NOTIFICATION_TYPE } from "../Helpers/notification"

export const saveBookingHistoryList = (bookingHistoryList) => {
    return {
        type: SAVE_BOOKING_HISTORY,
        bookingHistoryList
    }
}
export const deleteBookingHistoryItem = (bookerId) => {
    return {
        type: DELETE_BOOKING_HISTORY_ITEM,
        bookerId
    }
}

export const fetchBookingHistoryByEmployeeId = (employeeId) => {
    return async dispatch => {
        const res = await callApi(`${URL}/booking-history/employees/${employeeId}`, HTTP_METHOD.GET, null);
        if(res.status !== 200){
            // dispatch(saveBookingHistoryList([]))
            notification(NOTIFICATION_TYPE.ERROR, res.data);
            return;
        }
        const bookingHistoryList = res.data;
        console.log("bookingHistoryList", bookingHistoryList);
        dispatch(saveBookingHistoryList(bookingHistoryList))
    }
}
export const requestDeleteBooking = (bookerId) =>{
    return async dispatch => {
        const res = await callApi(`${URL}/request-delete-booking/${bookerId}`, HTTP_METHOD.DELETE, null);
        if(res.status !== 200){
            return notification(NOTIFICATION_TYPE.ERROR, res.data);
        }
        dispatch(deleteBookingHistoryItem(bookerId));
        notification(NOTIFICATION_TYPE.SUCCESS, "Xóa Thành Công");
    }
}