import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { LocationItemReadOnly } from "./LocationItemReadOnly";

export const LocationTableReadOnly = () => {
    const { ticketId } = useParams();
    const ticket = useSelector(state => state.adminReducer.ticketRequests).find(ticket => {
        return +ticket.id === +ticketId;
    })
    // console.log("ticket", ticket);
    const displayLocations = ticket && ticket.locations && ticket.locations.map((locationItem, index) => {
        return <LocationItemReadOnly
            key={index}
            no={index + 1}
            locationItem={locationItem}
        />
    });
    return (
        <div className="row">
            <div className="col-12 col-xl-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6 col-xl-4">
                                <h5>Chi Tiết Nơi Đón</h5>
                            </div>
                        </div>
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
                                    {displayLocations}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}