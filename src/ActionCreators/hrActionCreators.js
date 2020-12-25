import { SAVE_BKC_DETAILS, SAVE_BKC_INFORS, SAVE_CARS, SAVE_DRIVERS, SAVE_PERSON_BOOKS } from "../Constants/hrConstants";
import { callApi } from "../Helpers/callApi";

export const saveBkcInfors = bkcInfors => {
    return {
        type: SAVE_BKC_INFORS,
        bkcInfors
    };
}
export const saveBkcDetails = bkcDetails => {
    return {
        type: SAVE_BKC_DETAILS,
        bkcDetails
    }
}
export const saveCars = cars => {
    return {
        type: SAVE_CARS,
        cars
    }
}
export const saveDrivers = drivers => {
    return {
        type: SAVE_DRIVERS,
        drivers
    }
}




export const fetchBkcInfors = () => {
    return async dispatch => {
        const res = await callApi("http://localhost:3000/api/bkc/infors", "GET", null);
        const bkcInfors = res.data;
        dispatch(saveBkcInfors(bkcInfors));
    }
}
export const fetchBkcDetails = () => {
    return async dispatch => {
        const res = await callApi("http://localhost:3000/api/bkc/details", "GET", null);
        const bkcDetails = res.data;
        dispatch(saveBkcDetails(bkcDetails));
    }
}
export const fetchDriversAndCars = () => {
    return async dispatch => {
        const res1 = await callApi("http://localhost:3000/api/bkc/cars", "GET", null);
        const res2 = await callApi("http://localhost:3000/api/bkc/drivers", "GET", null);
        const cars = res1.data;
        const drivers = res2.data;
        dispatch(saveCars(cars));
        dispatch(saveDrivers(drivers));
        console.log("cars", cars);
        console.log("drivers", drivers);
    }
}