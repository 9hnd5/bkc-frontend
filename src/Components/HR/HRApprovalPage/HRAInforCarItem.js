import { useState } from "react";
import { useDispatch } from "react-redux";
import { saveDataApproveBkc, toggleIsDataApproveValid } from "../../../ActionCreators/hrActionCreators"
import Tooltip from '../../../Components/Commos/Tooltip';
import { NOT_EMPTY, validation } from "../../../Helpers/validation";

export const HRAInforCarItem = (props) => {
    const { driverCar, bookingInfor, booker } = props;
    console.log("booker", booker);
    const [error, setError] = useState({
        pickCar: ""
    });
    const dispatch = useDispatch();
    function handleChange(e) {
        let validateResult = validation(e.target.value, [NOT_EMPTY]);
        if (!validateResult) {
            const data = {
                carId: e.target.value,
                bookerId: booker.id,
                bookerName: booker.employeeName,
                driverId: driverCar.driverId,
                driverName: driverCar.driverName,
                moveDate: bookingInfor.pickupTime,
                returnDate: bookingInfor.returnTime

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

            <td>
                <Tooltip content={error.pickCar} active={error.pickCar}>
                    <input onChange={handleChange} type="radio" name="pickCar" value={driverCar.carId} />
                </Tooltip>
            </td>
        </tr>
    );
}