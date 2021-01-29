import { BookingHistoryTable } from "./BookingHistoryTable";

export const BookingHistoryContainer = (props) => {
    return (
        <div className="row">
            <div className="col-12 col-xl-12">
                <div className="card">
                    <div className="card-body">
                        <BookingHistoryTable />
                    </div>
                </div>
            </div>
        </div>
    );
}