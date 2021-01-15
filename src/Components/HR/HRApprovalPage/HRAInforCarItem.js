import 'react-responsive-modal/styles.css';
import Modal from 'react-responsive-modal';
import { Fragment, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Tooltip from '../../../Components/Commos/Tooltip';
import { NOT_EMPTY, validation } from "../../../Helpers/validation";
import { callApi } from '../../../Helpers/callApi';
import { URL } from '../../../Constants/appConstants';
import { notification, NOTIFICATION_TYPE } from '../../../Helpers/notification';

export const HRAInforCarItem = (props) => {
    const { driverCar } = props;
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [tripInformations, setTripInformations] = useState([]);
    const [error, setError] = useState({
        pickCar: ""
    });
    const [carId, setCarId] = useState("");
    const dispatch = useDispatch();
    function handleChange(e) {
        let validateResult = validation(e.target.value, [NOT_EMPTY]);
        if (!validateResult) {
            props.onGetCar(e.target.name, driverCar);
            props.onChange(e);
            setError({ pickCar: "" });
        }
        else setError({ pickCar: validateResult });
    }
    function handleCloseModal() {
        setIsOpenModal(false);
    }
    async function handleOpenModal() {
        const res = await callApi(`${URL}/trip-information/car/${driverCar.carId}`)
        if (res.status !== 200) {
            return notification(NOTIFICATION_TYPE.ERROR, "Không Có Người Đặt");
        }
        setTripInformations(res.data);
        setIsOpenModal(true);
    }
    return (
        <Fragment>
            <tr>
                <td>{props.index}</td>
                <td>{driverCar.driverName}</td>
                <td>{driverCar.driverPhone}</td>
                <td>{driverCar.carNumber}</td>
                <td>{driverCar.carTotalSeat}</td>
                <td onClick={handleOpenModal}>{driverCar.carStatus}</td>
                <td>
                    <Tooltip content={error.pickCar} active={error.pickCar}>
                        <input
                            onChange={handleChange}
                            type="radio" 
                            name="moveCar"
                            value={driverCar.carId}
                            checked={props.isSelectedMoveCarId === driverCar.carId}
                        />
                    </Tooltip>
                </td>
                <td>
                    <Tooltip content={error.pickCar} active={error.pickCar}>
                        <input
                            onChange={handleChange}
                            type="radio" 
                            name="returnCar"
                            value={driverCar.carId}
                            checked={props.isSelectedReturnCarId === driverCar.carId}
                        />
                    </Tooltip>
                </td>
            </tr>
            <Modal
                open={isOpenModal}
                center
                onClose={handleCloseModal}
            >
                <h4>Chi Tiết Người Đặt</h4>
                <div className="row">
                    <div className="col-12">
                        <div className="table-responsive">
                            <table className="table table-sm table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên Người Đặt</th>
                                        <th>Số Điện Thoại</th>
                                        <th>Tên BU</th>
                                        <th>Ngày Đi</th>
                                        <th>Ngày Về</th>
                                        <th>Số Người Đi</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        tripInformations.map((t, index) => {
                                            return <tr key={index}>
                                                <td>{index + 1}</td>
                                                <td>{t.bookerName}</td>
                                                <td>{t.bookerPhone}</td>
                                                <td>{t.buName}</td>
                                                <td>{t.moveDate}</td>
                                                <td>{t.returnDate}</td>
                                                <td>{t.totalPerson}</td>
                                            </tr>
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </Modal>
        </Fragment>
    );
}