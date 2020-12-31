import {
    INSERT_BOOKING_DETAIL,
    UPDATE_BOOKING_DETAIL,
    DELETE_BOOKING_DETAIL,
    TOGGLE_BKC_DETAIL_INSERT,
    INSERT_BOOKING_INFOR,
    TOGGLE_BKINFOR_VALID,
    TOGGLE_BKDETAIL_VALID,
} from "../Constants/bkcConstants"
import { callApi } from "../Helpers/callApi"

export const toggleBkInforValid = (isBkInforValid) => {
    return {
        type: TOGGLE_BKINFOR_VALID,
        isBkInforValid
    }
}
export const toggleBkDetailValid = (isBkDetailValid) => {
    return {
        type: TOGGLE_BKDETAIL_VALID,
        isBkDetailValid
    }
}
export const insertBookingInfor = (data) => {
    return {
        type: INSERT_BOOKING_INFOR,
        data
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


export const requestSaveBookingCar = (data) => {
    return async dispatch => {
        const res = await callApi("https://localhost:5001/api/bkc/approve", "POST", data)

        console.log("res", res)
    }
}