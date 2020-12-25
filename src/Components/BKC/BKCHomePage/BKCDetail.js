import { useDispatch } from "react-redux";
import { toggleBkcDetailModalInsert } from "../../../ActionCreators/bkcActionCreators";
import { BKCDetailButton } from "./BKCDetailButton";
import BKCDetailModalInsert from "./BKCDetailModalInsert";
import BKCDetailTable from "./BKCDetailTable";

function BKCDetail() {
    const dispatch = useDispatch();
    function handleClick() {
        dispatch(toggleBkcDetailModalInsert());
    }
    return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <h5>Thông Tin Chi Tiết</h5>
                        <BKCDetailTable />
                        <div className="w-100 mt-2 mb-2"></div>
                        <BKCDetailButton onClick={handleClick} />
                        <BKCDetailModalInsert />
                    </div>
                </div>
            </div>
        </div>
    );
}
export default BKCDetail;