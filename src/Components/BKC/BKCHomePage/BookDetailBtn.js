export function BookDetailBtn(props) {
    const { onClick } = props;
    return (
        <div className="row">
            <div className="col-12 col-xl-1">
                <button onClick={onClick} className="btn btn-default">THÊM NGƯỜI ĐI</button>
            </div>
        </div>
    );
}