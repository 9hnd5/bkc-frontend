import { HTTP_METHOD, URL } from "../Constants/appConstants";
import {
    SAVE_BOOKING_INFOR,
    SAVE_BOOKER,
    SAVE_BOOKING_DETAILS,
    SAVE_DRIVER_CARS,
    UPDATE_DRIVER_CAR,
    SAVE_TRIP_INFORMATION
} from "../Constants/hraConstants";
import { callApi } from "../Helpers/callApi";
import { notification, NOTIFICATION_TYPE } from "../Helpers/notification";

export const saveBookingInfor = (bookingInfor) => {
    return {
        type: SAVE_BOOKING_INFOR,
        bookingInfor
    }
}
export const saveBooker = (booker) => {
    return {
        type: SAVE_BOOKER,
        booker
    }
}
export const saveBookingDetails = (bookingDetails) => {
    return {
        type: SAVE_BOOKING_DETAILS,
        bookingDetails
    }
}
export const saveDriverCars = (driverCars) => {
    return {
        type: SAVE_DRIVER_CARS,
        driverCars
    }
}
export const saveTripInformation = (tripInformation) => {
    return {
        type: SAVE_TRIP_INFORMATION,
        tripInformation
    }
}
export const updateDriverCar = (driverCar) => {
    return {
        type: UPDATE_DRIVER_CAR,
        driverCar
    }
}

export const fetchBookingInforByBookerId = (bookerId) => {
    return async dispatch => {
        const res = await callApi(`${URL}/booking-infor/${bookerId}`, HTTP_METHOD.GET, null);
        if (res.status !== 200) {
            return;
        }
        const data = res.data;
        const bookingInfor = {
            moveDate: data.moveDate,
            returnDate: data.returnDate,
            location: data.location,
            destination: data.destination,
            totalPerson: data.totalPerson,
            mailToRelatePersons: data.mailToRelatePersons,
            reasonBooking: data.reasonBooking
        }
        dispatch(saveBookingInfor(bookingInfor))

    }
}
export const fetchBookerByBookerId = (bookerId) => {
    return async dispatch => {
        const res = await callApi(`${URL}/booker/${bookerId}`, HTTP_METHOD.GET, null);
        if (res.status !== 200) return;

        const data = res.data;
        const booker = {
            id: data.id,
            employeeName: data.employeeName,
            phone: data.phone,
            buName: data.buName,
            department: data.department,
            lineManagerName: data.lineManagerName
        }
        dispatch(saveBooker(booker));
    }
}
export const fetchBookingPickupLocationByBookerId = (bookerId) => {
    return async dispatch => {
        const res = await callApi(`${URL}/booking-pickup-location/${bookerId}`, HTTP_METHOD.GET, null);
        if (res.status !== 200) return;
        const bookingDetailsFromServer = res.data;
        const bookingDetails = bookingDetailsFromServer.map((item, index) => {
            const { bookingParticipants: x, ...rest } = item;
            return {
                ...rest,
                employees: item.bookingParticipants.map(x => {
                    return {
                        id: x.employeeId,
                        name: x.employeeName
                    }
                }),
                stt: index + 1
            }
        })
        dispatch(saveBookingDetails(bookingDetails));
    }
}
export const fetchDriverCarsByBuId = (buId) => {
    return async dispatch => {
        const res = await callApi(`${URL}/driver-car-information/${buId}`, HTTP_METHOD.GET, null);
        if (res.status !== 200) return;
        const driverCars = res.data;
        dispatch(saveDriverCars(driverCars));
    }
}
export const fetchTripInformationByBookerId = (bookerId) => {
    return async dispatch => {
        const res = await callApi(`${URL}/trip-information/booker/${bookerId}`);
        if (res.status !== 200) return notification(NOTIFICATION_TYPE.ERROR, res.data);
        const tripInformation = {
            bookerId: res.data.bookerId,
            carId: res.data.carId,
            bookerName: res.data.bookerName,
            bookerPhone: res.data.bookerPhone,
            buName: res.data.buName,
            moveDate: res.data.moveDate,
            returnDate: res.data.returnDate,
            totalPerson: res.data.totalPerson,
        }
        dispatch(saveTripInformation(tripInformation));
    }
}




export const requestApprovalBooking = (data) => {
    return async dispatch => {
        const res = await callApi(`${URL}/request-approval-booking`, HTTP_METHOD.POST, data);
        if (res.status !== 200) return;
        dispatch(updateDriverCar(data));
        notification(NOTIFICATION_TYPE.SUCCESS, "Đã Duyệt Xe");
    }
}