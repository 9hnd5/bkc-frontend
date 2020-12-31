import {
    SAVE_ACCESSTOKEN,
    SAVE_AUTHENTICATE,
    SAVE_BOOKER_BOOKING_DETAILS,
    SAVE_EMPLOYEE,
    UPDATE_STATUS_BOOKER_DECLINE,
    SAVE_ERROR_MESSAGE
} from "../Constants/appConstants";
const initialState = {
    accessToken: "",
    employee: {},
    isAuth: false,
    bookerBkInforBkDetails: [],
    errorMessage: ""
}
export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_ERROR_MESSAGE: {
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        }
        case UPDATE_STATUS_BOOKER_DECLINE: {
            const { bookerId } = action;
            const index = state.bookerBkInforBkDetails.findIndex((item) => {
                return item.booker.id == bookerId;
            })
            if (index == -1) return { ...state };
            const temp = [...state.bookerBkInforBkDetails];
            temp[index].booker.status = "Decline";
            return {
                ...state,
                bookerBkInforBkDetails: temp
            }

        }
        case SAVE_ACCESSTOKEN:
            return {
                ...state,
                accessToken: action.accessToken
            }
        case SAVE_EMPLOYEE: {
            return {
                ...state,
                employee: action.employee
            }
        }
        case SAVE_AUTHENTICATE: {
            return {
                ...state,
                isAuth: action.isAuth
            }
        }
        case SAVE_BOOKER_BOOKING_DETAILS: {
            return {
                ...state,
                bookerBkInforBkDetails: action.bookerBkInforBkDetails
            }
        }
        default: {
            return {
                ...state
            }

        }
    }
}