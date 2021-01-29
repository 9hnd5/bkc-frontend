import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux"
import { CarItem } from "./CarItem";

export const CarTable = () => {
    const {t} = useTranslation();
    const cars = useSelector(state => state.carManagementReducer.cars);
    console.log("cars", cars);
    const displayCar = cars && cars.map((car, index) => {
        return <CarItem
            key={index}
            no={index + 1}
            car={car}
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
                        <div className="table-custom car-table-responsive-add">
                            <table className="table-sm table-hover table-striped table-bordered">
                                <thead>
                                    <tr>
                                        <th>{t("stt")}</th>
                                        <th>{t("tenbu")}</th>
                                        <th>{t("vitrihientai")}</th>
                                        <th>{t("biensoxe")}</th>
                                        <th>{t("socho")}</th>
                                        <th>{t("hangxe")}</th>
                                        <th>{t("tenxe")}</th>
                                        <th>{t("hanhdong")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayCar}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}