import { SET_EMPLOYEE } from "../Constants/AppConstants"

const initialState = {
    employee: {},
    pageName: "Home"
}
export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_EMPLOYEE: {
            return {
                ...state,
                employee: action.employee
            }
        }
        default: {
            return {
                ...state
            }
        }

    }
}