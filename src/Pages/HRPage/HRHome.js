import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookerBkInforBkDetail, savePageName } from "../../ActionCreators/appActionCreators";
import { HRRequestList } from "../../Components/HR/HRHomePage/HRRequestList";
import "./HRHomePage.scss";
export const HRHome = () => {
    const dispatch = useDispatch();
    const employee = useSelector(state => state.app.employee);
    useEffect(() => {
        dispatch(fetchBookerBkInforBkDetail(employee.buId));
        dispatch(savePageName("Admin"));
    });
    return (
        <div className="container-fluid">
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-xl-12">
                    <div className="card">
                        <div className="card-body">
                            <HRRequestList />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}