import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { fetchDriversAndCars, fetchBkcInfors, fetchBkcDetails } from "../../ActionCreators/hrActionCreators";
import { HRRequestList } from "../../Components/HR/HRHomePage/HRRequestList";
import "./HRHomePage.scss";
function HRHomePage() {
    const dispatch = useDispatch();
    useEffect(() => {
        // dispatch(fetchDriversAndCars());
        // dispatch(fetchBkcInfors());
        // dispatch(fetchBkcDetails());
    });
    return (
        <div className="container-fluid">
            <div className="row d-flex justify-content-center">
                <div className="col-xs-12 col-xl-10">
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
export default HRHomePage;