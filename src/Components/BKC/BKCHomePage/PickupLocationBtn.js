import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react/cjs/react.development";
import { toggleBkcDetailModalInsert } from "../../../ActionCreators/bkcActionCreators";

export function PickupLocationBtn(props) {
    const pickupLocations = useSelector(state => state.bkc.pickupLocations);
    const bookingDetail = useSelector(state => state.bkc.bookingDetail);
    const {t} = useTranslation();
    const dispatch = useDispatch();
    const [isDisabledBtnAdd, setIsDisabledBtnAdd] = useState(true);
    function handleClick() {
        dispatch(toggleBkcDetailModalInsert());
    }
    useEffect(() => {
        if((pickupLocations.length < bookingDetail.totalPerson)){
            setIsDisabledBtnAdd(false);
        }
        else{
            setIsDisabledBtnAdd(true);
        }
    }, [pickupLocations, bookingDetail]);
    return (
        <div className="row">
            <div className="col-4">
                <button
                    disabled={isDisabledBtnAdd}
                    onClick={handleClick}
                    className="btn btn-outline-primary btn-sm"
                >
                    <i className='fas fa-plus-square mr-1'></i>
                    {t("themdiadiem")}
                </button>

            </div>
        </div>
    );
}