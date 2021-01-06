import { useHistory } from "react-router-dom";

export const HRRequestItem = (props) => {
    const history = useHistory();
    const { index } = props;
    function handleClick(e) {
        if (e === "processed") {
            history.push(`process/${booker.id}`)
        }
        if (e === "Reject") {
            props.onOpenModal(booker.id);
        }
    }
    const { booker, bookingInfor } = props.bookerBkInforBkDetail
    let status = null;
    switch (booker.status) {
        case "Success":
            status = "Đã Duyệt"
            break;
        case "Waiting":
            status = "Chưa Duyệt"
            break;
        case "Reject":
            status = "Từ Chối"
            break;
        default:
            break;
    }
    return (
        <tr>
            <td>
                {index + 1}
            </td>
            <td>
                {status}
            </td>
            <td >
                {booker.employeeName}
            </td>
            <td>
                {`${bookingInfor.location} - ${bookingInfor.destination}`}
            </td>
            <td>
                {bookingInfor.pickupTime}
            </td>
            <td style={{ width: "12%" }}>
                <div className="d-flex justify-content-center">
                    <button
                        onClick={() => handleClick("processed")}
                        className="btn btn-outline-primary btn-sm mr-2"
                        disabled={booker.status === "Success" || booker.status === "Reject" ? true : false}
                    >
                        <i className="fas fa-chevron-circle-right mr-1"></i>
                            XỬ LÝ
                    </button>
                    <button

                        onClick={() => handleClick("Reject")}
                        className="btn btn-outline-danger btn-sm"
                        disabled={booker.status === "Success" || booker.status === "Reject" ? true : false}
                    >
                        <i className="fas fa-ban mr-1"></i>
                            TỪ CHỐI
                    </button>
                </div>

            </td>
        </tr >
    );
}