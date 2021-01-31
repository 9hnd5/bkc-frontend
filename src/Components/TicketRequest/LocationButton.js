import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { toggleModalAddLocation } from "../../ActionCreators/ticketActionCreator";

export function LocationButton(props) {
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const ticketDetail = useSelector(state => state.ticketReducer.ticketDetail);
    const locations = useSelector(state => state.ticketReducer.locations);
    const [isDisabled, setIsDisabled] = useState(true);
    function handleClick() {
        dispatch(toggleModalAddLocation());
    }
    useEffect(() => {
        if(locations.length >= 0 && locations.length < +ticketDetail.totalParticipant){
            setIsDisabled(false);
        }else{
            setIsDisabled(true);
        }
    }, [ticketDetail, locations]);
    return (
        <div className="row">
            <div className="col-4">
                <button
                    onClick={handleClick}
                    className="btn btn-outline-primary btn-sm"
                    disabled={isDisabled}
                >
                    <i className='fas fa-plus-square mr-1'></i>
                    {t("themdiadiem")}
                </button>

            </div>
        </div>
    );
}