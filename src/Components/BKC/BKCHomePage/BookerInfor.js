import { useSelector } from "react-redux";

export const BookerInfor = () => {
    const booker = useSelector(state => state.bkc.booker);
    return (
        <div className="row">
            <div className="col-12 col-xl-12">
                <div className="card">
                    <div className="card-header">
                        THÔNG TIN NGƯỜI ĐẶT
                </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6 col-xl-2">
                                <label>Họ Và Tên:{booker.employeeName}</label>
                            </div>
                            <div className="col-6 col-xl-2">
                                <label>Số Điện Thoại: {booker.phone}</label>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6 col-xl-2">
                                <label>Tên BU: {booker.businessUnitName}</label>
                            </div>
                            <div className="col-6 col-xl-2">
                                <label>Phòng Ban: {booker.department}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}