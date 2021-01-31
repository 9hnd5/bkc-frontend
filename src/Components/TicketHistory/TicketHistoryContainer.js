import { TicketHistoryTable } from "./TicketHistoryTable";

export const TicketHistoryContainer = (props) => {
    return (
        <div className="row">
            <div className="col-12 col-xl-12">
                <div className="card">
                    <div className="card-body">
                        <TicketHistoryTable />
                    </div>
                </div>
            </div>
        </div>
    );
}