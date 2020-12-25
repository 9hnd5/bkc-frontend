export function BKCDetailButton(props) {
    const { onClick } = props;
    return (
        <div className="row">
            <div className="col-sm-2">
                <button onClick={onClick} className="btn  btn-outline-success btn-block">THÊM</button>
            </div>
        </div>
    );
}