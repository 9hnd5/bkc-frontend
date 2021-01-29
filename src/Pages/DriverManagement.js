import './DriverManagement.scss';
import { DriverManagementContainer } from './../Components/DriverManagement/DriverManagementContainer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDrivers } from '../ActionCreators/driverManagementActionCreator';
import { setPageName } from '../ActionCreators/appActionCreator';

export const DriverManagement = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchDrivers());
        dispatch(setPageName("DriverManagement"));
    });
    return (
        <div className="container-fluid">
            <DriverManagementContainer />
        </div>
    );
}