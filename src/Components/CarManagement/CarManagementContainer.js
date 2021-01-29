import { CarAdd } from "./CarAdd"
import { CarTable } from "./CarTable"

export const CarManagementContainer = () => {
    return (
        <div className="row">
            <div className="col-12 col-xl-12">
                <div className="card">
                    <div className="card-body">
                        <CarAdd />
                        <div className="mb-1"></div>
                        <CarTable />
                    </div>
                </div>
            </div>
        </div>
    )
}