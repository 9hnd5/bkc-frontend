import { useSelector } from "react-redux";
import { useEffect, useState } from "react/cjs/react.development";
import { HTTP_METHOD, URL } from "../../../Constants/appConstants";
import { callApi } from "../../../Helpers/callApi";

export const HRAInformation = (props) => {
    const { booker, bookingInfor, bookingDetails } = props;
    
    const displayDetails = bookingDetails.map((bookingDetail, index) => {
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{bookingDetail.pickupLocation}</td>
                <td>{bookingDetail.pickupTime}</td>
                <td>
                    <div className="d-flex flex-wrap">

                        {
                            bookingDetail.employees.map(employee => {
                                return employee.name
                            }).join(", ")
                        }
                    </div>
                </td>
                <td>{bookingDetail.guestName}</td>
                <td>{bookingDetail.phone}</td>
                <td>{bookingDetail.noteByBooker}</td>
            </tr>
        );
    });
    
    return (
        <div className="row">
            <div className="col-12 col-xl-12">
                <div className="card">
                    <div className="card-header">
                        <h4>Thông Tin Người Đặt Xe</h4>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6 col-xl-3">
                                <label>Họ Và Tên: {booker.employeeName}</label>
                            </div>
                            <div className="col-6 col-xl-3">
                                <label>Số Điện Thoại: {booker.phone} </label>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6 col-xl-3">
                                <label>Tên BU: {booker.buName} </label>
                            </div>
                            <div className="col-6 col-xl-3">
                                <label>Phòng Ban: {booker.department}</label>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6 col-xl-3">
                                <label>Quản Lí: {booker.lineManagerName}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-100 mt-1"></div>
            <div className="col-12 col-xl-12">
                <div className="card">
                    <div className="card-header">
                        <h4>Thông Tin Đặt Xe</h4>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6 col-xl-3">
                                <label>Ngày Đi: {bookingInfor.moveDate}</label>
                            </div>
                            <div className="col-6 col-xl-3">
                                <label>Ngày Về: {bookingInfor.returnDate} </label>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6 col-xl-3">
                                <label>Địa Điểm Đón: {bookingInfor.location}</label>
                            </div>
                            <div className="col-6 col-xl-3">
                                <label>Địa Điểm Đến: {bookingInfor.destination} </label>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6 col-xl-3">
                                <label>Số Người Đi: {bookingInfor.totalPerson}</label>
                            </div>
                            <div className="col-6 col-xl-3">
                                <label>Lí Do Đặt Xe: {bookingInfor.reasonBooking}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-100 mt-1"></div>
            <div className="col-12">
                <div className="card">
                    <div className="card-header">
                        <h4>Thông Tin Nơi Đón</h4>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive hra-table-detail">
                            <table className="table table-bordered table-striped table-sm">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Địa Điểm Đón</th>
                                        <th>Giờ Đón</th>
                                        <th>Nhân Viên</th>
                                        <th>Khách</th>
                                        <th>Số Điện Thoại</th>
                                        <th>Ghi Chú</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayDetails}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}