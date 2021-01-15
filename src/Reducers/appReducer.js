import {
    SAVE_ACCESSTOKEN,
    SAVE_AUTHENTICATE,
    SAVE_EMPLOYEE,
    UPDATE_STATUS_BOOKER_DECLINE,
    SAVE_ERROR_MESSAGE,
    SAVE_PAGE_NAME,
    SAVE_BOOKERID
} from "../Constants/appConstants";
const initialState = {
    accessToken: "",
    employee: {},
    isAuth: false,
    errorMessage: "",
    pageName: "Home",
    bookerId: "",
}
export const appReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_PAGE_NAME: {
            return {
                ...state, 
                pageName: action.pageName
            }
        }
        case SAVE_BOOKERID: {
            return {
                ...state,
                bookerId: action.bookerId
            }
        }
        case SAVE_ERROR_MESSAGE: {
            return {
                ...state,
                errorMessage: action.errorMessage
            }
        }
        case UPDATE_STATUS_BOOKER_DECLINE: {
            const { bookerId } = action;
            const index = state.bookerBkInforBkDetails.findIndex((item) => {
                return item.booker.id === bookerId;
            })
            if (index === -1) return { ...state };
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
        default: {
            return {
                ...state
            }

        }
    }
}