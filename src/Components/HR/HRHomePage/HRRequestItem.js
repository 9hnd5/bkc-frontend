import { Link } from "react-router-dom";

export const HRRequestItem = (props) => {
    const { bkcInfor } = props
    return (
        <tr>
            <td>
                {bkcInfor.id}
            </td>
            <td>Đợi Duyệt</td>
            <td>
                {bkcInfor.name}
            </td>
            <td>
                {`${bkcInfor.pickupLocation} - ${bkcInfor.comeLocation}`}
            </td>
            <td>12/12/2020</td>
            <td>
                <Link to={`process/${bkcInfor.id}`} className="btn btn-success btn-sm">XỬ LÝ</Link>
                <Link to={`process/${bkcInfor.id}`} className="btn btn-danger btn-sm">TỪ CHỐI</Link>
            </td>
        </tr>
    );
}