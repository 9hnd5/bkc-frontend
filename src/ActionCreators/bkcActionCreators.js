import {
    INSERT_BOOK_DETAIL,
    UPDATE_BOOK_DETAIL, DELETE_BOOK_DETAIL,
    TOGGLE_BKC_DETAIL_INSERT,
    INSERT_BOOKER,
    INSERT_BOOK_INFOR,
} from "../Constants/bkcConstants"
import { callApi } from "../Helpers/callApi"

export const insertBookDetail = (bookDetail) => {
    return {
        type: INSERT_BOOK_DETAIL,
        bookDetail
    }
}
export const updateBookDetail = (bookDetail) => {
    return {
        type: UPDATE_BOOK_DETAIL,
        bookDetail
    }
}
export const deleteBookDetail = (bookDetail) => {
    return {
        type: DELETE_BOOK_DETAIL,
        bookDetail
    }
}
export const toggleBkcDetailModalInsert = () => {
    return {
        type: TOGGLE_BKC_DETAIL_INSERT
    }
}
export const insertBooker = (booker) => {
    return {
        type: INSERT_BOOKER,
        booker
    }
}
export const insertBookInfor = (e) => {
    return {
        type: INSERT_BOOK_INFOR,
        e
    }
}

export const fetchEmpRequest = () => {
    return async (dispatch) => {
        const response = await callApi("https://localhost:5001/api/employee/" + "trandoan280367@gmail.com", "GET", null);
        console.log("res1", response)
        dispatch(insertBooker(response.data));
    };
}
export const insertBkcRequest = (data) => {
    return async dispatch => {
        const response = await callApi("https://localhost:5001/api/bkc/insert", "POST", data)
        console.log("res", response)
    }
}