import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

export const TicketContainerButton = (props) => {
    const { action } = useParams();
    const ticketDetail = useSelector(state => state.ticketReducer.ticketDetail);
    const locations = useSelector(state => state.ticketReducer.locations);
    const [isDisabledButtonSaveAndSend, setIsDisabledButtonSaveAndSend] = useState(true);
    const [isDisabledButtonTempSave, setIsDisabledButtonTempSave] = useState(true);
    const history = useHistory();
    function handleBack() {
        history.push("/booking-history");
    }
    useEffect(() => {
        if (isEmpty(ticketDetail)) setIsDisabledButtonTempSave(true);
        else setIsDisabledButtonTempSave(false);

        if (isEmpty(ticketDetail) || isEmpty(locations)) setIsDisabledButtonSaveAndSend(true);
        else setIsDisabledButtonSaveAndSend(false);
    }, [ticketDetail, locations])
    return (
        <div className="row">
            <div className="col-12 col-xl-6">
                <div className="btn-group flex-wrap" role="group">
                    <button
                        onClick={props.onHandleSaveAndSend}
                        className="btn btn-outline-primary btn-sm mr-2"
                        disabled={isDisabledButtonSaveAndSend}
                    >
                        <i className="fas fa-paper-plane mr-1"></i>
                        LƯU VÀ GỬI
                    </button>

                    <button
                        onClick={props.onHandleTempSave}
                        className="btn btn-outline-primary btn-sm mr-2"
                        disabled={isDisabledButtonTempSave}
                    >
                        <i className="fas fa-save mr-1"></i>
                        LƯU TẠM THỜI
                    </button>
                    {
                        !isEmpty(action) ?
                            <button
                                onClick={handleBack}
                                className="btn btn-outline-warning btn-sm"

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