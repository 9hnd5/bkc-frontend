import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { requestApproveBkc, toggleIsApproveSuccess, toggleIsDataApproveValid } from "../../../ActionCreators/hrActionCreators";

export const HRAButtons = () => {
    const isDataApproveValid = useSelector(state => state.hr.isDataApproveValid);
    const isApproveSuccess = useSelector(state => state.hr.isApproveSuccess);
    const history = useHistory();
    const dispatch = useDispatch();
    const dataApproveBkc = useSelector(state => state.hr.dataApproveBkc);
    function handleClick(e) {
        if (e === "save") {
            dispatch(requestApproveBkc(dataApproveBkc));
        }
        if (e === "back") {
            dispatch(toggleIsDataApproveValid(false));
            history.push("/admin");
        }
    }
    useEffect(() => {
        if(isApproveSuccess){
            history.push("/admin");
            return;
        }
        dispatch(toggleIsApproveSuccess(false));
    });
    return (
        <div className="row">
            <div className="col-6">
                <button
                    disabled={!isDataApproveValid}
                    onClick={() => handleClick("save")}
                    className="btn btn-outline-primary btn-sm mr-2"
                >
                    <i className="fas fa-check-circle mr-1"></i>
                    XÁC NHẬN
                </button>
                <button
                    onClick={() => handleClick("back")}
                    className="btn btn-outline-danger btn-sm"
                >
                    <i className="fas fa-backspace mr-1"></i>
                    QUAY LẠI
                    </button>
            </div>
        </div>
    );
}