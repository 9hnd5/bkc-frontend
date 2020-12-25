import { SAVE_BKC_DETAILS, SAVE_BKC_INFORS, SAVE_CARS, SAVE_DRIVERS } from "../Constants/hrConstants"

const initialState = {
    bkcInfors: [],
    bkcDetails: [],
    personBooks: [],
    drivers: []
}
export const hrReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_BKC_INFORS: {
            return {
                ...state,
                bkcInfors: action.bkcInfors
            };
        }
        case SAVE_BKC_DETAILS:
            return{
                ...state,
                bkcDetails: action.bkcDetails
            }
        case SAVE_CARS: {
            return {
                ...state,
                cars: action.cars
            }
        }
        case SAVE_DRIVERS: {
            return {
                ...state,
                drivers: action.drivers
            }
        }
        default:
            return {
                ...state
            };
    }
}