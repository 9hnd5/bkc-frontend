import { SET_EMPLOYEE, SET_IS_AUTH, SET_PAGE_NAME } from "../Constants/AppConstants"

const initialState = {
    employee: {},
    pageName: "Home",
    isAuth: false,
}
export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EMPLOYEE: {
            return {
                ...state,
                employee: action.employee
            }
        }
        case SET_IS_AUTH: {
            return {
                ...state,
                isAuth: action.isAuth
            }
        }
        case SET_PAGE_NAME: {
            return {
                ...state,
                pageName: action.pageName
            }
        }
        default: {
            return {
                ...state
            }
        }

    }
}