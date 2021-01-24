import 'react-responsive-modal/styles.css';
import Modal from 'react-responsive-modal';
import { useEffect, useState } from 'react';
import { AutoComplete1 } from '../Commons/AutoComplete1';
import { callApi } from '../../Helpers/callApi';
import { DRIVER_ADD_DEFAULT, END_POINT, HTTP_METHOD } from '../../Constants/CommonsConstants';
import { notification, NOTIFICATION_TYPE } from '../../Helpers/notification';
import { useDispatch } from 'react-redux';
import { addDriverRequest } from './../../ActionCreators/driverManagementActionCreator'
export const DriverAdd = props => {
    const dispatch = useDispatch();
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [suggestionDriverNames, setSuggestionDriverNames] = useState([]);
    const [cars, setCars] = useState([]);
    const [driverAdd, setDriverAdd] = useState({ ...DRIVER_ADD_DEFAULT })
    const [employees, setEmployees] = useState([]);
    console.log("driverAdd", driverAdd);
    // console.log("cars", cars);
    function handleClickAddDriver() {
        setIsOpenModal(true);
    }
    function handleCloseModal() {
        setIsOpenModal(false);
        setDriverAdd({ ...DRIVER_ADD_DEFAULT })
        setSuggestionDriverNames([])
    }
    function handleClick(suggestion) {
        const employee = employees.find(e => {
            return +e.id === +suggestion.id
        });
        setDriverAdd({
            ...driverAdd,
            employeeName: employee.name,
            employeeId: employee.id,
            employeePhone: employee.phone,
            employeeBuName: employee.buName,
            employeeBuId: employee.buId,
            employeeEmail: employee.email
        })
    }
    async function handleChange(e) {
        switch (e.target.name) {
            case "employeeName": {
                const name = e.target.value
                const res = await callApi(`${END_POINT}/employees/${name}`, HTTP_METHOD.GET, null);
                const employees = res.data;
                const suggestionDriverNames = employees && employees.map(e => {
                    return {
                        id: e.id,
                        content: e.name
                    }
                });
                setEmployees(employees);
                setSuggestionDriverNames(suggestionDriverNames);

            }
            default:
                break;
        }
        setDriverAdd({
            ...driverAdd,
            [e.target.name]: e.target.value
        })
    }
    function handleClickAccepted() {
        dispatch(addDriverRequest(driverAdd));
        setDriverAdd({ ...DRIVER_ADD_DEFAULT })
        setSuggestionDriverNames([])
        setIsOpenModal(false);
    }
    function handleClickCancel() {
        setDriverAdd({ ...DRIVER_ADD_DEFAULT })
        setSuggestionDriverNames([])
        setIsOpenModal(false);
    }
    function handleCarChange(e) {
        const car = cars.find(car => {
            return +car.id === +e.target.value
        });
        setDriverAdd({
            ...driverAdd,
            carId: e.target.value,
            car: car
        })
    }
    useEffect(() => {
        async function fetchCars() {
            const res = await callApi(`${END_POINT}/cars`, HTTP_METHOD.GET, null);
            if (res.status !== 200) return notification(NOTIFICATION_TYPE.ERROR, "Load car fail");
            const cars = res.data;
            setCars(cars);
        }
        fetchCars();
    }, []);
    return (
        <div className="row">
            <div className="col-12 col-xl-12">
                <button
                    onClick={handleClickAddDriver}
                    className="btn btn-outline-primary btn-sm"
                >
                    Thêm Tài Xế Mới
                </button>
                <Modal
                    open={isOpenModal}
                    onClose={handleCloseModal}
                    center
                >
                    <div className="row">
                        <div className="col-6">
                            <label>Tên Tài Xế</label>
                        </div>
                        <div className="col-6">
                            <label>Số Điện Thoại</label>
                        </div>
                        <div className="w-100"></div>
                        <div className="col-6">
                            <AutoComplete1
                                suggestions={suggestionDriverNames}
                                onChange={handleChange}
                                className="form-control form-control-sm"
                                onClick={handleClick}
                                name="employeeName"
                                initialValue=""
                            />
                        </div>
                        <div className="col-6">
                            <input value={driverAdd.employeePhone} name="employeePhone" className="form-control form-control-sm" onChange={handleChange} />
                        </div>
                        <div className="w-100"></div>
                        <div className="col-6">
                            <label>Tên BU</label>
                        </div>
                        <div className="col-6">
                            <label>Loại Xe</label>
                        </div>
                        <div className="w-100"></div>
                        <div className="col-6">
                            <input value={driverAdd.employeeBuName} name="employeeBuName" className="form-control form-control-sm" onChange={handleChange} />
                        </div>
                        <div className="col-6">
                            <select onChange={handleCarChange} value={driverAdd.carId} className="custom-select custom-select-sm">
                                <option value="">
                                    ---Chọn Xe---
                                </option>
                                {
                                    cars && cars.map((car, index) => {
                                        return <option key={index} value={car.id}>{car.number}</option>
                                    })
                                }
                            </select>
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