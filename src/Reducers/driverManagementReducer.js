import { DELETE_DRIVER, SET_CARS, SET_DRIVER, SET_DRIVERS, UPDATE_DRIVER } from "../Constants/DriverManagementConstants";

const initialState = {
    drivers: [],
    cars: [],
}
export const driverManagementReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DRIVERS: {
            return {
                ...state,
                drivers: action.drivers
            }
        }
        case SET_DRIVER: {
            return {
                ...state,
                drivers: [...state.drivers, action.driver]
            }
        }
        case UPDATE_DRIVER: {
            return {
                ...state,
                drivers: [...state.drivers].map(driver => {
                    if (driver.id !== action.driver.id) {
                        return driver;
                    }
                    return action.driver;
                })
            }
        }
        case DELETE_DRIVER: {
            return {
                ...state,
                drivers: [...state.drivers].filter(driver => {
                    return +driver.id !== +action.driver.id;
                })
            }
        }
        case SET_CARS: {
            return {
                ...state,
                cars: action.cars
            }
        }
        default:
            return {
                ...state
            };
    }
}