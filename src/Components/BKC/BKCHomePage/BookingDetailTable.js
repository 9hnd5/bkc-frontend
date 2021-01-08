import { useState } from "react";
import { useSelector } from "react-redux";
import { BKCHome } from "../../../Pages/BKCPage/BKCHome";
import { BookingDetailItem } from "./BookingDetailItem";
import { ModalInsertBookDetail } from "./ModalInsertBookDetail";
export const BookingDetailTable = (props) => {
    // const bookingDetails = useSelector(state => state.bkc.bookingDetails);
    const [bookingDetails, setBookingDetails] = useState([]);
    const displayBkcDetails = bookingDetails.map((bookingDetail, index) => {
        return <BookingDetailItem
            bookingDetail={bookingDetail}
            key={index}
            onSaveUpdate={handleModalSaveUpdate}
            onDelete={handleDeleteBookingDetail}
        />
    });
    function handleModalSave(bookingDetail) {
        bookingDetail.stt = bookingDetails.length + 1;
        const temp = [...bookingDetails, bookingDetail];
        setBookingDetails(temp);
    }
    function handleModalSaveUpdate(bookingDetail) {
        const index = bookingDetails.findIndex((bkd) => {
            return bkd.stt === bookingDetail.stt;
        });
        if (index > -1) {
            const newBookingDetails = [...bookingDetails];
            newBookingDetails[index] = bookingDetail;
            setBookingDetails(newBookingDetails)
        }
    }
    function handleDeleteBookingDetail(bookingDetail) {
        const index = bookingDetails.findIndex((bkd) => {
            return bkd.stt === bookingDetail.stt;
        });
        if (index > -1) {
            const newBookingDetails = [...bookingDetails];
            newBookingDetails.splice(index, 1);
            for(let i = 0; i < newBookingDetails.length; i++){
                newBookingDetails[i].stt = i + 1;
            }
            setBookingDetails(newBookingDetails);
        }
    }
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
                <ModalInsertBookDetail onSave={handleModalSave} />
            </div>
        </div>
    );
}