import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBookerBkInforBkDetail } from "../../ActionCreators/appActionCreators";
import { HRRequestList } from "../../Components/HR/HRHomePage/HRRequestList";
import "./HRHomePage.scss";
export const HRHome = () => {
    const dispatch = useDispatch();
    const employee = useSelector(state => state.app.employee);
    useEffect(() => {
        dispatch(fetchBookerBkInforBkDetail(employee.buId));
    }, []);
    return (
        <div className="container-fluid">
            <div className="row d-flex justify-content-center">
                <div className="col-11 col-xl-11">
                    <div className="card">
                        <div className="card-body">
                            <div className="mt-4 mb-4"></div>
                            <HRRequestList />
                            <div className="mt-5 mb-5"></div>
                            <div className="mt-5 mb-5"></div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}