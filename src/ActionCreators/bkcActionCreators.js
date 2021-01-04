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
    SET_LOADING,
    SAVE_LIST_FILTER_EMPLOYEE
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
export const insertBookingInfor = (name, value) => {
    return {
        type: INSERT_BOOKING_INFOR,
        name,
        value
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
export const saveFilterListEmployee = (listFilterEmployee) => {
    return {
        type: SAVE_LIST_FILTER_EMPLOYEE,
        listFilterEmployee
    }
}



export const requestSaveBookingCar = (data) => {
    return async dispatch => {
        dispatch(setLoading(true));
        const res = await callApi("https://localhost:5001/api/bkc/approve", "POST", data)
        if (!(res.status === 200)) {
            notification(NOTIFICATION_TYPE.ERROR, res.data);
            dispatch(setLoading(false))
            return;
        }
        notification(NOTIFICATION_TYPE.SUCCESS, res.data);
        dispatch(emptyBookingInfor());
        dispatch(emptyBookingDetails());
        dispatch(toggleBkDetailValid(false));
        dispatch(toggleBkInforValid(false));
        dispatch(setLoading(false))
    }
}
export const requestFilterEmployeeByEmail = (email) => {
    return async dispatch => {
        const res = await callApi(`https://localhost:5001/api/bkc/search/${email}`, "GET", null);
        if (res.status !== 200) {
            notification(NOTIFICATION_TYPE.ERROR, res.data);
            return dispatch(saveFilterListEmployee([]));
        }
        console.log("res2", res);
        dispatch(saveFilterListEmployee(res.data));
    }
}