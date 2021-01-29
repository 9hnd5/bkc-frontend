import { DriverAdd } from "./DriverAdd"
import { DriverTable } from "./DriverTable"

export const DriverManagementContainer = () => {
    return (
        <div className="row">
            <div className="col-12 col-xl-12">
                <div className="card">
                    <div className="card-body">
                        <DriverAdd />
                        <div className="mb-1"></div>
                        <DriverTable />
                    </div>
                </div>
            </div>
        </div>
    )
}