import { SET_MOVE_CAR, SET_RETURN_CAR } from "../Constants/bookingApprovalConstants";

const initialState = {
    moveCar: {},
    returnCar: {},
}
export const bookingApprovalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MOVE_CAR: {
            return {
                ...state,
                moveCar: action.moveCar
            }
        }
        case SET_RETURN_CAR: {
            return {
                ...state,
                returnCar: action.returnCar
            }
        }

        default:
            return {
                ...state
            }
    }
}