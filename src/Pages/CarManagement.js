import { useEffect } from "react"
import { useDispatch } from "react-redux";
import { fetchCar } from "../ActionCreators/carManagementActionCreator";
import { CarManagementContainer } from "../Components/CarManagement/CarManagementContainer"
import './CarManagement.scss';

export const CarManagement = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchCar());
    });
    return(
        <div className="container-fluid">
            <CarManagementContainer />
        </div>
    )
}