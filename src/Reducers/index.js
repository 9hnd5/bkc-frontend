import { combineReducers } from "redux"
import { appReducer } from "./appReducer"
import { ticketReducer } from './ticketReducer'
import { bookingHistoryReducer } from './bookingHistoryReducer'
import { adminReducer } from './adminReducer'
import { carManagementReducer } from './carManagementReducer'
import { driverManagementReducer } from './driverManagementReducer';
import { bookingApprovalReducer } from './bookingApprovalReducer'

export const rootReducer = combineReducers({
    appReducer,
    ticketReducer,
    bookingHistoryReducer,
    adminReducer,
    carManagementReducer,
    driverManagementReducer,
    bookingApprovalReducer
})