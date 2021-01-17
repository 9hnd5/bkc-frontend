import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux"
import { BookingHistoryItem } from "./BookingHistoryItem";

export const BookingHistoryTable = () => {
    const { t } = useTranslation();
    const bookingInfors = useSelector(state => state.bh.bookingInfors);
    const displayBookingInfors = bookingInfors.map((bookingInfor, index) => {
        return <BookingHistoryItem index={index + 1} key={index} bookingInfor={bookingInfor} />
    });
    return (
        <div className="table-responsive booking-history-table" style={{ height: "500px" }}>
            <table className="table table-hover table-sm table-striped table-bordered">
                <thead>
                    <tr>
                        <th>{t("sothutu")}</th>
                        <th>{t("ngaydi")}</th>
                        <th>{t("ngayve")}</th>
                        <th>{t("diadiemdon")}</th>
                        <th>{t("diadiemden")}</th>
                        <th>{t("songuoidi")}</th>
                        <th>{t("trangthai")}</th>
                        <th>{t("hanhdong")}</th>
                    </tr>
                </thead>
                <tbody>
                    {displayBookingInfors}
                </tbody>
            </table>
        </div>
    )
}