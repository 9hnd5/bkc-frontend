import { remove } from "lodash";
import {
    SET_NOTE_FOR_DRIVER, 
    SET_SELECTED_CAR, 
    SET_TICKET,
    SET_TICKET_CARS

} from "../Constants/bookingApprovalConstants";

const initialState = {
    noteForDriver: "",
    selectedCars: [],
    ticket: {},
    ticketCars: []
}
export const bookingApprovalReducer = (state = initialState, action) => {
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
            const cloneSelectedCars = [...state.selectedCars];
            if(action.selectedCar.type === "moveCar"){
                cloneSelectedCars[0] = action.selectedCar
            }else{
                cloneSelectedCars[1] = action.selectedCar
            }
            return {
                ...state,
                selectedCars: cloneSelectedCars
            }
        }
        case SET_NOTE_FOR_DRIVER: {
            return {
                ...state,
                noteForDriver: action.noteForDriver
            }
        }

        default:
            return {
                ...state
            }
    }
}