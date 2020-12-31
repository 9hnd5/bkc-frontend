import {
    SAVE_DATA_APPROVE_BKC,
    SAVE_DRIVER_CARS,
    TOOGLE_IS_DATA_APPROVE_VALID
} from "../Constants/hrConstants"

const initialState = {
    driverCars: [],
    isDataApproveValid: false,
    dataAprroveBkc: {
        carId: "",
        inforId: ""
    },
    decline:{
        reason: "",
        bookerId: ""
    }

}
export const hrReducer = (state = initialState, action) => {
    switch (action.type) {
        case TOOGLE_IS_DATA_APPROVE_VALID: {
            return {
                ...state,
                isDataApproveValid: action.data
            }
        }
        case SAVE_DATA_APPROVE_BKC: {
            return {
                ...state,
                dataApproveBkc: action.data
            }
        }
        case SAVE_DRIVER_CARS: {
            return {
                ...state,
                driverCars: action.driverCars
            }
        }
        default:
            return {
                ...state
            };
    }
}