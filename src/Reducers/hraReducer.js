import {
    SAVE_BOOKING_INFOR,
    SAVE_BOOKER,
    SAVE_BOOKING_DETAILS,
    SAVE_DRIVER_CARS,
    UPDATE_DRIVER_CAR,
    SAVE_TRIP_INFORMATION
} from "../Constants/hraConstants"

const initialState = {
    booker: {},
    bookingInfor: {},
    bookingDetails: [],
    driverCars: [],
    tripInformation: {}
}
export const hraReducer = (state = initialState, action) => {
    switch (action.type) {
        case SAVE_TRIP_INFORMATION: {
            return {
                ...state,
                tripInformation: action.tripInformation
            }
        }
        case UPDATE_DRIVER_CAR: {
            return {
                ...state,
                driverCars: state.driverCars.map((item) => {
                    if(item.carId === action.driverCar.carId){
                        return {
                            ...item,
                            carStatus: action.driverCar.carStatus
                        }
                    }
                    return item;
                })
            }
        }
        case SAVE_BOOKING_INFOR: {
            return {
                ...state,
                bookingInfor: action.bookingInfor
            }
        }
        case SAVE_BOOKER: {
            return {
                ...state,
                booker: action.booker
            }
        }
        case SAVE_DRIVER_CARS: {
            return {
                ...state,
                driverCars: action.driverCars
            }
        }
        case SAVE_BOOKING_DETAILS: {
            return {
                ...state,
                bookingDetails: action.bookingDetails
            }
        }
        default:
            return {
                ...state
            }
    }
}