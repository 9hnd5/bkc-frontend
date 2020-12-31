import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchDriverCars } from "../../../ActionCreators/hrActionCreators";
import { HRAInforCarItem } from "./HRAInforCarItem"

export const HRAInforCarList = (props) => {
    const dispatch = useDispatch();
    const employee = useSelector(state => state.app.employee);
    const { inforId } = props;
    const bookerBkInforBkDetail = useSelector(state => state.app.bookerBkInforBkDetails).find(ifd => {
        return ifd.booker.id == inforId;
    });
    const { bookingInfor } = bookerBkInforBkDetail;
    const driverCars = useSelector(state => state.hr.driverCars);
    console.log("driverCars", driverCars);
    const displayCarDrivers = driverCars.map((driverCar, index) => {
        return <HRAInforCarItem key={index} driverCar={driverCar} bookingInfor={bookingInfor} />
    });
    useEffect(() => {
        dispatch(fetchDriverCars(employee.buId));
    }, []);
    return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-header">
                        <h4>THÔNG TIN XE VÀ TÀI XẾ</h4>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-sm table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Tên TX</th>
                                        <th>SDT TX</th>
                                        <th>Biển Số</th>
                                        <th>Số Chổ</th>
                                        <th>Còn Trống</th>
                                        <th>Trạng Thái</th>
                                        <th>Ngày Đặt</th>
                                        <th>Chọn Xe</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayCarDrivers}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}