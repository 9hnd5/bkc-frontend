import 'react-responsive-modal/styles.css';
import Modal from 'react-responsive-modal';
import { END_POINT, HTTP_METHOD } from './../../Constants/CommonsConstants';
import { useState } from 'react';
import { CAR_ADD_DEFAULT } from '../../Constants/CommonsConstants';
import { callApi } from '../../Helpers/callApi';
import { useDispatch } from 'react-redux';
import { addCarRequest } from '../../ActionCreators/carManagementActionCreator';
import { AutoComplete1 } from '../Commons/AutoComplete1';
import { useEffect } from 'react/cjs/react.development';
import { notification, NOTIFICATION_TYPE } from '../../Helpers/notification';
export const CarAdd = props => {
    const dispatch = useDispatch();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [errors, setErrors] = useState({});
    const [carAdd, setCarAdd] = useState({ ...CAR_ADD_DEFAULT });
    const [bus, setBus] = useState([]);
    console.log("carAdd", carAdd);
    function handleCloseModal() {
        setIsOpenModal(false);
        setCarAdd(CAR_ADD_DEFAULT)
    }

    function handleClickAddCar() {
        setIsOpenModal(true);
    }
    function handleChange(e) {
        setCarAdd({
            ...carAdd,
            [e.target.name]: e.target.value
        })
    }
    function handleBuNameChange(e) {
        const selectedBu = bus.find(bu => {
            return bu.id == e.target.value
        });
        if (selectedBu === undefined) return;

        setCarAdd({
            ...carAdd,
            buId: selectedBu.id,
            buName: selectedBu.name
        })
    }
    function handleClickAccepted() {
        dispatch(addCarRequest(carAdd));
        setIsOpenModal(false);
        setCarAdd(CAR_ADD_DEFAULT)
    }
    function handleClickCancel() {
        setIsOpenModal(false);
        setCarAdd(CAR_ADD_DEFAULT)
    }
    useEffect(() => {
        async function fetchBus() {
            const res = await callApi(`${END_POINT}/business-units`, HTTP_METHOD.GET, null);
            if (res.status !== 200) return notification(NOTIFICATION_TYPE.ERROR, "Load bu fail");
            const bus = res.data;
            setBus(bus);
        }
        fetchBus();
    }, []);
    return (
        <div className="row">
            <div className="col-12 col-xl-12">
                <button
                    onClick={handleClickAddCar}
                    className="btn btn-outline-primary btn-sm"
                >
                    Thêm Xe Mới
                </button>
                <div className="w-100"></div>
                <Modal
                    open={isOpenModal}
                    onClose={handleCloseModal}
                    center
                >
                    <div className="row">
                        <div className="col-6">
                            <label>Tên BU</label>
                        </div>
                        <div className="col-6">
                            <label>Vị Trí Hiện Tại</label>
                        </div>
                        <div className="w-100"></div>
                        <div className="col-6">
                            <select className="custom-select custom-select-sm" name="buName" onChange={handleBuNameChange}>
                                <option value="">---Chọn Bu---</option>
                                {
                                    bus && bus.map((bu, index) => {
                                        return <option key={index} value={bu.id}>{bu.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-6">
                            <input name="currentLocation" className="form-control form-control-sm" onChange={handleChange} />
                        </div>
                        <div className="w-100"></div>
                        <div className="col-6">
                            <label>Biển Số</label>
                        </div>
                        <div className="col-6">
                            <label>Số Chổ Ngồi</label>
                        </div>
                        <div className="w-100"></div>
                        <div className="col-6">
                            <input name="number" className="form-control form-control-sm" onChange={handleChange} />
                        </div>
                        <div className="col-6">
                            <input type="number" name="totalSeat" className="form-control form-control-sm" onChange={handleChange} />
                        </div>
                        <div className="w-100"></div>
                        <div className="col-6">
                            <label>Hãng Xe</label>
                        </div>
                        <div className="col-6">
                            <label>Tên Xe</label>
                        </div>
                        <div className="w-100"></div>
                        <div className="col-6">
                            <input name="manufactured" className="form-control form-control-sm" onChange={handleChange} />
                        </div>
                        <div className="col-6">
                            <input name="name" className="form-control form-control-sm" onChange={handleChange} />
                        </div>
                        <div className="w-100"></div>
                        <div className="col-12 mt-2">
                            <div className="btn-group">
                                <button onClick={handleClickAccepted} className="btn btn-outline-primary btn-sm">Xác Nhận</button>
                                <button onClick={handleClickCancel} className="btn btn-outline-danger btn-sm">Hủy Bỏ</button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}