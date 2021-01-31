import { remove } from "lodash";
import {
    SET_NOTE_FOR_DRIVER, 
    SET_SELECTED_CAR, 
    SET_TICKET,
    SET_TICKET_CARS,
    SET_DRIVERS,
    SET_DRIVER_WAS_BOOKED

} from "../Constants/TicketHandleConstants";

const initialState = {
    noteForDrivers: [],
    selectedCars: [],
    ticket: {},
    ticketCars: [],
    drivers: [],
    driversWasBooked: []
}
export const ticketHandleReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_TICKET: {
            return {
                ...state,
                ticket: action.ticket
            }
        }
        case SET_TICKET_CARS: {
            return {
                ...state,
                ticketCars: action.ticketCars
            }
        }
        case SET_SELECTED_CAR: {
            let cloneSelectedCars = [...state.selectedCars];
            if(action.selectedCar.type === "MOVE_CAR"){
                cloneSelectedCars[0] = action.selectedCar
            }else if(action.selectedCar.type === "RETURN_CAR"){
                cloneSelectedCars[1] = action.selectedCar
            }else{
                cloneSelectedCars = [];
            }
            return {
                ...state,
                selectedCars: cloneSelectedCars
            }
        }
        case SET_NOTE_FOR_DRIVER: {
            const noteForDriver = action.noteForDriver;
            return {
                ...state,
                noteForDriver: action.noteForDriver
            }
        }
        case SET_DRIVERS: {
            return {
                ...state,
                drivers: action.drivers
            }
        }
        case SET_DRIVER_WAS_BOOKED: {
            return {
                ...state,
                driversWasBooked: action.driversWasBooked
            }
        }
        default:
            return {
                ...state
            }
    }
}