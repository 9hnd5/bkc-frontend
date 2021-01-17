import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react/cjs/react.development";
import { HTTP_METHOD, URL } from "../../../Constants/appConstants";
import { callApi } from "../../../Helpers/callApi";
import { PickupLocationItem } from "./PickupLocationItem";
import { ModalInsertBookDetail } from "./ModalInsertBookDetail";
import { setPickupLocations } from "../../../ActionCreators/bkcActionCreators";
import isEmpty from "lodash/isEmpty";
export const PickupLocationTable = (props) => {
    const dispatch = useDispatch();
    const isLoading = useSelector(state => state.bkc.isLoading);
    const { t } = useTranslation();
    const [pickupLocationsLocal, setPickupLocationsLocal] = useState([]);
    const displayPickupLocations = pickupLocationsLocal.map((pickupLocation, index) => {
        return <PickupLocationItem
            pickupLocation={pickupLocation}
            key={index}
            index = {index + 1}
            onSaveUpdate={handleModalSaveUpdate}
            onDelete={handleDeletePickupLocation}
        />
    });
    function handleModalSave(pickupLocation) {
        pickupLocation.id = pickupLocationsLocal.length + 1;
        const temp = [...pickupLocationsLocal, pickupLocation];
        setPickupLocationsLocal(temp);
    }
    function handleModalSaveUpdate(pickupLocation) {
        const index = pickupLocationsLocal.findIndex((bkd) => {
            return bkd.stt === pickupLocation.stt;
        });
        if (index > -1) {
            const newPickupLocationsLocal = [...pickupLocationsLocal];
            newPickupLocationsLocal[index] = pickupLocation;
            setPickupLocationsLocal(newPickupLocationsLocal)
        }
    }
    function handleDeletePickupLocation(pickupLocation) {
        const index = pickupLocationsLocal.findIndex((bkd) => {
            return bkd.stt === pickupLocation.stt;
        });
        if (index > -1) {
            const newPickupLocationsLocal = [...pickupLocationsLocal];
            newPickupLocationsLocal.splice(index, 1);
            for (let i = 0; i < newPickupLocationsLocal.length; i++) {
                newPickupLocationsLocal[i].stt = i + 1;
            }
            setPickupLocationsLocal(newPickupLocationsLocal);
        }
    }
    useEffect(() => {
        async function fetchBookingPickupLocationByBookerId() {
            if (props.bookerId) {
                const res = await callApi(`${URL}/booking-pickup-location/${props.bookerId}`, HTTP_METHOD.GET, null);
                const bookingDetailsFromServer = res.data;
                const pickupLocationsLocal = bookingDetailsFromServer.map((item, index) => {
                    const { bookingParticipants: x, ...rest } = item;
                    return {
                        ...rest,
                        employees: item.bookingParticipants.map(x => {
                            return {
                                id: x.employeeId,
                                name: x.employeeName
                            }
                        }),
                        stt: index + 1
                    }
                })
                setPickupLocationsLocal(pickupLocationsLocal);
            }
        }
        fetchBookingPickupLocationByBookerId();
    }, [props.bookerId]);
    useEffect(() => {
        if ((pickupLocationsLocal.length >= 1 && pickupLocationsLocal.length <= 2)) {
            dispatch(setPickupLocations(pickupLocationsLocal))
        }
        else {
            dispatch(setPickupLocations([]))
        }
    }, [pickupLocationsLocal]);
    useEffect(() => {
        if (isLoading) setPickupLocationsLocal([])
    }, [isLoading])
    useEffect(() => {
        if (isEmpty(props.pickupLocations)) return;
        setPickupLocationsLocal(props.pickupLocations);
    }, [props.pickupLocations])
    return (
        <div className="row">
            <div className="col-12">
                <div className="table-responsive table_detail_responsive">
                    <table className="table table-sm table-striped table-bordered table_detail">
                        <thead>
                            <tr>
                                <th scope="col" className="w_4" >{t("sothutu")}</th>
                                <th scope="col" className="w_12" >{t("diadiemdon")}</th>
                                <th scope="col" className="w_12" >{t("giodon")}</th>
                                <th scope="col" className="w_12" >{t("nhanvien")}</th>
                                <th scope="col" className="w_12" >{t("khach")}</th>
                                <th scope="col" className="w_12" >{t("sodienthoai")}</th>
                                <th scope="col" className="w_12" >{t("ghichu")}</th>
                                <th scope="col" className="w_12" >{t("hanhdong")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {displayPickupLocations}
                        </tbody>
                    </table>
                </div>
                <ModalInsertBookDetail onSave={handleModalSave} />
            </div>
        </div>
    );
}