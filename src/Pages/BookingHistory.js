import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPageName } from '../ActionCreators/appActionCreator'
import { fetchTicketsByEmployeeId } from '../ActionCreators/bookingHistoryActionCreator'
import { BookingHistoryContainer } from '../Components/BookingHistory/BookingHistoryContainer'
import './BookingHistory.scss'

export const BookingHistory = () => {
    const dispatch = useDispatch();
    const employee = useSelector(state => state.appReducer.employee);
    useEffect(() => {
        dispatch(setPageName("TicketHistory"))
        dispatch(fetchTicketsByEmployeeId(employee.id));
    })
    return (
        <div className="container-fluid">
            <BookingHistoryContainer />
        </div>
    )
}