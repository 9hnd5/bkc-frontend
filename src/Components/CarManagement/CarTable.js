import { useSelector } from "react-redux"
import { CarItem } from "./CarItem";

export const CarTable = () => {
    const cars = useSelector(state => state.carManagementReducer.cars);
    console.log("cars", cars);
    const displayCar = cars && cars.map((car, index) => {
        return <CarItem
            key={index}
            no={index + 1}
            car={car}
        />
    });
    return (
        <div className="row">
            <div className="col-12 col-xl-12">
                <div className="card">
                    <div className="card-header">
                        <h6>Danh Sách Xe</h6>
                    </div>
                    <div className="card-body">
                        <div className="table-responsive car-table-responsive">
                            <table className="table table-sm table-hover table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Tên Bu</th>
                                        <th>Vị Trí Hiện Tại</th>
                                        <th>Biển Số</th>
                                        <th>Số Chổ Ngồi</th>
                                        <th>Hãng Xe</th>
                                        <th>Tên Xe</th>
                                        <th>Hành Động</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayCar}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}