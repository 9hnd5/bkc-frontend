import { useHistory } from "react-router-dom";

export const MainBtn = (props) => {
    const { disabledBtnSaveAndSend, disabledBtnTempSave } = props;
    const history = useHistory();
    function handleBack() {
        history.push("/history-booking");
    }
    return (
        <div className="row">
            <div className="col-12 col-xl-6">
                <div className="btn-group flex-wrap" role="group">
                    <button
                        onClick={props.onSaveAndSend}
                        className="btn btn-outline-primary btn-sm mr-2"
                        disabled={disabledBtnSaveAndSend}
                    >
                        <i className="fas fa-paper-plane mr-1"></i>
                        LƯU VÀ GỬI
                    </button>

                    <button
                        onClick={props.onTempSave}
                        className="btn btn-outline-primary btn-sm mr-2"
                        disabled={disabledBtnTempSave}

                    >
                        <i className="fas fa-save mr-1"></i>
                        LƯU TẠM THỜI
                    </button>
                    {
                        props.isDisplayBtnBack ?
                            <button
                                onClick={handleBack}
                                className="btn btn-outline-warning btn-sm"
                                disabled={disabledBtnTempSave}

                            >
                                <i className="fas fa-save mr-1"></i>
                                QUAY LẠI
                            </button> : ""
                    }

                </div>
            </div>
        </div>
    );
}