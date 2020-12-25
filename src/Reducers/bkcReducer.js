import {
    UPDATE_BKC_DETAIL,
    INSERT_BKC_DETAIL,
    TOGGLE_BKC_DETAIL_INSERT,
    DELETE_BKC_DETAIL,
    INSERT_USER
} from "../Constants/bkcConstants";

let initialState = {
    isOpenBkcDetailModalInsert: false,
    bkcDetails: [],
    user: {}
};
export const bkcReducer = (state = initialState, action) => {
    switch (action.type) {
        case INSERT_BKC_DETAIL:
            {
                const { bkcDetail } = action;
                const { bkcDetails } = state;
                bkcDetail.id = bkcDetails.length + 1
                return {
                    ...state,
                    bkcDetails: [...state.bkcDetails, bkcDetail]
                }
            }
        case UPDATE_BKC_DETAIL:
            {
                const index = state.bkcDetails.findIndex(bkcDetail => {
                    return bkcDetail.id === action.bkcDetail.id
                });
                const bkcDetailsNew = [...state.bkcDetails];
                bkcDetailsNew.splice(index, 1, action.bkcDetail);
                return {
                    ...state,
                    bkcDetails: bkcDetailsNew
                }
            }
        case DELETE_BKC_DETAIL:
            {
                const index = state.bkcDetails.findIndex(bkcDetail => {
                    return bkcDetail.id === action.bkcDetail.id
                });
                const bkcDetailsNew = [...state.bkcDetails];
                bkcDetailsNew.splice(index, 1);
                return {
                    ...state,
                    bkcDetails: bkcDetailsNew
                }
            }
        case INSERT_USER: {
            return {
                ...state,
                user: action.user
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