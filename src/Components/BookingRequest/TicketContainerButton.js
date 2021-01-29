import { isEmpty } from "lodash";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";

export const TicketContainerButton = (props) => {
    const { t } = useTranslation();
    const { action } = useParams();
    const ticketDetail = useSelector(state => state.ticketReducer.ticketDetail);
    const locations = useSelector(state => state.ticketReducer.locations);
    const [isDisabledButtonSaveAndSend, setIsDisabledButtonSaveAndSend] = useState(true);
    const [isDisabledButtonTempSave, setIsDisabledButtonTempSave] = useState(true);
    const history = useHistory();
    function handleBack() {
        history.push("/ticket-history");
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
                        onClick={props.onHandleTempSave}
                        className="btn btn-outline-primary btn-sm mr-2"
                        disabled={isDisabledButtonTempSave}
                    >
                        <i className="fas fa-save mr-1"></i>
                        {t("luu")}
                    </button>
                    <button
                        onClick={props.onHandleSaveAndSend}
                        className="btn btn-outline-primary btn-sm mr-2"
                        disabled={isDisabledButtonSaveAndSend}
                    >
                        <i className="fas fa-paper-plane mr-1"></i>
                        {t("luuvagui")}
                    </button>
                    {
                        !isEmpty(action) ?
                            <button
                                onClick={handleBack}
                                className="btn btn-outline-info btn-sm"

                            >
                                <i className="fas fa-backspace mr-1"></i>
                               {t("quaylai")}
                            </button> : ""
                    }

                </div>
            </div>
        </div>
    );
}