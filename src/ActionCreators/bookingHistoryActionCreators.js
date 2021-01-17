import { HTTP_METHOD, URL } from "../Constants/appConstants"
import { DELETE_BOOKING_HISTORY, SET_BOOKING_HISTORY } from "../Constants/bookingHistoryConstants"
import { callApi } from "../Helpers/callApi"
import { notification, NOTIFICATION_TYPE } from "../Helpers/notification"

export const setBookingHistoryList = (bookingInfors) => {
    return {
        type: SET_BOOKING_HISTORY,
        bookingInfors
    }
}
export const deleteBookingHistoryItem = (bookerId) => {
    return {
        type: DELETE_BOOKING_HISTORY,
        bookerId
    }
}




export const fetchBookingInforByEmployeeId = (employeeId) => {
    return async dispatch => {
        const res = await callApi(`${URL}/booking-infors/${employeeId}`, HTTP_METHOD.GET, null);
        if(res.status !== 200){
            notification(NOTIFICATION_TYPE.ERROR, res.data);
            return;
        }
        const bookingInfors = res.data;
        dispatch(setBookingHistoryList(bookingInfors))
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