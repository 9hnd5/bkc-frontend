import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { setPageName } from "../ActionCreators/appActionCreator";
import { fetchCar } from "../ActionCreators/carManagementActionCreator";
import { CarManagementContainer } from "../Components/CarManagement/CarManagementContainer"
import './CarManagement.scss';

export const CarManagement = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCar());
        dispatch(setPageName("CarManagement"));
    });
    return(
        <div className="container-fluid">
            <CarManagementContainer />
        </div>
    )
}