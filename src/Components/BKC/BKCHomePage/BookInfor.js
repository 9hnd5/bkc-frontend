import { useDispatch, useSelector } from "react-redux";
import { insertBookInfor } from "../../../ActionCreators/bkcActionCreators";

export const BookInfor = (props) => {
    const dispatch = useDispatch();
    const bookInfor = useSelector(state => state.bkc.bookInfor);
    function handleChange(e) {
        dispatch(insertBookInfor(e));
    }
    return (
        <div className="row bkc_form">
            <div className="col-12 col-xl-12">
                <div className="card">
                    <div className="card-header">
                        CHI TIẾT ĐẶT XE
                    </div>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6 col-xl-4">
                                <label>Thời Gian Đón</label>
                            </div>
                            <div className="col-6 col-xl-4">
                                <label>Thời Gian Về</label>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6 col-xl-4">
                                <input
                                    onChange={handleChange}
                                    className="form-control"
                                    name="pickupTime"
                                    value={bookInfor.pickupTime}
                                />
                            </div>
                            <div className="col-6 col-xl-4">
                                <input
                                    onChange={handleChange}
                                    className="form-control"
                                    name="returnTime"
                                    value={bookInfor.returnTime}
                                />
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6 col-xl-4">
                                <label>Địa Điểm Đón</label>
                            </div>
                            <div className="col-6 col-xl-4">
                                <label>Địa Điểm Đến</label>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6 col-xl-4">
                                <input onChange={handleChange}
                                    className="form-control"
                                    name="location"
                                    value={bookInfor.location}
                                />
                            </div>
                            <div className="col-6 col-xl-4">
                                <input onChange={handleChange}
                                    className="form-control"
                                    name="destination"
                                    value={bookInfor.destination}
                                />
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6 col-xl-4">
                                <label>Số Người Đi</label>
                            </div>
                            <div className="col-6 col-xl-4">
                                <label>CC Người Liên Quan</label>
                            </div>
                            <div className="w-100"></div>
                            <div className="col-6 col-xl-4">
                                <input
                                    onChange={handleChange}
                                    className="form-control"
                                    name="totalPerson"
                                    value={bookInfor.totalPerson}
                                />
                            </div>
                            <div className="col-6 col-xl-4">
                                <input
                                    onChange={handleChange}
                                    className="form-control"
                                    name="ccPersons"
                                    value={bookInfor.ccPersons}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}