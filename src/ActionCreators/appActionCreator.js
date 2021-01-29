import { SET_EMPLOYEE, SET_IS_AUTH, SET_PAGE_NAME } from "../Constants/AppConstants"
import { END_POINT, HTTP_METHOD } from "../Constants/CommonsConstants"
import { callApi } from "../Helpers/callApi"
import { notification, NOTIFICATION_TYPE } from "../Helpers/notification"

export const setEmployee = (employee) => {
    return {
        type: SET_EMPLOYEE,
        employee
    }
}
export const setIsAuth = isAuth => {
    return {
        type: SET_IS_AUTH,
        isAuth
    }
}
export const setPageName = pageName => {
    return {
        type: SET_PAGE_NAME,
        pageName
    }
}


export const requestAuthenticated = (email) => {
    return async dispatch => {
        const res = await callApi(`${END_POINT}/authenticate`, HTTP_METHOD.POST, { email: email });
        if (res.status !== 200) {
            return notification(NOTIFICATION_TYPE.ERROR, res.data)
        };
        const employee = res.data.employee;
        dispatch(setEmployee(employee));
        dispatch(setIsAuth(true));
        notification(NOTIFICATION_TYPE.SUCCESS, "Login Success");
    }
}