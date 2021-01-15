import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { HRAInforCarItem } from "./HRAInforCarItem";

export const HRAInforCarList = (props) => {
    const dispatch = useDispatch();
    const { driverCars } = props;
    const [isSelectedMoveCarId, setIsSelectedMoveCarId] = useState(false);
    const [isSelectedReturnCarId, setIsSelectedReturnCarId] = useState(false);
    const displayDriverCars = driverCars.map((item, index) => {
        return <HRAInforCarItem
            onGetCar={props.onGetCar}
            index={index + 1}
            key={index}
            driverCar={item}
            isSelectedMoveCarId={isSelectedMoveCarId}
            isSelectedReturnCarId={isSelectedReturnCarId}
            onChange={handleChangeCarSelected}
        />
    });
    function handleChangeCarSelected(e) {
        if (e.target.name == "moveCar") setIsSelectedMoveCarId(e.target.value);
        // else setIsSelectedMoveCarId(null);

        if (e.target.name == "returnCar") setIsSelectedReturnCarId(e.target.value);
        // else setIsSelectedReturnCarId(null);
    }
    // useEffect(() => {
    //     setIsSelectedCarId(props.currentSelectedCarId);
    // }, [props.currentSelectedCarId]);
    return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-header">
                        <h4>Thông Tin Xe Và Tài Xế</h4>
                    </div>
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
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayDriverCars}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}