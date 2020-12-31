import {
    UPDATE_BOOKING_DETAIL,
    INSERT_BOOKING_DETAIL,
    TOGGLE_BKC_DETAIL_INSERT,
    DELETE_BOOKING_DETAIL,
    INSERT_BOOKING_INFOR,
    BOOK_INFOR_DEFAULT,
    TOGGLE_BKINFOR_VALID,
    TOGGLE_BKDETAIL_VALID
} from "../Constants/bkcConstants";

let initialState = {
    isOpenBkcDetailModalInsert: false,
    bookingDetails: [],
    booker: {},
    bookingInfor: { ...BOOK_INFOR_DEFAULT },

    isBkInforValid: false,
    isBkDetailValid: false
};
export const bkcReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_BKINFOR_VALID: {
            return {
                ...state,
                isBkInforValid: action.isBkInforValid
            }
        }
        case TOGGLE_BKDETAIL_VALID: {
            return {
                ...state,
                isBkDetailValid: action.isBkDetailValid
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