import { HistoryBookingTable } from "./HistoryBookingTable";

export const HistoryBookingContainer = (props) => {
    return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-header">
                        <h4>DANH SÁCH XE ĐÃ ĐẶT</h4>
                    </div>
                    <div className="card-body">
                        <HistoryBookingTable />
                    </div>
                </div>
            </div>
        </div>
    );
}