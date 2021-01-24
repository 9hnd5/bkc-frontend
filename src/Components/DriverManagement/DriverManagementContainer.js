import { DriverAdd } from "./DriverAdd"
import { DriverTable } from "./DriverTable"

export const DriverManagementContainer = () => {
    return (
        <div className="row">
            <div className="col-12 col-xl-12">
                <div className="card">
                    <div className="card-header">
                        <h4>Quản Lí Tài Xế</h4>
                    </div>
                    <div className="card-body">
                        <DriverAdd />
                        <DriverTable />
                    </div>
                </div>
            </div>
        </div>
    )
}