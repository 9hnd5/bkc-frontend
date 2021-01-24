import './DriverManagement.scss';
import { DriverManagementContainer } from './../Components/DriverManagement/DriverManagementContainer';
import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchDrivers } from '../ActionCreators/driverManagementActionCreator';

export const DriverManagement = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchDrivers());
    });
    return (
        <div className="container-fluid">
            <DriverManagementContainer />
        </div>
    );
}