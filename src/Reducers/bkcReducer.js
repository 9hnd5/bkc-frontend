import {
    UPDATE_BOOK_DETAIL,
    INSERT_BOOK_DETAIL,
    TOGGLE_BKC_DETAIL_INSERT,
    DELETE_BOOK_DETAIL,
    INSERT_BOOKER,
    INSERT_BOOK_INFOR,
    BOOK_INFOR_DEFAULT
} from "../Constants/bkcConstants";

let initialState = {
    isOpenBkcDetailModalInsert: false,
    bookDetails: [],
    booker: {},
    bookInfor: {...BOOK_INFOR_DEFAULT}
};
export const bkcReducer = (state = initialState, action) => {
    switch (action.type) {
        case INSERT_BOOK_DETAIL:
            {
                const { bookDetail } = action;
                bookDetail.stt = state.bookDetails.length + 1;
                return {
                    ...state,
                    bookDetails: [...state.bookDetails, bookDetail]
                }
            }
        case INSERT_BOOK_INFOR: {
            const {e} = action
            return {
                ...state,
                bookInfor: {
                    ...state.bookInfor,
                    [e.target.name]: e.target.value
                }
            }
        }
        case UPDATE_BOOK_DETAIL:
            {
                const index = state.bookDetails.findIndex(bookDetail => {
                    return bookDetail.id === action.bookDetail.id
                });
                const bookDetailsNew = [...state.bookDetails];
                bookDetailsNew.splice(index, 1, action.bookDetail);
                return {
                    ...state,
                    bookDetails: bookDetailsNew
                }
            }
        case DELETE_BOOK_DETAIL:
            {
                const index = state.bookDetails.findIndex(bookDetail => {
                    return bookDetail.id === action.bookDetail.id
                });
                const bookDetailsNew = [...state.bookDetails];
                bookDetailsNew.splice(index, 1);
                return {
                    ...state,
                    bookDetails: bookDetailsNew
                }
            }
        case INSERT_BOOKER: {
            return {
                ...state,
                booker: action.booker
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