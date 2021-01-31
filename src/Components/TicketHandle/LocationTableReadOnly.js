import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { LocationItemReadOnly } from "./LocationItemReadOnly";

export const LocationTableReadOnly = () => {
    const { t } = useTranslation();
    const { ticketId } = useParams();
    const ticket = useSelector(state => state.ticketManagementReducer.ticketRequests).find(ticket => {
        return +ticket.id === +ticketId;
    })
    // console.log("ticket", ticket);
    const displayLocations = ticket && ticket.locations && ticket.locations.map((locationItem, index) => {
        return <LocationItemReadOnly
            key={index}
            no={index + 1}
            locationItem={locationItem}
        />
    });
    return (
        <div className="row">
            <div className="col-12 col-xl-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-12 col-xl-4">
                                <h5>{t("chitietnoidon")}</h5>
                            </div>
                        </div>
                        <div className="table-custom location-table-responsive">
                            <table className="table-bordered table-striped table-sm">
                                <thead>
                                    <tr>
                                        <th>{t("stt")}</th>
                                        <th>{t("noidon")}</th>
                                        <th>{t("giodon")}</th>
                                        <th>{t("nhanvien")}</th>
                                        <th>{t("khach")}</th>
                                        <th>{t("sodienthoai")}</th>
                                        <th>{t("ghichu")}</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {displayLocations}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}