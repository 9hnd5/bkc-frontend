import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { deleteBkcDetail, updateBkcDetail } from "../../../ActionCreators/bkcActionCreators";

function BKCDetailRow(props) {
    const [bkcDetail, setBkcDetail] = useState(props.bkcDetail);
    const [isUpdate, setIsUpdate] = useState(false);
    const dispatch = useDispatch();
    useEffect(() => {
        setBkcDetail(props.bkcDetail);
    }, [props]);
    function handleClick(event) {
        switch (event) {
            case "update":
                setIsUpdate(true);
                break;
            case "cancel":
                setIsUpdate(false);
                break;
            case "save":
                dispatch(updateBkcDetail(bkcDetail));
                setIsUpdate(false);
                break;
            case "delete":
                dispatch(deleteBkcDetail(bkcDetail));
                break;
            default:
                break;
        }
    }
    function handleChange(e) {
        setBkcDetail({
            ...bkcDetail,
            [e.target.name]: e.target.value
        })
    }
    return (
        <tr>
            <td className="w_4">
                {bkcDetail.id}
            </td>
            <td className="w_12">
                {isUpdate ? <input onChange={handleChange} value={bkcDetail.pickupLocation} className="form-control" name="pickupLocation" /> : bkcDetail.pickupLocation}

            </td>
            <td className="w_12">
                {isUpdate ? <input onChange={handleChange} value={bkcDetail.arriveTime} className="form-control" name="arriveTime" /> : bkcDetail.arriveTime}

            </td>
            <td className="w_12">
                {isUpdate ? <input onChange={handleChange} value={bkcDetail.employeeName} className="form-control" name="employeeName" /> : bkcDetail.employeeName}

            </td>
            <td className="w_12">
                {isUpdate ? <input onChange={handleChange} value={bkcDetail.guestName} className="form-control" name="guestName" /> : bkcDetail.guestName}

            </td>
            <td className="w_12">
                {isUpdate ? <input onChange={handleChange} value={bkcDetail.phone} className="form-control" name="phone" /> : bkcDetail.phone}

            </td>
            <td className="w_12">
                {isUpdate ? <input onChange={handleChange} value={bkcDetail.note} className="form-control" name="note" /> : bkcDetail.note}

            </td>
            <td className="w-10">
                <div className="d-flex justify-content-center">
                    <button onClick={() => handleClick(isUpdate ? "save" : "update")} className="btn btn-outline-success mr-2">{isUpdate ? "LƯU" : "SỬA"}</button>
                    <button onClick={() => handleClick(isUpdate ? "cancel" : "delete")} className="btn btn-outline-danger">{isUpdate ? "HỦY" : "XÓA"}</button>
                </div>
            </td>
        </tr>
    );
}
export default BKCDetailRow;