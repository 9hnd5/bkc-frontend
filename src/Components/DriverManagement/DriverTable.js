import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux"
import { DriverItem } from "./DriverItem";

export const DriverTable = () => {
    const { t } = useTranslation();
    const drivers = useSelector(state => state.driverManagementReducer.drivers);
    console.log("drviers", drivers);
    const displayDriver = drivers && drivers.map((driver, index) => {
        return <DriverItem
            key={index}
            no={index + 1}
            driver={driver}
        />
    });
    return (
        <div className="row">
            <div className="col-12 col-xl-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12 col-3">
                                <h5>{t("danhsachxe")}</h5>
                            </div>
                        </div>
                        <div className="table-custom driver-table-responsive-add">
                            <table className="table-bordered table-sm table-striped table-hover">
                                <thead>
                                    <tr>
                                        <th>{t("stt")}</th>
                                        <th>{t("tentaixe")}</th>
                                        <th>{t("sodienthoaitaixe")}</th>
                                        <th>{t("tenbu")}</th>
                                        <th>{t("xedanglai")}</th>
                                        <th>{t("hanhdong")}</th>
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
    )
}