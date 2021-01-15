import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import {  savePageName } from "../../ActionCreators/appActionCreators";
import { fetchBookingHistoryByEmployeeId } from "../../ActionCreators/bookingHistoryActionCreators.js";
import { BookingHistoryContainer } from "../../Components/HistoryComponent/BookingHistoryContainer"
import './BookingHistory.scss'

export const BookingHistoryHome = () => {
    const dispatch = useDispatch();
    const employee = useSelector(state => state.app.employee);
    console.log("employee", employee);
    useEffect(() => {
        dispatch(fetchBookingHistoryByEmployeeId(employee.id));
        dispatch(savePageName("HistoryBooking"));
    })
    return (
        <div className="container-fluid">
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-xl-12 ">
                    <div className="card">
                        <div className="card-body">
                            <BookingHistoryContainer />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}