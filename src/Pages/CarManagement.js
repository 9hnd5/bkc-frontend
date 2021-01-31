import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux";
import { setPageName } from "../ActionCreators/appActionCreator";
import { fetchAllCarByBuId } from "../ActionCreators/carManagementActionCreator";
import { CarManagementContainer } from "../Components/CarManagement/CarManagementContainer"
import './CarManagement.scss';

export const CarManagement = () => {
    const dispatch = useDispatch();
    const employee = useSelector(state => state.appReducer.employee);
    useEffect(() => {
        dispatch(fetchAllCarByBuId(employee.buId));
        dispatch(setPageName("CarManagement"));
    });
    return(
        <div className="container-fluid">
            <CarManagementContainer />
        </div>
    )
}