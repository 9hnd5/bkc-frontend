import { useSelector } from "react-redux";

export const HRAInformation = (props) => {
    const { id } = props;
    const bkcInfors = useSelector(state => state.hr.bkcInfors);
    let bkcDetails = useSelector(state => state.hr.bkcDetails).filter((bkcDetail) => {
        return bkcDetail.idBook == id;
    });
    let bkcInfor = null;
    if (id) {
        bkcInfor = bkcInfors.find(bkcInfor => {
            return bkcInfor.id == id
        });

    }
    const displayBkcDetails = bkcDetails.map((bkcDetail, index) => {
        return (
            <tr key={index}>
                <td>{index + 1}</td>
                <td>{bkcDetail.pickupLocation}</td>
                <td>{bkcDetail.employeeName}</td>
                <td>{bkcDetail.guestName}</td>
                <td>{bkcDetail.arriveTime}</td>
                <td>{bkcDetail.phone}</td>
                <td>{bkcDetail.note}</td>
            </tr>
        );
    });
    return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <h5>Thông Tin Người Đặt</h5>
                        <div className="row">
                            <div className="col-6">
                                <label>Tên</label>
                            </div>
                            <div className="col-6">
                                <label>Số Điện Thoại</label>
                            </div>
                            <div className='w-100'></div>
                            <div className="col-6">
                                <textarea defaultValue={bkcInfor.name} readOnly className="form-control" />
                            </div>
                            <div className="col-6">
                                <textarea defaultValue={bkcInfor.phone} readOnly className="form-control" />
                            </div>
                            <div className='w-100'></div>
                            <div className="col-6">
                                <label>Thời Gian Đón</label>
                            </div>
                            <div className="col-6">
                                <label>Thời Gian Về</label>
                            </div>
                            <div className='w-100'></div>
                            <div className="col-6">
                                <textarea defaultValue={bkcInfor.pickupTime} readOnly className="form-control" />
                            </div>
                            <div className="col-6">
                                <textarea defaultValue={bkcInfor.returnTime} readOnly className="form-control" />
                            </div>
                            <div className='w-100'></div>
                            <div className="col-6">
                                <label>Địa Điểm Đón</label>
                            </div>
                            <div className="col-6">
                                <label>Địa Điểm Đến</label>
                            </div>
                            <div className='w-100'></div>
                            <div className="col-6">
                                <textarea readOnly defaultValue={bkcInfor.pickupLocation} className="form-control"></textarea>
                            </div>
                            <div className="col-6">
                                <textarea readOnly defaultValue={bkcInfor.arriveLocation} className="form-control"></textarea>
                            </div>
                            <div className='w-100'></div>
                            <div className="col-6">
                                <label>Số Người Đi</label>
                            </div>
                            <div className='w-100'></div>
                            <div className="col-6">
                                <textarea defaultValue={bkcInfor.totalPersonInCar} readOnly className="form-control" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="w-100"></div>
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <h5>Số Người Đi</h5>
                        <div className="table-responsive hra-table-detail">
                            <table className="table table-bordered table-striped table-sm">
                                <thead>
                                    <tr>
                                        <th>STT</th>
                                        <th>Nơi Đón</th>
                                        <th>Nhân Viên</th>
                                        <th>Khách</th>
                                        <th>Giờ Đến</th>
                                        <th>SDT</th>
                                        <th>Ghi Chú</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayBkcDetails}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}