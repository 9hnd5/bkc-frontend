import {
    SET_MOVE_CAR, SET_RETURN_CAR,
    SET_NOTE_FOR_DRIVER,
    SET_BOOKED_TRIPS,
    SET_TRIPS
} from "../Constants/bookingApprovalConstants";

const initialState = {
    trips: [],
    bookedTrips: [],
    moveCar: {},
    returnCar: {},
    noteForDriver: ""
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
        case SET_NOTE_FOR_DRIVER: {
            return {
                ...state,
                noteForDriver: action.noteForDriver
            }
        }
        case SET_BOOKED_TRIPS: {
            return {
                ...state,
                bookedTrips: action.bookedTrips
            }
        }
        case SET_TRIPS: {
            return {
                ...state,
                trips: action.trips
            }
        }
        default:
            return {
                ...state
            }
    }
}