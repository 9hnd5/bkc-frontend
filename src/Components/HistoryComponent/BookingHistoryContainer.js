import { useTranslation } from "react-i18next";
import { BookingHistoryTable } from "./BookingHistoryTable";

export const BookingHistoryContainer = (props) => {
    const { t } = useTranslation();
    return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-header">
                        <h4>{t("danhsachxedadat")}</h4>
                    </div>
                    <div className="card-body">
                        <BookingHistoryTable />
                    </div>
                </div>
            </div>
        </div>
    );
}