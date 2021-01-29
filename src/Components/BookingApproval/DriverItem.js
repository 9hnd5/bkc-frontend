import { isEmpty } from "lodash";
import { Fragment, useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setBookedTrips, setMoveCar, setNoteForDriver, setReturnCar, setTrips } from "../../ActionCreators/bookingApprovalActionCreator";
import formatPhoneNumber from "../../Helpers/formatPhoneNumber";

export const DriverItem = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { driver, no } = props;
    const [isSelectedMoveCar, setIsSelectedMoveCar] = useState(false);
    const [isSelectedReturnCar, setIsSelectedReturnCar] = useState(false);
    const { ticketId } = useParams();
    const [noteForDriverLocal, setNoteForDriverLocal] = useState("");
    const [moveCarLocal, setMoveCarLocal] = useState({});
    const [returnCarLocal, setReturnCarLocal] = useState({});
    const moveCar = useSelector(state => state.bookingApprovalReducer.moveCar);
    const returnCar = useSelector(state => state.bookingApprovalReducer.returnCar);
    const bookedTrips = useSelector(state => state.bookingApprovalReducer.bookedTrips)
    const trips = useSelector(state => state.bookingApprovalReducer.trips)
    const ticket = useSelector(state => state.adminReducer.ticketRequests).find(ticket => {
        return +ticket.id === +ticketId;
    });
    // console.log("driver", driver);
    // console.log("ticket", ticket);
    console.log("bookedTrips", bookedTrips);
    console.log("car Id, isSelectedMoveCar", driver.carId + ", " + isSelectedMoveCar);
    function handleMoveCarChange(e) {
        if (e.target.checked) {
            const index = trips && trips.findIndex(trip => +trip.carId === +driver.carId)
            if (index >= 0) {
                alert("Xe này đã được đặt");
            }
            setMoveCarLocal({
                ...moveCarLocal,
                driverId: driver.id,
                carId: driver.car.id
            })
            setIsSelectedMoveCar(!isSelectedMoveCar);
            return;
        }
        setMoveCarLocal({
            ...moveCarLocal,
            driverId: driver.id,
            carId: driver.car.id
        })
        setIsSelectedMoveCar(!isSelectedMoveCar);
        return;
    }
    function handleReturnCarChange(e) {
        if (e.target.checked) {
            const index = trips && trips.findIndex(trip => +trip.carId === +driver.carId)
            if (index >= 0) alert("Xe này đã được đặt");
            setReturnCarLocal({
                ...returnCarLocal,
                driverId: driver.id,
                carId: driver.car.id
            })
            return setIsSelectedReturnCar(!isSelectedReturnCar);
        }
        setReturnCarLocal({
            ...returnCarLocal,
            driverId: driver.id,
            carId: driver.car.id
        })
        setIsSelectedReturnCar(!isSelectedReturnCar);
    }
    function handleChangeNoteForDriverchange(e) {
        setNoteForDriverLocal(e.target.value);
    }
    useEffect(() => {
        if (isSelectedMoveCar) {
            dispatch(setMoveCar(moveCarLocal));
        } else {
            dispatch(setMoveCar({}));
        }
    }, [isSelectedMoveCar])
    useEffect(() => {
        if (isSelectedReturnCar) {
            dispatch(setReturnCar(returnCarLocal));
        } else {
            dispatch(setReturnCar({}));
        }
    }, [isSelectedReturnCar])
    useEffect(() => {
        dispatch(setNoteForDriver(noteForDriverLocal));
    }, [noteForDriverLocal])
    useEffect(() => {
        const filterTrips = bookedTrips && bookedTrips.filter(trip => +trip.carId === +driver.carId);
        if (!isEmpty(filterTrips)) {
            filterTrips.forEach(trip => {
                if (trip.type === "MOVE") {
                    setIsSelectedMoveCar(!isSelectedMoveCar);
                    setMoveCarLocal({
                        ...moveCarLocal,
                        driverId: driver.id,
                        carId: driver.car.id
                    })
                }
                if (trip.type === "RETURN") {
                    setIsSelectedReturnCar(!isSelectedReturnCar);
                    setReturnCarLocal({
                        ...returnCarLocal,
                        driverId: driver.id,
                        carId: driver.car.id
                    })
                }
            })
        }
        else {
            setIsSelectedMoveCar(false);
            setIsSelectedReturnCar(false);
        }
    }, [bookedTrips])
    return (
        <Fragment>
            <tr>
                <td data-label={t("stt")}>{no}</td>
                <td data-label={t("tentaixe")}>{driver.employeeName}</td>
                <td data-label={t("sodienthoaitaixe")}>{formatPhoneNumber(driver.employeePhone)}</td>
                <td data-label={t("biensoxe")}>{driver.car.number}</td>
                <td data-label={t("socho")}>{driver.car.totalSeat}</td>
                <td data-label={t("trangthai")}>{""}</td>
                <td data-label={t("chonxengaydi")}>
                    <input
                        type="checkbox"
                        onChange={handleMoveCarChange}
                        checked={isSelectedMoveCar}
                    />
                </td>
                <td data-label={t("chonxengayve")}>
                    <input
                        type="checkbox"
                        onChange={handleReturnCarChange}
                        checked={isSelectedReturnCar}
                        disabled={isEmpty(ticket.endDate)}
                    />
                </td>
                <td data-label={t("ghichuchotaixe")}>
                    <input
                        value={noteForDriverLocal}
                        onChange={handleChangeNoteForDriverchange}
                        name="noteForDriverLocal" type="text"
                        className="form-control form-control-sm"
                        autoComplete="off"
                    />
                </td>
            </tr>
        </Fragment>
    );
}