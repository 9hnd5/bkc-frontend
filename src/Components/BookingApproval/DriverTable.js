import { useSelector } from "react-redux";
import { DriverItem } from "./DriverItem";

export const DriverTable = () => {
    const drivers = useSelector(state => state.adminReducer.drivers);
    const displayDriver = drivers && drivers.map((driver, index) => {
        return <DriverItem
            key={index}
            no={index + 1}
            driver={driver}
        />
    });
    return (
        <div className="row">
            <div className="col-12 col-xl-12">
                <div className="card">
                    <div className="card-body">
                        <div className="table-responsive">
                            <table className="table table-sm table-bordered table-striped hra-table-car">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên TX</th>
                                        <th>SDT TX</th>
                                        <th>Biển Số</th>
                                        <th>Số Chổ</th>
                                        <th>Trạng Thái</th>
                                        <th>Chọn Xe Ngày Đi</th>
                                        <th>Chọn Xe Ngày Về</th>
                                        <th>Ghi Chú Cho Tài Xế</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayDriver}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}