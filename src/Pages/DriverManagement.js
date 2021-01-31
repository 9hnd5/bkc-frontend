import './DriverManagement.scss';
import { DriverManagementContainer } from './../Components/DriverManagement/DriverManagementContainer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCarsByBuId, fetchDriversByBuId, setCars, setDrivers } from '../ActionCreators/driverManagementActionCreator';
import { setPageName } from '../ActionCreators/appActionCreator';

export const DriverManagement = () => {
    const dispatch = useDispatch();
    const employee = useSelector(state => state.appReducer.employee)
    useEffect(() => {
        dispatch(fetchDriversByBuId(employee.buId));
        dispatch(fetchCarsByBuId(employee.buId));
        dispatch(setPageName("DriverManagement"));
        return () => {
            dispatch(setDrivers([]));
            dispatch(setCars([]));
        }
    }, []);
    return (
        <div className="container-fluid">
            <DriverManagementContainer />
        </div>
    );
}