import { useSelector } from "react-redux";
import { HRRequestItem } from "./HRRequestItem"
export const HRRequestList = () => {
    const bkcInfors = useSelector(state => state.hr.bkcInfors);
    const displaybkcInfors = bkcInfors.map((bkcInfor, index) => {
        return <HRRequestItem key={index} bkcInfor={bkcInfor} />
    });
    return (
        <div className="card">
            <div className="card-body">
                <h5>Danh Sách Yêu Cầu Đặt Xe</h5>
                <div className="table-responsive hr_table_request" style={{ height: "300px" }}>
                    <table className="table table-sm table-bordered table-striped table-hover">
                        <thead>
                            <tr>
                                <th>STT</th>
                                <th>Status</th>
                                <th>Tên</th>
                                <th>Tuyến Đường</th>
                                <th>Ngày Xuất Phát</th>
                                <th>Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displaybkcInfors}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
