export function BookDetailBtn(props) {
    const { onClick } = props;
    return (
        <div className="row">
            <div className="col-4">
                {/* <button onClick={onClick} className="btn btn-outline-primary btn-sm">
                    THÊM NGƯỜI ĐI
                    <img src={ccMailIcon} />
                </button> */}

                <button onClick={onClick} className="btn btn-outline-primary btn-sm">
                    <i className='fas fa-plus-square mr-1'></i>
                    THÊM NGƯỜI ĐI
                </button>

            </div>
        </div>
    );
}