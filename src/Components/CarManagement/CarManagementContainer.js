import { CarAdd } from "./CarAdd"
import { CarTable } from "./CarTable"

export const CarManagementContainer = () => {
    return (
        <div className="row">
            <div className="col-12 col-xl-12">
                <div className="card">
                    <div className="card-header">
                        <h4>Quản Lí Xe</h4>
                    </div>
                    <div className="card-body">
                        <CarAdd />
                        <CarTable />
                    </div>
                </div>
            </div>
        </div>
    )
}