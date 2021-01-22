import { SET_MOVE_CAR, SET_RETURN_CAR } from "../Constants/bookingApprovalConstants";

const initialState = {
    moveTrip: {},
    returnTrip: {},
}
export const bookingApprovalReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_MOVE_CAR: {
            return {
                ...state,
                moveTrip: action.moveTrip
            }
        }
        case SET_RETURN_CAR: {
            return {
                ...state,
                returnTrip: action.returnTrip
            }
        }

        default:
            return {
                ...state
            }
    }
}