import {
    SAVE_ACCESSTOKEN,
    SAVE_AUTHENTICATE,
    SAVE_BOOKER_BOOKING_DETAILS,
    SAVE_EMPLOYEE,
    SAVE_ERROR_MESSAGE,
    SAVE_PAGE_NAME,
    UPDATE_STATUS_BOOKER_DECLINE
} from "../Constants/appConstants"
import { callApi } from "../Helpers/callApi"

export const saveAccessToken = (accessToken) => {
    return {
        type: SAVE_ACCESSTOKEN,
        accessToken
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
export const saveBookerBkInforBkDetail = (bookerBkInforBkDetails) => {
    return {
        type: SAVE_BOOKER_BOOKING_DETAILS,
        bookerBkInforBkDetails
    }
}
export const updateStatusBookerToDecline = (bookerId) => {
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
        console.log("res", res);
        const employee = res.data.employee
        const token = res.data.token;
        dispatch(saveAccessToken(token));
        dispatch(saveEmployee(employee));
        dispatch(saveAuthenticate(true));
    }
}
export const fetchBookerBkInforBkDetail = (buId) => {
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
        console.log("bk", bookerBkInforBkDetails);
        dispatch(saveBookerBkInforBkDetail(bookerBkInforBkDetails))
    }
}
export const requestDeclineBkc = (data) => {
    return async dispatch => {
        const res = await callApi("https://localhost:5001/api/bkc/decline", "POST", data);
        console.log("res decline", res);
        if (res.status == 200) {
            const { bookerId } = data;
            dispatch(updateStatusBookerToDecline(bookerId));
        }
        else{
            dispatch(saveErrorMessage(res.data));
        }
    }
}