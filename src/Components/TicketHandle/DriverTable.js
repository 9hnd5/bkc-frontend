import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { DriverItem } from "./DriverItem";

export const DriverTable = () => {
    const {t} = useTranslation();
    const drivers = useSelector(state => state.ticketHandleReducer.drivers);
    const [moveCarId, setMoveCarId] = useState("");
    const [returnCarId, setReturnCarId] = useState("");
    function handleCheckedMoveCar(moveCarId){
        setMoveCarId(moveCarId);
    }
    function handleCheckReturnCar(returnCarId){
        setReturnCarId(returnCarId);
    }
    const displayDriver = drivers && drivers.map((driver, index) => {
        return <DriverItem
            key={index}
            no={index + 1}
            driver={driver}
            moveCarId={moveCarId}
            returnCarId={returnCarId}
            onHandleCheckedMoveCar={handleCheckedMoveCar}
            onHandleCheckReturnCar={handleCheckReturnCar}
        />
    });
    return (
        <div className="row">
            <div className="col-12 col-xl-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12 col-xl-12">
                                <h5>{t("thongtinxevataixe")}</h5>
                            </div>
                        </div>
                        <div className="table-custom driver-table-responsive">
                            <table className="table-sm table-bordered table-striped">
                                <thead>
                                    <tr>
                                        <th>{t("stt")}</th>
                                        <th>{t("tentaixe")}</th>
                                        <th>{t("sodienthoaitaixe")}</th>
                                        <th>{t("biensoxe")}</th>
                                        <th>{t("socho")}</th>
                                        <th>{t("trangthaixe")}</th>
                                        <th>{t("chonxengaydi")}</th>
                                        <th>{t("chonxengayve")}</th>
                                        <th>{t("ghichuchotaixe")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayDriver}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}