import { SET_MOVE_CAR, SET_RETURN_CAR } from "../Constants/bookingApprovalConstants"

export const setMoveCar = moveTrip => {
    return {
        type: SET_MOVE_CAR,
        moveTrip
    }
}
export const setReturnCar = returnTrip => {
    return {
        type: SET_RETURN_CAR,
        returnTrip
    }
}