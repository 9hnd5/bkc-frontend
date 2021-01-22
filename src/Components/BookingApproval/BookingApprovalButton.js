export const BookingApprovalButton = (props) => {
    return (
        <div className="row">
            <div className="col-12 col-xl-12">
                <div className="btn-group">
                    <button
                        onClick={props.onHandleClickApprove}
                        className="btn btn-outline-primary btn-sm mr-2"
                    >
                        Duyệt Yêu Cầu
                    </button>
                    <button className="btn btn-outline-danger btn-sm mr-2">
                        Hủy Yêu Cầu
                    </button>
                    <button className="btn btn-outline-info btn-sm">
                        Quay Lại
                    </button>
                </div>
            </div>
        </div>
    );
}