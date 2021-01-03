import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux"
import { fetchBookerBkInforBkDetail, savePageName } from "../../ActionCreators/appActionCreators";
import { HistoryBookingContainer } from "../../Components/HistoryComponent/HistoryBookingContainer"

export const HistoryBooking = () => {
    const dispatch = useDispatch();
    const employee = useSelector(state => state.app.employee);
    useEffect(() => {
        dispatch(fetchBookerBkInforBkDetail(employee.buId));
        dispatch(savePageName("HistoryBooking"));
    }, [])
    return (
        <div className="container-fluid">
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-xl-12 ">
                    <div className="card">
                        <div className="card-body">
                            <HistoryBookingContainer />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}