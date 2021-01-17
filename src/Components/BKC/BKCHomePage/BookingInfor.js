import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { setBookingDetail, setPickupLocations } from "../../../ActionCreators/bkcActionCreators";
import { Booker } from "./Booker"
import { BookingDetail } from "./BookingDetail";
import { PickupLocation } from "./PickupLocation";

export const BookingInfor = (props) => {
    const dispatch = useDispatch();
    const [bookingDetailLocal, setBookingDetailLocal] = useState({});
    const [pickupLocationsLocal, setPickupLocationsLocal] = useState([])
    console.log("bookingDetailLocal", bookingDetailLocal);
    console.log("pickupLocationsLocal", pickupLocationsLocal);
    useEffect(() => {
        dispatch(setBookingDetail({}));
        dispatch(setPickupLocations([]));
    }, []);
    useEffect(() => {
        if (isEmpty(props.bookingInfor)) return;
        const { bookingResult, pickupLocations, relatePersons, ...bookingDetailLocal } = props.bookingInfor;
        setBookingDetailLocal(
            {
                ...bookingDetailLocal,
                relatePersons: props.bookingInfor.relatePersons
            }
        )
        setPickupLocationsLocal(props.bookingInfor.pickupLocations);
    }, [props.bookingInfor])
    return (
        <div className="row">
            <div className="col-12 col-xl-12">
                <div className="card">
                    <div className="card-header">
                        <h4>Thông Tin Đặt Xe</h4>
                    </div>
                    <div className="card-body">
                        <Booker />
                        <BookingDetail bookingDetail={bookingDetailLocal} />
                        <PickupLocation pickupLocations={pickupLocationsLocal} />
                    </div>
                </div>
            </div>
        </div>
    );
}