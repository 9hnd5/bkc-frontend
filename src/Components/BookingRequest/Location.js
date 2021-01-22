import { useTranslation } from "react-i18next";
import { LocationButton } from "./LocationButton";
import { LocationTable } from "./LocationTable";

export const Location = (props) => {
    const {t} = useTranslation();
     return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <LocationTable />
                        <div className="w-100 mt-2 mb-2"></div>
                        <LocationButton />
                    </div>
                </div>
            </div>
        </div>
    );
}