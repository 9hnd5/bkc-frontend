import { useSelector } from "react-redux";
import BKCDetailRow from "./BKCDetailRow";
function BKCDetailTable(props) {
    const bkcDetails = useSelector(state => state.bkc.bkcDetails);
    const displayBkcDetails = bkcDetails.map((bkcDetail, index) => {
        return <BKCDetailRow bkcDetail={bkcDetail} key={index} />
    });
    return (
        <div className="row">
            <div className="col-12">
                <div className="table-responsive table_detail_responsive">
                    <table className="table table-sm table-striped table-bordered table_detail">
                        <thead>
                            <tr>
                                <th scope="col" className="w_4" >Id</th>
                                <th scope="col" className="w_12" >Nơi Đón</th>
                                <th scope="col" className="w_12" >Nhân Viên</th>
                                <th scope="col" className="w_12" >Tên Khách</th>
                                <th scope="col" className="w_12" >Giờ Đến</th>
                                <th scope="col" className="w_12" >SĐT</th>
                                <th scope="col" className="w_12" >Ghi Chú</th>
                                <th scope="col" className="w_12" >Hành Động</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayBkcDetails}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
export default BKCDetailTable