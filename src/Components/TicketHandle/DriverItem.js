import 'react-responsive-modal/styles.css';
import Modal from 'react-responsive-modal';
import { Fragment, useEffect, useState } from "react"
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { setNoteForDriver, setSelectedCar } from "../../ActionCreators/ticketHandleActionCreator";
import formatPhoneNumber from "../../Helpers/formatPhoneNumber";
import { CAR_STATUS, END_POINT, HTTP_METHOD } from "../../Constants/CommonsConstants";
import { callApi } from '../../Helpers/callApi';
import { notification, NOTIFICATION_TYPE } from '../../Helpers/notification';
import { isEmpty } from 'lodash';

export const DriverItem = (props) => {
    const { t } = useTranslation();
    const dispatch = useDispatch();
    const { driver, no } = props;
    const [carStatus, setCarStatus] = useState("");
    const driversWasBooked = useSelector(state => state.ticketHandleReducer.driversWasBooked);
    const ticketCars = useSelector(state => state.ticketHandleReducer.ticketCars);
    const [ticketByCarIds, setTicketByCarIds] = useState([]);
    const [isDisabledSelectedReturnCar, setIsDisabledSelectedReturnCar] = useState(false);
    const ticket = useSelector(state => state.ticketHandleReducer.ticket);
    const displayTicketByCaIds = ticketByCarIds && ticketByCarIds.map((ticket, index) => {
        return <tr
            key={index}
        >
            <td>{index + 1}</td>
            <td>{ticket.employeeName}</td>
            <td>{ticket.employeePhone}</td>
            <td>{ticket.startDate}</td>
            <td>{ticket.endDate}</td>
            <td>{ticket.fromLocation}</td>
            <td>{ticket.toLocation}</td>
        </tr>
    })
    const noteForDriver = useSelector(state => state.ticketHandleReducer.noteForDriver);
    const [isOpenModal, setIsOpenModal] = useState(false);
    function handleCheckedCar(e) {
        if (e.target.name === "MOVE_CAR") {
            props.onHandleCheckedMoveCar(driver.car.id);
        } else {
            props.onHandleCheckReturnCar(driver.car.id);
        }
        const car = {
            type: e.target.name,
            ...driver.car
        }
        dispatch(setSelectedCar(car));
    }
    function handleChangeNoteForDriverchange(e) {
        const data = {
            driverId: driver.id,
            message: e.target.value
        }
        dispatch(setNoteForDriver(data));
    }
    async function handleCheckStatus() {
        const res = await callApi(`${END_POINT}/cars/${driver.car.id}/tickets`, HTTP_METHOD.GET, null);
        if (res.status !== 200) {
            return notification(NOTIFICATION_TYPE.ERROR, "Load ticket by car id fail");
        }
        const ticketByCarIds = res.data;
        setTicketByCarIds(ticketByCarIds);
        setIsOpenModal(!isOpenModal);
    }
    function handleCloseModal() {
        setIsOpenModal(!isOpenModal);
    }
    useEffect(() => {
        const index1 = ticketCars.findIndex(ticketCar => {
            if (ticketCar.type === "MOVE_CAR" && +ticketCar.carId === +driver.car.id) return true;
            return false;
        });
        const index2 = ticketCars.findIndex(ticketCar => {
            if (ticketCar.type === "RETURN_CAR" && +ticketCar.carId === +driver.car.id) return true;
            return false;
        });
        if (index1 >= 0) props.onHandleCheckedMoveCar(driver.car.id);
        if (index2 >= 0) props.onHandleCheckReturnCar(driver.car.id);
    }, [ticketCars])
    useEffect(() => {
        const isBooked = driversWasBooked.some(item => {
            return +item.car.id === +driver.car.id;
        });
        if (isBooked) {
            setCarStatus(CAR_STATUS.BOOKED);
        } else {
            setCarStatus(CAR_STATUS.FREE);
        }
    }, [driversWasBooked])
    useEffect(() => {
        if (isEmpty(ticket && ticket.endDate)) {
            setIsDisabledSelectedReturnCar(true);
        } else {
            setIsDisabledSelectedReturnCar(false);
        }
    }, [ticket])
    return (
        <Fragment>
            <tr>
                <td data-label={t("stt")}>{no}</td>
                <td data-label={t("tentaixe")}>{driver.employeeName}</td>
                <td data-label={t("sodienthoaitaixe")}>{formatPhoneNumber(driver.employeePhone)}</td>
                <td data-label={t("biensoxe")}>{driver.car.number}</td>
                <td data-label={t("socho")}>{driver.car.totalSeat}</td>
                <td onClick={handleCheckStatus} data-label={t("trangthai")}>{carStatus}</td>
                <td data-label={t("chonxengaydi")}>
                    <input
                        type="radio"
                        name="MOVE_CAR"
                        onChange={handleCheckedCar}
                        value={driver.car.id}
                        checked={props.moveCarId === driver.car.id}
                    />
                </td>
                <td data-label={t("chonxengayve")}>
                    <input
                        type="radio"
                        name="RETURN_CAR"
                        onChange={handleCheckedCar}
                        value={driver.car.id}
                        checked={props.returnCarId === driver.car.id}
                        disabled={isDisabledSelectedReturnCar}
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
            <Modal
                open={isOpenModal}
                onClose={handleCloseModal}
                center
            >
                <div>
                    <h5>DANH SÁCH NGƯỜI ĐÃ ĐẶT XE</h5>
                    <table className="table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Tên</th>
                                <th>Số Điện Thoại</th>
                                <th>Ngày Đi</th>
                                <th>Ngày Về</th>
                                <th>Địa Điểm Đón</th>
                                <th>Địa Điểm Đến</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayTicketByCaIds}
                        </tbody>
                    </table>
                </div>
            </Modal>
        </Fragment>
    );
}