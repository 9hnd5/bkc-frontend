import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { TicketHandleContainer } from "../Components/TicketHandle/TicketHandleContainer";
import {
    fetchDriversByBuId,
    fetchDriversWasBooked,
    fetchTicketCarsByTicketId,
    fetchTicketsById,
    setDrivers,
    setDriversWasBooked,
    setSelectedCar,
    setTicketCars,
    setTickets
} from '../ActionCreators/ticketHandleActionCreator'
import "./TicketHandle.scss";

export const TicketHandle = () => {
    const { ticketId } = useParams();
    const employee = useSelector(state => state.appReducer.employee);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTicketsById(ticketId))
        dispatch(fetchTicketCarsByTicketId(ticketId));
        dispatch(fetchDriversByBuId(employee.buId))
        dispatch(fetchDriversWasBooked(employee.buId))
        return () => {
            dispatch(setSelectedCar([]));
            dispatch(setTickets({}));
            dispatch(setTicketCars([]));
            dispatch(setDrivers([]));
            dispatch(setDriversWasBooked([]));
        }
    }, [ticketId])
    return (
        <div className="container-fluid">
            <TicketHandleContainer />
        </div>
    );
}