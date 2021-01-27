import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { fetchTripByTicketId, setMoveCar, setReturnCar, fetchTripsByIsFinish } from "../ActionCreators/bookingApprovalActionCreator";
import { BookingApprovalContainer } from "../Components/BookingApproval/BookingApprovalContainer"

export const BookingApproval = () => {
    const dispatch = useDispatch();
    const { ticketId } = useParams();
    useEffect(() => {
        dispatch(fetchTripByTicketId(ticketId));
    });
    return (
        <div className="container-fluid">
            <BookingApprovalContainer />
        </div>
    );
}