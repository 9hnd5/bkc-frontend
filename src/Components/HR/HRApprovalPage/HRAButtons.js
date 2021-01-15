
export const HRAButtons = (props) => {
    function handleClickAccept(){
        props.onClickAccept();
    }
    return (
        <div className="row">
            <div className="col-6">
                <div className="button-group" role="group">
                <button
                    onClick={handleClickAccept}
                    className="btn btn-outline-primary btn-sm mr-2"
                >
                    <i className="fas fa-check-circle mr-1"></i>
                    XÁC NHẬN
                </button>
                <button
                    className="btn btn-outline-danger btn-sm mr-2"
                >
                    <i className="fas fa-check-circle mr-1"></i>
                    TỪ CHỐI
                </button>
                <button

                    className="btn btn-outline-info btn-sm"
                >
                    <i className="fas fa-backspace mr-1"></i>
                    QUAY LẠI
                </button>
                </div>
            </div>
        </div>
    );
}