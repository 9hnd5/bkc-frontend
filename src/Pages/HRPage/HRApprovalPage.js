import { useParams } from "react-router-dom";
import { HRAButtons } from "../../Components/HR/HRApprovalPage/HRAButtons";
import { HRAInformation } from "../../Components/HR/HRApprovalPage/HRAInformation";
import { HRAInforCarList } from "../../Components/HR/HRApprovalPage/HRAInforCarList"
import "./HRApprovalPage.scss";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
    fetchBookerByBookerId,
    fetchBookingInforByBookerId,
    fetchBookingPickupLocationByBookerId,
    fetchDriverCarsByBuId,
    fetchTripInformationByBookerId,
    requestApprovalBooking
} from "../../ActionCreators/hraActionCreators";
import { notification, NOTIFICATION_TYPE } from "../../Helpers/notification";
const HRApprovalPage = () => {
    const { bookerId, action } = useParams();
    const dispatch = useDispatch();
    const employee = useSelector(state => state.app.employee);
    const bookingInfor = useSelector(state => state.hra.bookingInfor);
    const booker = useSelector(state => state.hra.booker);
    const bookingDetails = useSelector(state => state.hra.bookingDetails);
    const driverCars = useSelector(state => state.hra.driverCars);
    const tripInformation = useSelector(state => state.hra.tripInformation);
    const [cars, setCars] = useState({});
    function handleClickAccept() {
        const data = {
            bookerId: booker.id,
            moveDate: bookingInfor.moveDate,
            returnDate: bookingInfor.returnDate,
            bookerName: booker.employeeName,
            moveCar: {
                ...cars.moveCar,
                carStatus: "Booked"
            },
            returnCar: {
                ...cars.returnCar,
                carStatus: "Booked"
            }
        }
        console.log("data", data);
        // dispatch(requestApprovalBooking(data));
    }
    function handleGetCar(typeCar, car) {
        // if (driverCar.carStatus === "Booked") {
        //     notification(NOTIFICATION_TYPE.ERROR, "Xe Này Đã Có Người Đặt");
        // }
        setCars({
            ...cars,
            [typeCar]: car
        });
    }
    useEffect(() => {
        if (bookerId && action === "process") {
            dispatch(fetchBookingInforByBookerId(bookerId));
            dispatch(fetchBookerByBookerId(bookerId));
            dispatch(fetchBookingPickupLocationByBookerId(bookerId));
            dispatch(fetchDriverCarsByBuId(employee.buId));
        }
        else if (bookerId && action === "update") {
            dispatch(fetchBookerByBookerId(bookerId));
            dispatch(fetchBookingInforByBookerId(bookerId));
            dispatch(fetchBookingPickupLocationByBookerId(bookerId));
            dispatch(fetchDriverCarsByBuId(employee.buId));
            dispatch(fetchTripInformationByBookerId(bookerId));
        }
    }, [bookerId, employee.buId, dispatch, action])
    return (
        <div className="container-fluid">
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-xl-12">
                    <div className="card">
                        <div className="card-body">
                            <HRAInformation
                                booker={booker}
                                bookingInfor={bookingInfor}
                                bookingDetails={bookingDetails}
                            />
                            <div className="mt-1"></div>
                            <HRAInforCarList
                                driverCars={driverCars}
                                onGetCar={handleGetCar}
                                currentSelectedCarId={tripInformation.carId}
                            />
                            <div className="mt-1"></div>
                            <HRAButtons
                                onClickAccept={handleClickAccept}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
export default HRApprovalPage;