import { useState } from "react";
import { useSelector } from "react-redux";
import { Booker } from "./Booker"
import { BookingDetail } from "./BookingDetail";
import { PickupLocation } from "./PickupLocation";

export const BookingInfor = (props) => {
    const booker  = useSelector(state => state.bkc.booker);
    const bookingDetail = useSelector(state => state.bkc.bookingDetail);
    const pickupLocations  = useSelector(state => state.bkc.pickupLocations);
    console.log("booker", booker);
    console.log("bookingDetail", bookingDetail);
    console.log("pickupLocations", pickupLocations);
    return (
        <div className="row">
            <div className="col-12 col-xl-12">
                <div className="card">
                    <div className="card-header">
                        <h4>Thông Tin Đặt Xe</h4>
                    </div>
                    <div className="card-body">
                        <Booker />
                        <BookingDetail />
                        <PickupLocation />
                    </div>
                </div>
            </div>
        </div>
    );
}