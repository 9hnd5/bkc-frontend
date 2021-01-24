import { SET_CARS, SET_CAR, UPDATE_CAR, DELETE_CAR } from "../Constants/CarManagementConstants";
import { END_POINT, HTTP_METHOD } from "../Constants/CommonsConstants"
import { callApi } from "../Helpers/callApi"
import { notification, NOTIFICATION_TYPE } from "../Helpers/notification";

export const setCars = cars => {
    return {
        type: SET_CARS,
        cars
    }
}
export const setCar = car => {
    return {
        type: SET_CAR,
        car
    }
}
export const updateCar = car => {
    return {
        type: UPDATE_CAR,
        car
    }
}
export const deleteCar = car => {
    return {
        type: DELETE_CAR,
        car
    }
}


export const fetchCar = () => {
    return async dispatch => {
        const res = await callApi(`${END_POINT}/cars`, HTTP_METHOD.GET, null);
        if(res.status !== 200){
            return notification(NOTIFICATION_TYPE.ERROR, "Load Car Fail");
        }
        const cars = res.data;
        dispatch(setCars(cars));
    }
}
export const addCarRequest = carRequest => {
    return async dispatch => {
        const res = await callApi(`${END_POINT}/cars`, HTTP_METHOD.POST, carRequest);
        if(res.status !== 200){
            return notification(NOTIFICATION_TYPE.ERROR, "Add Car Fail");
        }
        const carResponse = res.data;
        dispatch(setCar(carResponse));
    }
};
export const updateCarRequest = car => {
    return async dispatch => {
        const res = await callApi(`${END_POINT}/cars`, HTTP_METHOD.PUT, car);
        if(res.status !== 200){
            return notification(NOTIFICATION_TYPE.ERROR, "Update Car Fail");
        }
        dispatch(updateCar(car));
    }
}
export const deleteCarRequest = car => {
    return async dispatch => {
        const res = await callApi(`${END_POINT}/cars`, HTTP_METHOD.DELETE, car);
        if(res.status !== 200){
            return notification(NOTIFICATION_TYPE.ERROR, "Delete Car Fail");
        }
        dispatch(deleteCar(car));
    }
}