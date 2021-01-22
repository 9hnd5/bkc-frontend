import { TicketRequestTable } from "./TicketRequestTable"

export const TicketRequestContainer = () => {
    return(
        <div className="row">
            <div className="col-12 col-xl-12">

                <div className="card">
                    <div className="card-header">
                        <h4>Danh Yêu Cầu</h4>
                    </div>
                    <div className="card-body">
                        <TicketRequestTable />
                    </div>
                </div>
            </div>
        </div>
    )
}