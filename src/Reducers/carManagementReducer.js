import { remove } from "lodash";
import { DELETE_CAR, SET_CAR, SET_CARS, UPDATE_CAR } from "../Constants/CarManagementConstants";

const initialState = {
    cars: []
}
export const carManagementReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_CAR: {
            return {
                ...state,
                cars: [...state.cars, action.car]
            }
        }
        case UPDATE_CAR: {
            const index = state.cars.findIndex(car => {
                return +car.id === +action.car.id;
            });
            if(index < 0){
                return {
                    ...state
                }
            }
            const newCars = [...state.cars];
            newCars[index] = action.car;
            return {
                ...state,
                cars: newCars
            }
        }
        case DELETE_CAR: {
            const newCars = [...state.cars];
            remove(newCars, car => {
                return +car.id === +action.car.id
            });
            return {
                ...state,
                cars: newCars
            }
        }
        case SET_CARS:{
            return {
                ...state,
                cars: action.cars
            }
        }

    
        default:
            return{
                ...state
            }
    }
}