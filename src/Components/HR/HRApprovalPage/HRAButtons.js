import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { requestApproveBkc, toggleIsDataApproveValid } from "../../../ActionCreators/hrActionCreators";

export const HRAButtons = () => {
    const isDataApproveValid = useSelector(state => state.hr.isDataApproveValid);
    const history = useHistory();
    const dispatch = useDispatch();
    const dataApproveBkc = useSelector(state => state.hr.dataApproveBkc);
    function handleClick(e) {
        if (e === "save") {
            dispatch(requestApproveBkc(dataApproveBkc));
            history.push("/hr-page");
        }
        if (e === "back") {
            dispatch(toggleIsDataApproveValid(false));
            history.push("/hr-page");
        }
    }
    return (
        <div className="row">
            <div className="col-6">
                <button
                    disabled={!isDataApproveValid}
                    onClick={() => handleClick("save")}
                    className="btn btn-outline-primary btn-sm mr-2"
                >
                    ĐỒNG Ý
                </button>
                <button onClick={() => handleClick("back")} className="btn btn-outline-danger btn-sm">QUAY LẠI</button>
            </div>
        </div>
    );
}