function BKCFormInfor(props) {
    const { bkcFormInfor, onChange } = props;
    function handleChangeBkcFormInfor(e) {
        onChange(e);
    }
    return (
        <div className="row bkc_form">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <h5>Thông Tin Đặt Xe</h5>
                        <div className="row">
                            <div className="col-6">
                                <label>Họ Tên</label>
                            </div>
                            <div className="col-6">
                                <label>Số Điện Thoại</label>
                            </div>
                            <div className="col-6">

                                <input disabled defaultValue={bkcFormInfor.name} className="form-control" name="name" />
                            </div>
                            <div className="col-6">
                                <input disabled defaultValue={bkcFormInfor.phone} className="form-control" name="phone" />
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6">
                                <label>Thời Gian Đón</label>
                            </div>
                            <div className="col-6">
                                <label>Thời Gian Về</label>
                            </div>
                            <div className="col-6">
                                <input value={bkcFormInfor.pickupTime} onChange={handleChangeBkcFormInfor} className="form-control" name="pickupTime" />
                            </div>
                            <div className="col-6">
                                <input value={bkcFormInfor.returnTime} onChange={handleChangeBkcFormInfor} className="form-control" name="returnTime" />
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6">
                                <label>Địa Điểm Đón</label>
                            </div>
                            <div className="col-6">
                                <label>Địa Điểm Đến</label>
                            </div>
                            <div className="col-6">
                                <input value={bkcFormInfor.pickupLocation} onChange={handleChangeBkcFormInfor} className="form-control" name="pickupLocation" />
                            </div>
                            <div className="col-6">
                                <input value={bkcFormInfor.comeLocation} onChange={handleChangeBkcFormInfor} className="form-control" name="comeLocation" />
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6">
                                <label>Số Người Đi</label>
                            </div>
                            <div className="col-6">
                                <label>CC Người Liên Quan</label>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6">
                                <input value={bkcFormInfor.totalPersonInCar} onChange={handleChangeBkcFormInfor} className="form-control" name="totalPersonInCar" />
                            </div>
                            <div className="col-6">
                                <input value={bkcFormInfor.ccPersons} onChange={handleChangeBkcFormInfor} className="form-control" name="ccPersons" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default BKCFormInfor;