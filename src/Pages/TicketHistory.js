import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { setPageName } from '../ActionCreators/appActionCreator'
import { fetchTicketsByEmployeeId } from '../ActionCreators/ticketHistoryActionCreator'
import { TicketHistoryContainer } from '../Components/TicketHistory/TicketHistoryContainer'
import './TicketHistory.scss'

export const TicketHistory = () => {
    const dispatch = useDispatch();
    const employee = useSelector(state => state.appReducer.employee);
    useEffect(() => {
        dispatch(setPageName("TicketHistory"))
        dispatch(fetchTicketsByEmployeeId(employee.id));
    })
    return (
        <div className="container-fluid">
            <TicketHistoryContainer />
        </div>
    )
}