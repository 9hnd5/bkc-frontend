import { END_POINT, HTTP_METHOD } from "../Constants/CommonsConstants"
import {
    DELETE_DRIVER,
    SET_DRIVER,
    SET_DRIVERS,
    UPDATE_DRIVER,
    SET_CARS,
} from "../Constants/DriverManagementConstants"
import { callApi } from "../Helpers/callApi"
import { notification, NOTIFICATION_TYPE } from "../Helpers/notification"

export const setDrivers = drivers => {
    return {
        type: SET_DRIVERS,
        drivers
    }
}
export const setDriver = driver => {
    return {
        type: SET_DRIVER,
        driver
    }
}
export const setCars = cars => {
    return {
        type: SET_CARS,
        cars
    }
}
export const updateDriver = driver => {
    return {
        type: UPDATE_DRIVER,
        driver
    }
}
export const deleteDriver = driver => {
    return {
        type: DELETE_DRIVER,
        driver
    }
}



export const fetchDriversByBuId = (buId) => {
    return async dispatch => {
        const res = await callApi(`${END_POINT}/drivers/${buId}`, HTTP_METHOD.GET, null);
        if (res.status !== 200) {
            return notification(NOTIFICATION_TYPE.ERROR, "Load driver fail");
        }
        const drivers = res.data;
        dispatch(setDrivers(drivers));
    }
}
export const fetchCarsByBuId = buId => {
    return async dispatch => {
        const res = await callApi(`${END_POINT}/cars/?buId=${buId}&&driverId=`, HTTP_METHOD.GET, null);
        if (res.status !== 200) return notification(NOTIFICATION_TYPE.ERROR, "Load car fail");
        const cars = res.data;
        dispatch(setCars(cars));
    }
}
export const addDriverRequest = driverRequest => {
    return async dispatch => {
        const res = await callApi(`${END_POINT}/drivers`, HTTP_METHOD.POST, driverRequest);
        if (res.status !== 200) {
            return notification(NOTIFICATION_TYPE.ERROR, "Add driver fail");
        }
        const driverResponse = res.data;
        dispatch(setDriver(driverResponse));
        const res1 = await callApi(`${END_POINT}/cars/?buId=${driverRequest.car.buId}`, HTTP_METHOD.GET, null);
        if (res1.status !== 200) return notification(NOTIFICATION_TYPE.ERROR, "Load car fail");
        const cars = res1.data;
        dispatch(setCars(cars));
    }
}
export const updateDriverRequest = driver => {
    return async dispatch => {
        const res = await callApi(`${END_POINT}/drivers`, HTTP_METHOD.PUT, driver);
        if (res.status !== 200) {
            return notification(NOTIFICATION_TYPE.ERROR, "Update driver fail");
        }
        dispatch(updateDriver(driver));
        const res1 = await callApi(`${END_POINT}/cars/?buId=${driver.car.buId}`, HTTP_METHOD.GET, null);
        if (res1.status !== 200) return notification(NOTIFICATION_TYPE.ERROR, "Load car fail");
        const cars = res1.data;
        dispatch(setCars(cars));
    }
}
export const deleteDriverRequest = driver => {
    return async dispatch => {
        const res = await callApi(`${END_POINT}/drivers`, HTTP_METHOD.DELETE, driver);
        if (res.status !== 200) {
            return notification(NOTIFICATION_TYPE.ERROR, "Delete driver fail");
        }
        dispatch(deleteDriver(driver));
        const res1 = await callApi(`${END_POINT}/cars/?buId=${driver.car.buId}`, HTTP_METHOD.GET, null);
        if (res1.status !== 200) return notification(NOTIFICATION_TYPE.ERROR, "Load car fail");
        const cars = res1.data;
        dispatch(setCars(cars));
    }
}