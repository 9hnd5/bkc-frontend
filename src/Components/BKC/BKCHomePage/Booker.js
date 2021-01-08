import { useSelector } from "react-redux";

export const Booker = () => {
    const employee = useSelector(state => state.app.employee);
    return (
        <div className="row">
            <div className="col-12 col-xl-12">
                <div className="card">
                    <div className="card-header">
                        <h4>THÔNG TIN NGƯỜI ĐẶT</h4>
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6 col-xl-3">
                                <label>Họ Và Tên: {employee.name}</label>
                            </div>
                            <div className="col-6 col-xl-6">
                                <label>Số Điện Thoại: {employee.phone}</label>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6 col-xl-3">
                                <label>Tên BU: {employee.buName}</label>
                            </div>
                            <div className="col-6 col-xl-6">
                                <label>Phòng Ban: {employee.department}</label>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6 col-xl-6">
                                <label>Người Quản Lý: {employee.lineManagerName}</label>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}