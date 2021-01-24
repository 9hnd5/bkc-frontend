import { useSelector } from "react-redux"
import { DriverItem } from "./DriverItem";

export const DriverTable = () => {
    const drivers = useSelector(state => state.driverManagementReducer.drivers);
    console.log("drviers", drivers);
    const displayDriver = drivers&&drivers.map((driver, index) => {
        return <DriverItem
            key={index}
            no={index+1}
            driver={driver}
        />
    });
    return (
        <div className="row">
            <div className="col-12 col-xl-12">
                <div className="card">
                    <div className="card-header">
                        <h6>Danh Sách Tài Xế</h6>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive car-table-responsive">
                            <table className="table table-sm table-hover table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên Tài Xế</th>
                                        <th>Số Điện Thoại</th>
                                        <th>Tên Bu</th>
                                        <th>Xe Đang Lái</th>
                                        <th>Hành Động</th>
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
    )
}