import { combineReducers } from "redux"
import { appReducer } from "./appReducer"
import { ticketReducer } from './ticketReducer'
import { ticketHistoryReducer } from './ticketHistoryReducer'
import { ticketManagementReducer } from './ticketManagementReducer'
import { carManagementReducer } from './carManagementReducer'
import { driverManagementReducer } from './driverManagementReducer';
import { ticketHandleReducer } from './ticketHandleReducer'

export const rootReducer = combineReducers({
    appReducer,
    ticketReducer,
    ticketHistoryReducer,
    ticketManagementReducer,
    carManagementReducer,
    driverManagementReducer,
    ticketHandleReducer
})