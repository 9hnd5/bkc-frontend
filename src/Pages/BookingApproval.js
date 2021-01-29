import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { BookingApprovalContainer } from "../Components/BookingApproval/BookingApprovalContainer";
import { fetchTicketCarsByTicketId, fetchTicketsById } from './../ActionCreators/bookingApprovalActionCreator'
import "./BookingApproval.scss";

export const BookingApproval = () => {
    const { ticketId } = useParams();
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchTicketsById(ticketId))
        dispatch(fetchTicketCarsByTicketId(ticketId));
    }, [ticketId])
    return (
        <div className="container-fluid">
            <BookingApprovalContainer />
        </div>
    );
}