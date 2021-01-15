import {
    SAVE_ACCESSTOKEN,
    SAVE_AUTHENTICATE,
    SAVE_BOOKERID,
    SAVE_BOOKER_BOOKING_DETAILS,
    SAVE_EMPLOYEE,
    SAVE_ERROR_MESSAGE,
    SAVE_PAGE_NAME,
    UPDATE_STATUS_BOOKER_DECLINE
} from "../Constants/appConstants"
import { callApi } from "../Helpers/callApi"
import { notification, NOTIFICATION_TYPE } from "../Helpers/notification"

export const saveAccessToken = (accessToken) => {
    return {
        type: SAVE_ACCESSTOKEN,
        accessToken
    }
}
export const saveBookerId = (bookerId) => {
    return {
        type: SAVE_BOOKERID,
        bookerId
    }
}
export const saveEmployee = (employee) => {
    return {
        type: SAVE_EMPLOYEE,
        employee
    }
}
export const saveAuthenticate = (isAuth) => {
    return {
        type: SAVE_AUTHENTICATE,
        isAuth
    }
}
export const saveRequestBooking = (bookerBkInforBkDetails) => {
    return {
        type: SAVE_BOOKER_BOOKING_DETAILS,
        bookerBkInforBkDetails
    }
}
export const updateStatusBookerToReject = (bookerId) => {
    return {
        type: UPDATE_STATUS_BOOKER_DECLINE,
        bookerId
    }
}
export const saveErrorMessage = (errorMessage) => {
    return {
        type: SAVE_ERROR_MESSAGE,
        errorMessage
    }
}
export const savePageName = (pageName) => {
    return {
        type: SAVE_PAGE_NAME,
        pageName
    }
}



export const requestAuthenticate = (email) => {
    return async dispatch => {
        const res = await callApi("https://localhost:5001/api/authenticate", "POST", { email: email });
        const user = res.data.user
        const token = res.data.token;
        dispatch(saveAccessToken(token));
        dispatch(saveEmployee(user));
        dispatch(saveAuthenticate(true));
    }
}
export const fetchRequestBooking = (buId) => {
    return async dispatch => {
        const res = await callApi(`https://localhost:5001/api/bkc/` + buId, "POST", null);
        const bookerBkInforBkDetails = []
        res.data.forEach(element => {
            const data = {
                booker: element.booker,
                bookingInfor: element.bookingInfor,
                bookingDetails: element.bookingDetails
            }
            bookerBkInforBkDetails.push(data);
        });
        dispatch(saveRequestBooking(bookerBkInforBkDetails))
    }
}
export const requestRejectBkc = (data) => {
    return async dispatch => {
        const res = await callApi("https://localhost:5001/api/bkc/reject", "POST", data);
        if (res.status === 200) {
            const { bookerId } = data;
            dispatch(updateStatusBookerToReject(bookerId));
            notification(NOTIFICATION_TYPE.SUCCESS, res.data);
        }
        else{
            dispatch(saveErrorMessage(res.data));
            notification(NOTIFICATION_TYPE.ERROR, res.data);
        }
    }
}