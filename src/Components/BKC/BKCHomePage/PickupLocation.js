import { useTranslation } from "react-i18next";
import { PickupLocationBtn } from "./PickupLocationBtn";
import { PickupLocationTable } from "./PickupLocationTable";

export const PickupLocation = (props) => {
    const {t} = useTranslation();
     return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <PickupLocationTable
                            bookerId={props.bookerId}
                            totalPerson={props.totalPerson}
                        />
                        <div className="w-100 mt-2 mb-2"></div>
                        <PickupLocationBtn
                            totalPerson={props.totalPerson}
                            bookingDetails = {props.bookingDetails}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}