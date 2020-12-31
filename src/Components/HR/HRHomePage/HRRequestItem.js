import { useHistory } from "react-router-dom";

export const HRRequestItem = (props) => {
    const history = useHistory();
    const { index } = props;
    function handleClick(e) {
        if (e == "processed") {
            history.push(`process/${booker.id}`)
        }
        if(e == "decline"){
            props.onOpenModal(booker.id);
        }
    }
    const { booker, bookingInfor } = props.bookerBkInforBkDetail
    console.log("booker", booker);
    let status = null;
    switch (booker.status) {
        case "Success":
            status="Đã Duyệt"
            break;
        case "Waiting":
            status="Chưa Duyệt"
            break;
        case "Decline":
            status="Từ Chối"
            break;
        default:
            break;
    }
    return (
        <tr>
            <td style={{ width: "5%" }}>
                {index + 1}
            </td>
            <td style={{ width: "8%" }}>{status}</td>
            <td style={{ width: "20%" }}>
                {booker.employeeName}
            </td>
            <td style={{ width: "25%" }}>
                {`${bookingInfor.location} - ${bookingInfor.destination}`}
            </td>
            <td style={{ width: "25%" }}>{bookingInfor.pickupTime}</td>
            <td style={{ width: "15%" }}>
                <div className="row">
                    <div className="col-12 d-flex justify-content-center">
                        <button
                            onClick={() => handleClick("processed")}
                            className="btn btn-outline-primary btn-sm mr-2"
                            disabled={booker.status == "Success" || booker.status == "Decline" ? true : false}
                        >
                            XỬ LÝ
                        </button>
                        <button
                            onClick={() => handleClick("decline")}
                            className="btn btn-outline-danger btn-sm"
                            disabled={booker.status == "Success" || booker.status == "Decline" ? true : false}
                        >
                            TỪ CHỐI
                        </button>
                    </div>
                </div>
            </td>
        </tr>
    );
}