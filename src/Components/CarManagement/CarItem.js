import { Fragment, useEffect, useState } from "react"
import { useDispatch } from "react-redux";
import { deleteCarRequest, updateCarRequest } from "../../ActionCreators/carManagementActionCreator";
import { CAR_ADD_DEFAULT, END_POINT, HTTP_METHOD } from "../../Constants/CommonsConstants";
import { callApi } from "../../Helpers/callApi";
import { notification, NOTIFICATION_TYPE } from "../../Helpers/notification";

export const CarItem = props => {
    const dispatch = useDispatch();
    const { no } = props;
    const [isUpdate, setIsUpdate] = useState(false);
    const [carItemLocal, setCarItemLocal] = useState({ ...CAR_ADD_DEFAULT });
    const [prevCarItemLocal, setPrevCarItemLocal] = useState({ ...CAR_ADD_DEFAULT });
    const [bus, setBus] = useState([]);
    console.log("carItem", carItemLocal);
    function handleClickUpdate() {
        setIsUpdate(true);
    }
    function handleClickDelete() {
        dispatch(deleteCarRequest(carItemLocal));
        setIsUpdate(false);
    }
    function handleClickAccepted() {
        dispatch(updateCarRequest(carItemLocal));
        setIsUpdate(false);
    }
    function handleClickCancel() {
        setCarItemLocal(prevCarItemLocal);
        setIsUpdate(false);
    }
    async function handleChange(e) {
        
        setCarItemLocal({
            ...carItemLocal,
            [e.target.name]: e.target.value
        })
    }
    function handleBuNameChange(e){
        const selectedBu = bus.find(bu => {
            return bu.id == e.target.value
        });
        if (selectedBu === undefined) return;

        setCarItemLocal({
            ...carItemLocal,
            buId: selectedBu.id,
            buName: selectedBu.name
        })
    }
    useEffect(() => {
        setCarItemLocal(props.car);
        setPrevCarItemLocal(props.car);
    }, [props.car]);
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
        <Fragment>
            <tr>
                <td>{no}</td>
                <td>
                    {
                        isUpdate ?
                            <select className="custom-select custom-select-sm" name="buName" onChange={handleBuNameChange}>
                                <option value="">---Chọn Bu---</option>
                                {
                                    bus && bus.map((bu, index) => {
                                        return <option key={index} value={bu.id}>{bu.name}</option>
                                    })
                                }
                            </select> :
                            carItemLocal.buName
                    }
                </td>
                <td>{isUpdate ? <input value={carItemLocal.currentLocation} onChange={handleChange} name="currentLocation" type="text" className="form-control form-control-sm" /> : carItemLocal.currentLocation}</td>

                <td>{isUpdate ? <input value={carItemLocal.number} onChange={handleChange} name="number" type="text" className="form-control form-control-sm" /> : carItemLocal.number}</td>
                <td>{isUpdate ? <input type="number" value={carItemLocal.totalSeat} onChange={handleChange} name="totalSeat" type="text" className="form-control form-control-sm" /> : carItemLocal.totalSeat}</td>
                <td>{isUpdate ? <input value={carItemLocal.manufactured} onChange={handleChange} name="manufactured" type="text" className="form-control form-control-sm" /> : carItemLocal.manufactured}</td>
                <td>{isUpdate ? <input value={carItemLocal.name} onChange={handleChange} name="name" type="text" className="form-control form-control-sm" /> : carItemLocal.name}</td>
                <td>
                    <div className="btn-group">
                        {
                            isUpdate ?
                                <Fragment>
                                    <button onClick={handleClickAccepted} className="btn btn-outline-primary btn-sm">
                                        Xác Nhận
                                </button>
                                    <button onClick={handleClickCancel} className="btn btn-outline-danger btn-sm">
                                        Hủy
                                </button>
                                </Fragment> :
                                <Fragment>
                                    <button onClick={handleClickUpdate} className="btn btn-outline-primary btn-sm">
                                        Sửa
                                </button>
                                    <button onClick={handleClickDelete} className="btn btn-outline-danger btn-sm">
                                        Xóa
                                </button>
                                </Fragment>
                        }

                    </div>
                </td>
            </tr>
        </Fragment>
    )
}