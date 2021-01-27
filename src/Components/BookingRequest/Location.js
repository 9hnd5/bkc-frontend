import { useTranslation } from "react-i18next";
import { LocationButton } from "./LocationButton";
import { LocationTable } from "./LocationTable";

export const Location = (props) => {
    const { t } = useTranslation();
    return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-6 col-xl-4">
                                <h5>Chi Tiết Nơi Đón</h5>
                            </div>
                        </div>
                        <LocationTable />
                        <div className="w-100 mt-2 mb-2"></div>
                        <LocationButton />
                    </div>
                </div>
            </div>
        </div>
    );
}