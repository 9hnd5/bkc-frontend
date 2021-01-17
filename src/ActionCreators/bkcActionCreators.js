import { HTTP_METHOD, SET_LOADING, URL } from "../Constants/appConstants"
import {
    SET_BOOKER,
    SET_BOOKING_DETAIL,
    SET_IS_REQUEST_SUCCESS,
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
export const setLoading = (isLoading) => {
    return {
        type: SET_LOADING,
        isLoading
    }
}
export const setIsRequestSuccess = (isRequestSuccess) => {
    return {
        type: SET_IS_REQUEST_SUCCESS,
        isRequestSuccess
    }
}













export const requestInsertBookingInfor = (data) => {
    return async dispatch => {
        dispatch(setLoading(true));
        const res = await callApi(`${URL}/bookingInfors`, HTTP_METHOD.POST, data);
        if(res.status !== 200){
            dispatch(setLoading(false));
            return notification(NOTIFICATION_TYPE.ERROR, res.data);
        }
        notification(NOTIFICATION_TYPE.SUCCESS, "Lưu Thành Công");
        dispatch(setLoading(false));
        dispatch(setBookingDetail({}));
        dispatch(setPickupLocations([]));
    }
}
export const requestUpdateBookingInfor = (data) => {
    return async dispatch => {
        dispatch(setLoading(true));
        dispatch(setIsRequestSuccess(false));
        const res = await callApi(`${URL}/booking-infors`, HTTP_METHOD.PUT, data);
        if(res.status !== 200){
            dispatch(setLoading(false));
            dispatch(setIsRequestSuccess(false));
            return notification(NOTIFICATION_TYPE.ERROR, res.data);
        }
        dispatch(setLoading(false));
        dispatch(setIsRequestSuccess(true));
        notification(NOTIFICATION_TYPE.SUCCESS, "Lưu Thành Công");
    }
}
