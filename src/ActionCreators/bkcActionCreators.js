import { HTTP_METHOD, URL } from "../Constants/appConstants"
import {
    SET_BOOKER,
    SET_BOOKING_DETAIL,
    SET_PICKUP_LOCATIONS,
    TOGGLE_BKC_DETAIL_INSERT,
} from "../Constants/bkcConstants"
import { callApi } from "../Helpers/callApi"
import { notification, NOTIFICATION_TYPE } from "../Helpers/notification"

export const toggleBkcDetailModalInsert = () => {
    return {
        type: TOGGLE_BKC_DETAIL_INSERT
    }
}
export const setBooker = (booker) => {
    return {
        type: SET_BOOKER,
        booker
    }
}
export const setBookingDetail = (bookingDetail) => {
    return {
        type: SET_BOOKING_DETAIL,
        bookingDetail
    }
}
export const setPickupLocations = (pickupLocations) =>{
    return{
        type: SET_PICKUP_LOCATIONS,
        pickupLocations
    }
} 













export const requestBooking = (data) => {
    return async dispatch => {
        const res = await callApi(`${URL}/request-booking`, HTTP_METHOD.POST, data);
        if(res.status !== 200){
            return notification(NOTIFICATION_TYPE.ERROR, res.data);
        }
        notification(NOTIFICATION_TYPE.SUCCESS, "Lưu Thành Công");
    }
}
export const requestUpdateBooking = (data) => {
    return async dispatch => {
        const res = await callApi(`${URL}/request-update-booking`, HTTP_METHOD.POST, data);
        if(res.status !== 200){
            return notification(NOTIFICATION_TYPE.ERROR, res.data);
        }
        notification(NOTIFICATION_TYPE.SUCCESS, "Lưu Thành Công");
    }
}
