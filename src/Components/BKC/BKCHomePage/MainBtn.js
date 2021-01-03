import { useDispatch, useSelector } from "react-redux";
import { requestSaveBookingCar } from "../../../ActionCreators/bkcActionCreators";
import { STATUS } from "../../../Constants/bkcConstants";
import { NotificationManager } from 'react-notifications'
import { toast, Zoom } from 'react-toastify';

export const MainBtn = (props) => {
    const dispatch = useDispatch();
    const employee = useSelector(state => state.app.employee);
    const bookingDetails = useSelector(state => state.bkc.bookingDetails);
    const bookingInfor = useSelector(state => state.bkc.bookingInfor);
    const isBkcInforValid = useSelector(state => state.bkc.isBkcInforValid);
    const isBkcDetailValid = useSelector(state => state.bkc.isBkcDetailValid);
    const isLoading = useSelector(state => state.bkc.isLoading);
    console.log("isLoading", isLoading);
    const disabled = (isLoading == false) && (isBkcInforValid && isBkcDetailValid) ? false : true
    console.log("disabled", disabled);
    const data = {
        employeeId: employee.id,
        employeeName: employee.name,
        Phone: employee.phone,
        buId: employee.buId,
        buName: employee.buName,
        department: employee.department,
        status: STATUS.WAITING,

        PickupTime: bookingInfor.pickupTime,
        ReturnTime: bookingInfor.returnTime,
        Location: bookingInfor.location,
        Destination: bookingInfor.destination,
        TotalPerson: bookingInfor.totalPerson,

        BookingDetailRequests: bookingDetails

    }
    function handleClickSave() {
        dispatch(requestSaveBookingCar(data));
        // NotificationManager.info("heheh", "success");
    }
    return (
        <div className="row">
            <div className="col-2">
                <button
                    onClick={handleClickSave}
                    className="btn btn-outline-primary btn-sm"
                    disabled={disabled}
                >
                    <i className="fas fa-paper-plane mr-1"></i>
                    GỬI YÊU CẦU
                </button>
            </div>
        </div>
    );
}