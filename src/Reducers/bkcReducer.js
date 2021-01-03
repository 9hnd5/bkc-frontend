import {
    UPDATE_BOOKING_DETAIL,
    INSERT_BOOKING_DETAIL,
    TOGGLE_BKC_DETAIL_INSERT,
    DELETE_BOOKING_DETAIL,
    INSERT_BOOKING_INFOR,
    TOGGLE_BKINFOR_VALID,
    TOGGLE_BKDETAIL_VALID,
    EMPTY_BOOKING_INFOR,
    EMPTY_BOOKING_DETAILS,
    SET_LOADING
} from "../Constants/bkcConstants";

let initialState = {
    isOpenBkcDetailModalInsert: false,
    booker: {},
    bookingInfor: {},
    bookingDetails: [],

    isBkcInforValid: false,
    isBkcDetailValid: false,
    isLoading: false
};
export const bkcReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_LOADING: {
            return{
                ...state,
                isLoading: action.isLoading
            }
        }
        case EMPTY_BOOKING_INFOR: {
            return {
                ...state,
                bookingInfor: {}
            }
        }
        case EMPTY_BOOKING_DETAILS: {
            return {
                ...state, 
                bookingDetails: []
            }
        }
        case TOGGLE_BKINFOR_VALID: {
            return {
                ...state,
                isBkcInforValid: action.isBkcInforValid
            }
        }
        case TOGGLE_BKDETAIL_VALID: {
            return {
                ...state,
                isBkcDetailValid: action.isBkcDetailValid
            }
        }
        case INSERT_BOOKING_DETAIL:
            {
                const { bookingDetail } = action;
                bookingDetail.stt = state.bookingDetails.length + 1;
                return {
                    ...state,
                    bookingDetails: [...state.bookingDetails, bookingDetail]
                }
            }
        case INSERT_BOOKING_INFOR: {
            const { data } = action
            return {
                ...state,
                bookingInfor: data
            }
        }
        case UPDATE_BOOKING_DETAIL:
            {
                const index = state.bookingDetails.findIndex(bookingDetail => {
                    return bookingDetail.id === action.bookingDetail.id
                });
                const bookingDetailsNew = [...state.bookingDetails];
                bookingDetailsNew.splice(index, 1, action.bookingDetail);
                return {
                    ...state,
                    bookingDetails: bookingDetailsNew
                }
            }
        case DELETE_BOOKING_DETAIL:
            {
                const index = state.bookingDetails.findIndex(bookingDetail => {
                    return bookingDetail.id === action.bookingDetail.id
                });
                const bookingDetailsNew = [...state.bookingDetails];
                bookingDetailsNew.splice(index, 1);
                return {
                    ...state,
                    bookingDetails: bookingDetailsNew
                }
            }
        case TOGGLE_BKC_DETAIL_INSERT:
            return {
                ...state,
                isOpenBkcDetailModalInsert: !state.isOpenBkcDetailModalInsert
            }
        default:
            return {
                ...state
            }
    }
}