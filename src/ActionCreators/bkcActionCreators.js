import {
    INSERT_BOOKING_DETAIL,
    UPDATE_BOOKING_DETAIL,
    DELETE_BOOKING_DETAIL,
    TOGGLE_BKC_DETAIL_INSERT,
    INSERT_BOOKING_INFOR,
    TOGGLE_BKINFOR_VALID,
    TOGGLE_BKDETAIL_VALID,
    EMPTY_BOOKING_INFOR,
    EMPTY_BOOKING_DETAILS,
    SET_LOADING
} from "../Constants/bkcConstants"
import { callApi } from "../Helpers/callApi"
import { notification, NOTIFICATION_TYPE } from "../Helpers/notification"

export const toggleBkInforValid = (isBkcInforValid) => {
    return {
        type: TOGGLE_BKINFOR_VALID,
        isBkcInforValid
    }
}
export const toggleBkDetailValid = (isBkcDetailValid) => {
    return {
        type: TOGGLE_BKDETAIL_VALID,
        isBkcDetailValid
    }
}
export const insertBookingInfor = (data) => {
    return {
        type: INSERT_BOOKING_INFOR,
        data
    }
}
export const emptyBookingInfor = () => {
    return {
        type: EMPTY_BOOKING_INFOR
    }
}
export const emptyBookingDetails = () => {
    return {
        type: EMPTY_BOOKING_DETAILS
    }
}
export const insertBookingDetail = (bookingDetail) => {
    return {
        type: INSERT_BOOKING_DETAIL,
        bookingDetail
    }
}
export const updateBookingDetail = (bookingDetail) => {
    return {
        type: UPDATE_BOOKING_DETAIL,
        bookingDetail
    }
}
export const deleteBookingDetail = (bookingDetail) => {
    return {
        type: DELETE_BOOKING_DETAIL,
        bookingDetail
    }
}
export const toggleBkcDetailModalInsert = () => {
    return {
        type: TOGGLE_BKC_DETAIL_INSERT
    }
}
export const setLoading = (isLoading) => {
    return {
        type: SET_LOADING,
        isLoading
    }
}

export const requestSaveBookingCar = (data) => {
    return async dispatch => {
        dispatch(setLoading(true));
        // const res = await callApi("https://localhost:5001/api/bkc/approve", "POST", data)
        const res = {
            status: 300,
            data: "error"
        }
        const t = setTimeout(() => {
            if (!(res.status == 200)) {
                notification(NOTIFICATION_TYPE.ERROR, res.data);
                dispatch(setLoading(false))
                return;
            }
            notification(NOTIFICATION_TYPE.SUCCESS, res.data);
            dispatch(setLoading(false))
            clearTimeout(t);
        }, 2000)
        console.log("res", res)
    }
}