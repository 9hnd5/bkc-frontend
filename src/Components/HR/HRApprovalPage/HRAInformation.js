import { useSelector } from "react-redux";

export const HRAInformation = (props) => {
    const { inforId } = props;
    const bookerBkInforBkDetails = useSelector(state => state.app.bookerBkInforBkDetails);
    const bookerBkInforBkDetail = bookerBkInforBkDetails.find(item => {
        return item.booker.id === inforId;
    })
    const { booker, bookingDetails } = bookerBkInforBkDetail;
    const displayDetails = bookingDetails.map((bookingDetail, index) => {
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{bookingDetail.pickupLocation}</td>
                <td>{bookingDetail.pickupTime}</td>
                <td>{bookingDetail.employeeName}</td>
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
                        <h4>THÔNG TIN NGƯỜI ĐẶT XE</h4>
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
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-100 mt-1"></div>
            <div className="col-12">
                <div className="card">
                    {/* <div className="card-header">
                        <h4>THÔNG TIN NGƯỜI ĐI</h4>
                    </div> */}
                    <div className="card-body">
                        <div className="table-responsive hra-table-detail">
                            <table className="table table-bordered table-striped table-sm">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Nơi Đón</th>
                                        <th>Giờ Đón</th>
                                        <th>Nhân Viên</th>
                                        <th>Khách</th>
                                        <th>SDT</th>
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