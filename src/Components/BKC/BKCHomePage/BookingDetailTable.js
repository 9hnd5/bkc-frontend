import { useState } from "react";
import { useSelector } from "react-redux";
import { BookingDetailItem } from "./BookingDetailItem";
export const BookingDetailTable = (props) => {
    const bookingDetails = useSelector(state => state.bkc.bookingDetails);
    const displayBkcDetails = bookingDetails.map((bookDetail, index) => {
        return <BookingDetailItem bookDetail={bookDetail} key={index} />
    });
    return (
        <div className="row">
            <div className="col-12">
                <div className="table-responsive table_detail_responsive">
                    <table className="table table-sm table-striped table-bordered table_detail">
                        <thead>
                            <tr>
                                <th scope="col" className="w_4" >STT</th>
                                <th scope="col" className="w_12" >Nơi Đón</th>
                                <th scope="col" className="w_12" >Giờ Đón</th>
                                <th scope="col" className="w_12" >Tên NViên</th>
                                <th scope="col" className="w_12" >Tên Khách</th>
                                <th scope="col" className="w_12" >SĐT</th>
                                <th scope="col" className="w_12" >Ghi Chú</th>
                                <th scope="col" className="w_12" >Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayBkcDetails}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}