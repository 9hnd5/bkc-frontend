import { Fragment, useState } from "react"
import { useDispatch } from "react-redux";
import { setMoveCar, setReturnCar } from "../../ActionCreators/bookingApprovalActionCreator";

export const DriverItem = (props) => {
    const dispatch = useDispatch();
    const { driver, no } = props;
    const [isSelectedMoveCar, setIsSelectedMoveCar] = useState(false);
    const [isSelectedReturnCar, setIsSelectedReturnCar] = useState(false);
    console.log("driver", driver);
    function handleMoveCarChange(){
        const moveCar = {
            driverId: driver.id,
            carId: driver.car.id
        }
        dispatch(setMoveCar(moveCar))
        setIsSelectedMoveCar(!isSelectedMoveCar);
    }
    function handleReturnCarChange(){
        const returnCar = {
            driverId: driver.id,
            carId: driver.car.id
        }
        dispatch(setReturnCar(returnCar));
        setIsSelectedReturnCar(!isSelectedReturnCar);
    }
    return (
        <Fragment>
            <tr>
                <td>{no}</td>
                <td>{driver.employeeName}</td>
                <td>{driver.employeePhone}</td>
                <td>{driver.car.number}</td>
                <td>{driver.car.totalSeat}</td>
                <td>{ }</td>
                <td>
                    <input
                        type="checkbox"
                        onChange={handleMoveCarChange}
                        checked={isSelectedMoveCar}
                    />
                </td>
                <td>
                    <input
                        type="checkbox"
                        onChange={handleReturnCarChange}
                        checked={isSelectedReturnCar}
                    />
                </td>
                <td></td>
            </tr>
        </Fragment>
    );
}