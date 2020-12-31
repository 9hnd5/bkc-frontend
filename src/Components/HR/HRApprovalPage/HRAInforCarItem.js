import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { saveDataApproveBkc, toggleIsDataApproveValid } from "../../../ActionCreators/hrActionCreators"
import Tooltip from '../../../Components/Commos/Tooltip';
import { NOT_EMPTY, validation } from "../../../Helpers/validation";

export const HRAInforCarItem = (props) => {
    
    const { driverCar, bookingInfor } = props;
    const [error, setError] = useState({
        pickCar: ""
    });
    const dispatch = useDispatch();
    function handleChange(e) {
        let validateResult = validation(e.target.value, [NOT_EMPTY]);
        if (!validateResult) {
            const data = {
                carId: e.target.value,
                BookerId: bookingInfor.bookerId,
                bookingDate: bookingInfor.pickupTime
            }
            setError({pickCar: ""});
            dispatch(toggleIsDataApproveValid(true));
            dispatch(saveDataApproveBkc(data));
        }
        else setError({pickCar: validateResult});
    }
    return (
        <tr>
            <td>{driverCar.driverName}</td>
            <td>{driverCar.driverPhone}</td>
            <td>{driverCar.carNumber}</td>
            <td>{driverCar.carTotalSeat}</td>
            <td>{driverCar.carAvailableSeat}</td>
            <td>{driverCar.carStatus}</td>
            <td>{driverCar.carBookingDate}</td>

            <td>
                {/* <button onClick={handleClick} className="btn btn-success">CHỌN XE</button> */}
                {/* <div className="custom-control custom-radio">
                    <input type="radio" name="customRadio" className="custom-control-input" />
                    <label className="custom-control-label">Chọn Xe</label>
                </div> */}
                <Tooltip content={error.pickCar} active={error.pickCar}>
                    <input onChange={handleChange} type="radio" name="pickCar" value={driverCar.carId} />
                </Tooltip>
            </td>
        </tr>
    );
}