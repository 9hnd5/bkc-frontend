import { SET_EMPLOYEE } from "../Constants/AppConstants"
import { END_POINT, HTTP_METHOD } from "../Constants/CommonsConstants"
import { callApi } from "../Helpers/callApi"

export const setEmployee = (employee) => {
    return {
        type: SET_EMPLOYEE,
        employee
    }
}



export const requestAuthenticated = (email) => {
    return async dispatch => {
        const res = await callApi(`${END_POINT}/authenticate`, HTTP_METHOD.POST, {email: email});
        if(res.status !== 200) return;
        const employee = res.data.employee;
        dispatch(setEmployee(employee));
    }
}