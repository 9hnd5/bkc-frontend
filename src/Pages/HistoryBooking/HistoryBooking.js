import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchBookerBkInforBkDetail } from "../../ActionCreators/appActionCreators";
import { HistoryBookingContainer } from "../../Components/HistoryComponent/HistoryBookingContainer"

export const HistoryBooking = () => {
    const dispatch = useDispatch();
    const employee = useSelector(state => state.app.employee);
    useEffect(() => {
        dispatch(fetchBookerBkInforBkDetail(employee.buId));
    }, [])
    return (
        <div className="container-fluid">
            <div className="row d-flex justify-content-center">
                <div className="col-11 col-xl-11 ">
                    <HistoryBookingContainer />
                </div>
            </div>

        </div>
    )
}