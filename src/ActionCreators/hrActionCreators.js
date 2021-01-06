import { SAVE_BKC_DETAILS, SAVE_BKC_INFORS, SAVE_CARS, SAVE_DATA_APPROVE_BKC, SAVE_DRIVERS, SAVE_DRIVER_CARS, TOGGLE_IS_APPROVE_SUCCESS, TOOGLE_IS_DATA_APPROVE_VALID } from "../Constants/hrConstants";
import { callApi } from "../Helpers/callApi";
import { notification, NOTIFICATION_TYPE } from "../Helpers/notification";

export const toggleIsDataApproveValid = (data) => {
    return {
        type: TOOGLE_IS_DATA_APPROVE_VALID,
        data
    }
}
export const toggleIsApproveSuccess = (isApproveSuccess) => {
    return {
        type: TOGGLE_IS_APPROVE_SUCCESS,
        isApproveSuccess
    }
}
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
export const saveDriverCars = (driverCars) => {
    return {
        type: SAVE_DRIVER_CARS,
        driverCars
    }
}
export const saveDataApproveBkc = (data) => {
    return {
        type: SAVE_DATA_APPROVE_BKC,
        data
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
export const fetchDriverCars = (buId) => {
    return async dispatch => {
        const res = await callApi(`https://localhost:5001/api/bkc/drivercar/${buId}`, "GET", null);
        dispatch(saveDriverCars(res.data.driverCars));
    }
}
export const saveCarRequest = (data) => {
    return async dispatch => {
        const res = await callApi(`https://localhost:5001/api/bkc/savecar`, "POST", data)
        console.log("asdasd", res);
    }
}
export const requestApproveBkc = (data) => {
    return async dispatch => {
        const res = await callApi(`https://localhost:5001/api/bkc/approve`, "POST", data);
        if(!res.status === 200){
            dispatch(toggleIsApproveSuccess(false));
            return notification(NOTIFICATION_TYPE.ERROR, res.data);
        }
        dispatch(toggleIsApproveSuccess(true));
        notification(NOTIFICATION_TYPE.SUCCESS, res.data);
    }
}
