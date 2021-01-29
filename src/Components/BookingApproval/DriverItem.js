import { isEmpty } from "lodash";
import { Fragment, useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { setNoteForDriver, setSelectedCar } from "../../ActionCreators/bookingApprovalActionCreator";
import formatPhoneNumber from "../../Helpers/formatPhoneNumber";
import remove from 'lodash/remove';

export const DriverItem = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { driver, no } = props;
    const ticket = useSelector(state => state.bookingApprovalReducer.ticket)
    const ticketCars = useSelector(state => state.bookingApprovalReducer.ticketCars);
    const noteForDriver = useSelector(state => state.bookingApprovalReducer.noteForDriver);
    function handleCheckedCar(e) {
        if (e.target.name === "moveCar") {
            props.onHandleCheckedMoveCar(driver.car.id);
        }else{
            props.onHandleCheckReturnCar(driver.car.id);
        }
        const car = {
            type: e.target.name,
            ...driver.car
        }
        dispatch(setSelectedCar(car));
    }
    function handleChangeNoteForDriverchange(e) {
        dispatch(setNoteForDriver(e.target.value));
    }
    useEffect(() => {
       
    }, [ticketCars])
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
                        type="radio"
                        name="moveCar"
                        onChange={handleCheckedCar}
                        value={driver.car.id}
                        checked={props.moveCarId === driver.car.id}

                    />
                </td>
                <td data-label={t("chonxengayve")}>
                    <input
                        type="radio"
                        name="returnCar"
                        onChange={handleCheckedCar}
                        value={driver.car.id}
                        checked={props.returnCarId===driver.car.id}
                    />
                </td>
                <td data-label={t("ghichuchotaixe")}>
                    <input
                        type="text"
                        name="noteForDriver" type="text"
                        onChange={handleChangeNoteForDriverchange}
                        value={noteForDriver}
                        className="form-control form-control-sm"
                        autoComplete="off"
                    />
                </td>
            </tr>
        </Fragment>
    );
}