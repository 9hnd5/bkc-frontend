import { combineReducers } from "redux"
import { appReducer } from "./appReducer"
import { ticketReducer } from './ticketReducer'
import { bookingHistoryReducer } from './bookingHistoryReducer'
import { adminReducer } from './adminReducer'

export const rootReducer = combineReducers({
    appReducer,
    ticketReducer,
    bookingHistoryReducer,
    adminReducer
})