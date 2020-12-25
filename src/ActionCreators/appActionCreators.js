import { SAVE_ACCESSTOKEN, SET_PAGE_ACTIVE } from "../Constants/appConstants"
import { callApi } from "../Helpers/callApi"

export const setPageActive = (activePage) => {
    return{
        type: SET_PAGE_ACTIVE,
        activePage
    }
}
export const saveAccessToken = (accessToken) => {
    return {
        type: SAVE_ACCESSTOKEN,
        accessToken
    }
}
export const requestAccessToken = (email) => {
    return async dispatch => {
        const res = await callApi("https://localhost:5001/api/employee/authenticate", "POST", {email: email});
        const accessToken = res.data;
        dispatch(saveAccessToken(accessToken));
    }
}