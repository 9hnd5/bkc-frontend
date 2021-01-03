import { useDispatch, useSelector } from "react-redux";
import { toggleBkcDetailModalInsert } from "../../../ActionCreators/bkcActionCreators";

export function BookingDetailBtn(props) {
    const dispatch = useDispatch();
    const bookingInfor = useSelector(state => state.bkc.bookingInfor);
    const bookingDetails = useSelector(state => state.bkc.bookingDetails);
    console.log("totalPerson", bookingInfor.totalPerson);
    console.log("length", bookingDetails.length);
    let isDisabled = null;
    if(bookingInfor.totalPerson == undefined || bookingDetails.length >= bookingInfor.totalPerson){
        isDisabled = true;
    }
    else isDisabled = false;
    function handleClick(){
        dispatch(toggleBkcDetailModalInsert());
    }
    return (
        <div className="row">
            <div className="col-4">
                <button disabled={isDisabled} onClick={handleClick} className="btn btn-outline-primary btn-sm">
                    <i className='fas fa-plus-square mr-1'></i>
                    THÊM NGƯỜI ĐI
                </button>

            </div>
        </div>
    );
}