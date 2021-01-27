import { history } from "../App"
import {
    SET_MOVE_CAR,
    SET_NOTE_FOR_DRIVER,
    SET_RETURN_CAR,
    SET_BOOKED_TRIPS,
    SET_TRIPS
} from "../Constants/bookingApprovalConstants"
import { END_POINT, HTTP_METHOD } from "../Constants/CommonsConstants"
import { callApi } from "../Helpers/callApi"
import { notification, NOTIFICATION_TYPE } from "../Helpers/notification"

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
export const setNoteForDriver = noteForDriver => {
    return {
        type: SET_NOTE_FOR_DRIVER,
        noteForDriver
    }
}
export const setBookedTrips = bookedTrips => {
    return {
        type: SET_BOOKED_TRIPS,
        bookedTrips
    }
}
export const setTrips = trips => {
    return {
        type: SET_TRIPS,
        trips
    }
}



export const ticketTripsAddRequest = ticketTrips => {
    return async dispatch => {
        const res = await callApi(`${END_POINT}/ticket-approval/ticket-trips`, HTTP_METHOD.POST, ticketTrips);
        if (res.status !== 200) {
            setMoveCar({});
            setReturnCar({});
            return notification(NOTIFICATION_TYPE.ERROR, "Approved Ticket Fail");
        }
        dispatch(setMoveCar({}));
        dispatch(setReturnCar({}));
        notification(NOTIFICATION_TYPE.SUCCESS, "Success");
        history.push("/admin");
    }
}
export const fetchTripByTicketId = ticketId => {
    return async dispatch => {
        const res = await callApi(`${END_POINT}/ticket-approval/tickets/${ticketId}/trips`, HTTP_METHOD.GET, null);
        if (res.status !== 200) {
            return notification(NOTIFICATION_TYPE.ERROR, "Load Trips by ticket Fail");
        }
        const bookedTrips = res.data;
        dispatch(setBookedTrips(bookedTrips));
    }
}