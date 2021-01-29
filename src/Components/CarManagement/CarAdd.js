import 'react-responsive-modal/styles.css';
import Modal from 'react-responsive-modal';
import { END_POINT, HTTP_METHOD } from './../../Constants/CommonsConstants';
import { useState } from 'react';
import { CAR_ADD_DEFAULT } from '../../Constants/CommonsConstants';
import { callApi } from '../../Helpers/callApi';
import { useDispatch } from 'react-redux';
import { addCarRequest } from '../../ActionCreators/carManagementActionCreator';
import { AutoComplete1 } from '../Commons/AutoComplete1';
import { useEffect } from 'react';
import { notification, NOTIFICATION_TYPE } from '../../Helpers/notification';
import { useTranslation } from 'react-i18next';
export const CarAdd = props => {
    const { t } = useTranslation();
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
                    <i className="fas fa-plus mr-1"></i>
                    {t("themxemoi")}
                </button>
                <div className="w-100"></div>
                <Modal
                    open={isOpenModal}
                    onClose={handleCloseModal}
                    center
                >
                    <div className="row">
                        <div className="col-6">
                            <label className="d-flex align-items-center">
                                <strong>{t("tenbu")}</strong>
                                <i className="fas fa-asterisk fa-xs mr-1 asterisk ml-1" />
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="d-flex align-items-center">
                                <strong>{t("vitrihientai")}</strong>
                                <i className="fas fa-asterisk fa-xs mr-1 asterisk ml-1" />
                            </label>
                        </div>
                        <div className="w-100"></div>
                        <div className="col-6">
                            <select className="custom-select custom-select-sm" name="buName" onChange={handleBuNameChange}>
                                <option value="">---{t("chonbu")}---</option>
                                {
                                    bus && bus.map((bu, index) => {
                                        return <option key={index} value={bu.id}>{bu.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="col-6">
                            <input autoComplete="off" name="currentLocation" className="form-control form-control-sm" onChange={handleChange} />
                        </div>
                        <div className="w-100"></div>
                        <div className="col-6">
                            <label className="d-flex align-items-center">
                                <strong>{t("biensoxe")}</strong>
                                <i className="fas fa-asterisk fa-xs mr-1 asterisk ml-1" />
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="d-flex align-items-center">
                                <strong>{t("socho")}</strong>
                                <i className="fas fa-asterisk fa-xs mr-1 asterisk ml-1" />
                            </label>
                        </div>
                        <div className="w-100"></div>
                        <div className="col-6">
                            <input autoComplete="off" name="number" className="form-control form-control-sm" onChange={handleChange} />
                        </div>
                        <div className="col-6">
                            <input autoComplete="off" type="number" name="totalSeat" className="form-control form-control-sm" onChange={handleChange} />
                        </div>
                        <div className="w-100"></div>
                        <div className="col-6">
                            <label className="d-flex align-items-center">
                                <strong>{t("hangxe")}</strong>
                                <i className="fas fa-asterisk fa-xs mr-1 asterisk ml-1" />
                            </label>
                        </div>
                        <div className="col-6">
                            <label className="d-flex align-items-center">
                                <strong>{t("tenxe")}</strong>
                                <i className="fas fa-asterisk fa-xs mr-1 asterisk ml-1" />
                            </label>
                        </div>
                        <div className="w-100"></div>
                        <div className="col-6">
                            <input autoComplete="off" name="manufactured" className="form-control form-control-sm" onChange={handleChange} />
                        </div>
                        <div className="col-6">
                            <input autoComplete="off" name="name" className="form-control form-control-sm" onChange={handleChange} />
                        </div>
                        <div className="w-100"></div>
                        <div className="col-12 mt-2">
                            <div className="btn-group">
                                <button onClick={handleClickAccepted} className="btn btn-outline-primary btn-sm mr-1">
                                    <i className="fas fa-check-circle mr-1"></i>
                                    {t("xacnhan")}
                                </button>
                                <button onClick={handleClickCancel} className="btn btn-outline-info btn-sm">
                                    <i className="fas fa-backspace mr-1"></i>
                                    {t("quaylai")}
                                </button>
                            </div>
                        </div>
                    </div>
                </Modal>
            </div>
        </div>
    )
}