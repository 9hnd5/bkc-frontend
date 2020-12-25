import {
    INSERT_BKC_DETAIL,
    UPDATE_BKC_DETAIL, DELETE_BKC_DETAIL,
    TOGGLE_BKC_DETAIL_INSERT,
    INSERT_USER,
} from "../Constants/bkcConstants"
import { callApi } from "../Helpers/callApi"

export const insertBkcDetail = (bkcDetail) => {
    return {
        type: INSERT_BKC_DETAIL,
        bkcDetail
    }
}
export const updateBkcDetail = (bkcDetail) => {
    return {
        type: UPDATE_BKC_DETAIL,
        bkcDetail
    }
}
export const deleteBkcDetail = (bkcDetail) => {
    return {
        type: DELETE_BKC_DETAIL,
        bkcDetail
    }
}
export const toggleBkcDetailModalInsert = () => {
    return {
        type: TOGGLE_BKC_DETAIL_INSERT
    }
}
export const insertUser = (user) => {
    return {
        type: INSERT_USER,
        user
    }
}

export const fetchUserRequest = () => {
    return async (dispatch) => {
        const response = await callApi("https://localhost:5001/api/employee/getbyemail/" + "trandoan280367@gmail.com", "POST", null);
        dispatch(insertUser(response.data));
    };
}