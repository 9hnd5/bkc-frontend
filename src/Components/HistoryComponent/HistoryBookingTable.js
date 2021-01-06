import { useSelector } from "react-redux"

export const HistoryBookingTable = () => {
    const bookerBkInforBkDetails = useSelector(state => state.app.bookerBkInforBkDetails);
    const employee = useSelector(state => state.app.employee);
    const bookerBkInforBkDetail = bookerBkInforBkDetails.filter((item) => {
        return item.booker.employeeId === employee.id;
    });
    const display = bookerBkInforBkDetail.map((item, index) => {
        let status = null;
        if (item.booker.status === "Success") status = "Đã Được Duyệt";
        else if (item.booker.status === "Waiting") status = "Đang Đợi Duyệt";
        else status = "Từ Chối";
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{item.bookingInfor.pickupTime}</td>
                <td>{item.bookingInfor.returnTime}</td>
                <td>{item.bookingInfor.location}</td>
                <td>{item.bookingInfor.destination}</td>
                <td>{item.bookingInfor.totalPerson}</td>
                <td>{status}</td>
            </tr>
        );
    })
    return (
        <div className="table-responsive" style={{ height: "500px" }}>
            <table className="table table-hover table-sm table-striped table-bordered">
                <thead>
                    <tr>
                        <th>STT</th>
                        <th>Ngày Đi</th>
                        <th>Ngày Về</th>
                        <th>Địa Điểm Đón</th>
                        <th>Địa Điểm Đến</th>
                        <th>Số Người Đi</th>
                        <th>Trạng Thái</th>
                    </tr>
                </thead>
                <tbody>
                    {display}
                </tbody>
            </table>
        </div>
    )
}