import { useHistory } from "react-router-dom";
import { useState } from "react";
import { useEffect } from "react/cjs/react.development";
import moment from 'moment';
export const HRRequestItem = (props) => {
    const history = useHistory();
    const { index, bookingHistory } = props;
    const [classNameForStatus, setClassNameForStatus] = useState("");
    const [status, setStatus] = useState("");
    const [isDisabledBtn, setIsDisabledBtn] = useState(false);
    const [isUpdateExistBooking, setIsUpdateExistBooking] = useState(false);
    function handleClick(e) {
        if (e === "processed") {
            history.push(`/process/${bookingHistory.bookerId}`)
        }
        else if (e === "Reject") {
            props.onOpenModal(bookingHistory.bookerId);
        }
        else{
            history.push(`/update/${bookingHistory.bookerId}`);
        }
    }
    useEffect(() => {
        const now = moment();
        const moveDate = moment(bookingHistory.moveDate, "DD/MM/YYYY", true);
        if (moveDate <= now) setIsDisabledBtn(true);
        else setIsDisabledBtn(false);

        if (bookingHistory.status === "Success") setIsUpdateExistBooking(true);
        else setIsUpdateExistBooking(false);

        switch (bookingHistory.status) {
            case "Success":
                setStatus("Đã Duyệt")
                setClassNameForStatus("label-custom label-success");
                break;
            case "Reject":
                setStatus("Từ Chối");
                setClassNameForStatus("label-custom label-danger");
                break;
            case "Waiting":
                setStatus("Đang Đợi Duyệt");
                setClassNameForStatus("label-custom label-info");
                break;
            case "Draft":
                setStatus("Nháp");
                setClassNameForStatus("label-custom label-warning");
                break;
            default:
                break;
        }
    }, [bookingHistory])
    return (
        <tr>
            <td>
                {index + 1}
            </td>
            <td>
                {bookingHistory.employeeName}
            </td>
            <td >
                {bookingHistory.moveDate}
            </td>
            <td>
                {bookingHistory.returnDate}
            </td>
            <td>
                {bookingHistory.totalPerson}
            </td>
            <td>
                <p className={classNameForStatus}>{status}</p>
            </td>
            <td style={{ width: "12%" }}>
                <div className="d-flex justify-content-center">
                    {
                        isUpdateExistBooking ?
                            <button
                                onClick={() => handleClick("update")}
                                className="btn btn-outline-primary btn-sm mr-2"
                                disabled={isDisabledBtn}
                            >
                                <i className="fas fa-chevron-circle-right mr-1"></i>
                                SỬA
                            </button> :
                            <button
                                onClick={() => handleClick("processed")}
                                className="btn btn-outline-primary btn-sm mr-2"
                                disabled={isDisabledBtn}
                            >
                                <i className="fas fa-chevron-circle-right mr-1"></i>
                                XỬ LÝ
                            </button>
                    }

                    <button

                        onClick={() => handleClick("Reject")}
                        className="btn btn-outline-danger btn-sm"

                    >
                        <i className="fas fa-ban mr-1"></i>
                            TỪ CHỐI
                    </button>
                </div>

            </td>
        </tr >
    );
}