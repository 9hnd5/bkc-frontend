import { useDispatch, useSelector } from "react-redux";
import { requestSaveBookingCar } from "../../../ActionCreators/bkcActionCreators";

export const MainBtn = (props) => {
    const dispatch = useDispatch();
    const employee = useSelector(state => state.app.employee);
    const bookingDetails = useSelector(state => state.bkc.bookingDetails);
    const bookingInfor = useSelector(state => state.bkc.bookingInfor);
    const isBkInforValid = useSelector(state => state.bkc.isBkInforValid);
    const isBkDetailValid = useSelector(state => state.bkc.isBkDetailValid);
    const data = {
        employeeId: employee.id,
        employeeName: employee.name,
        Phone: employee.phone,
        buId: employee.buId,
        buName: employee.buName,
        department: employee.department,
        status: "Waiting",

        PickupTime: bookingInfor.pickupTime,
        ReturnTime: bookingInfor.returnTime,
        Location: bookingInfor.location,
        Destination: bookingInfor.destination,
        TotalPerson: bookingInfor.totalPerson,

        BookingDetailRequests: bookingDetails

    }
    function handleClickSave() {
        dispatch(requestSaveBookingCar(data));
    }
    function handleClickCancel() {

    }
    return (
        <div className="row">
            <div className="col-2">
                <button
                    onClick={handleClickSave}
                    className="btn btn-outline-primary btn-sm"
                    disabled={isBkInforValid && isBkDetailValid ? false : true}
                >
                    <i className="fas fa-save mr-1"></i>
                    ĐỒNG Ý
                </button>
            </div>
        </div>
    );
}