import { Fragment } from "react";
import { useTranslation } from "react-i18next";

export const LocationItemReadOnly = (props) => {
    const {t} = useTranslation();
    const {locationItem, no} = props;
    return(
        <Fragment>
            <tr>
                <td data-label={t("stt")}>{no}</td>
                <td data-label={t("noidon")}>{locationItem.place}</td>
                <td data-label={t("giodon")}>{locationItem.time}</td>
                <td data-label={t("nhanvien")}>{locationItem.participants.map(item => {
                    return item.employeeName
                }).join(", ")}</td>
                <td data-label={t("khach")}>{locationItem.guestName}</td>
                <td data-label={t("sodienthoai")}>{locationItem.phone}</td>
                <td data-label={t("ghichu")}>{locationItem.note}</td>
            </tr>
        </Fragment>
    );
}