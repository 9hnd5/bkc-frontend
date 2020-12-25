import { useSelector } from "react-redux";
import { HRAInforCarItem } from "./HRAInforCarItem"

export const HRAInforCarList = (props) => {
    const cars = useSelector(state => state.hr.cars);
    const drivers = useSelector(state => state.hr.drivers);
    let carDrivers = []
    for (const driver of drivers) {
        for (const car of cars) {
            if (driver.driverId == car.driverId) {
                carDrivers.push({ ...driver, ...car });
                break;
            }
        }
    }
    const displayCarDrivers = carDrivers.map((carDriver, index) => {
        return <HRAInforCarItem key={index} carDriver={carDriver} />
    });
    return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <h5>THÔNG TIN XE VÀ TÀI XẾ</h5>
                        <div className="table-responsive">
                            <table className="table table-sm table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>Tên TX</th>
                                        <th>SDT TX</th>
                                        <th>Biển Số</th>
                                        <th>Số Chổ</th>
                                        <th>Trạng Thái</th>
                                        <th>Người Đặt</th>
                                        <th>Người Duyệt</th>
                                        <th>Ngày Đặt</th>
                                        <th>Hành Động</th>
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