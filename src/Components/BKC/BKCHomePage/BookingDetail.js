import { BookingDetailBtn } from "./BookingDetailBtn";
import { BookingDetailTable } from "./BookingDetailTable";

export const BookingDetail = (props) => {
    return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-header">
                        <h4>THÔNG TIN NGƯỜI ĐI</h4>
                    </div>
                    <div className="card-body">
                        <BookingDetailTable />
                        <div className="w-100 mt-2 mb-2"></div>
                        <BookingDetailBtn />
                    </div>
                </div>
            </div>
        </div>
    );
}