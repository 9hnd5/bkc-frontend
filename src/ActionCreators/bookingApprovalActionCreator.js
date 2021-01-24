import { SET_MOVE_CAR, SET_RETURN_CAR } from "../Constants/bookingApprovalConstants"

export const setMoveCar = moveCar => {
    return {
        type: SET_MOVE_CAR,
        moveCar
    }
}
export const setReturnCar = returnCar => {
    return {
        type: SET_RETURN_CAR,
        returnCar
    }
}