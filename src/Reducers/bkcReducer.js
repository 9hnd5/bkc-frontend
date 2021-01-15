import {
    SET_BOOKER,
    SET_BOOKING_DETAIL,
    SET_PICKUP_LOCATIONS,
    TOGGLE_BKC_DETAIL_INSERT,
 
} from "../Constants/bkcConstants";

let initialState = {
    isOpenBkcDetailModalInsert: false,
    isLoading: false,
    booker: {},
    bookingDetail: {},
    pickupLocations: []

    
};
export const bkcReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOGGLE_BKC_DETAIL_INSERT:
            return {
                ...state,
                isOpenBkcDetailModalInsert: !state.isOpenBkcDetailModalInsert
            }
        case SET_BOOKER:{
            return {
                ...state,
                booker: action.booker
            }
        }
        case SET_BOOKING_DETAIL: {
            return {
                ...state,
                bookingDetail: action.bookingDetail
            }
        }
        case SET_PICKUP_LOCATIONS: {
            return {
                ...state,
                pickupLocations: action.pickupLocations
            }
        }
        default:
            return {
                ...state
            }
    }
}