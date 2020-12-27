import { useDispatch, useSelector } from "react-redux";
import { insertBkcRequest } from "../../../ActionCreators/bkcActionCreators";

export const MainBtn = (props) => {
    const dispatch = useDispatch();
    const booker = useSelector(state => state.bkc.booker);
    const bookDetails = useSelector(state => state.bkc.bookDetails);
    const bookInfor = useSelector(state => state.bkc.bookInfor);
    console.log("booker", booker);
    const data = {
        FullName: booker.employeeId,
        Phone: booker.phone,
        BusinessUnitId: booker.businessUnitId,
        BusinessUnitName: booker.businessUnitName,
        Department: booker.department,

        PickupTime: bookInfor.pickupTime,
        ReturnTime:bookInfor.returnTime,
        Location:bookInfor.location,
        Destination: bookInfor.destination,
        TotalPerson: bookInfor.totalPerson,

        Details: bookDetails

    }
    function handleClickSave(){
        dispatch(insertBkcRequest(data));
    }
    function handleClickCancel(){

    }
    return (
        <div className="row">
            <div className="col-12 col-xl-1">
                <button onClick={handleClickSave} className="btn btn-default btn-block">ĐỒNG Ý</button>
            </div>
            <div className="col-12 col-xl-1">
                <button onClick={handleClickCancel} className="btn btn-default btn-block">HỦY BỎ</button>
            </div>
        </div>
    );
}