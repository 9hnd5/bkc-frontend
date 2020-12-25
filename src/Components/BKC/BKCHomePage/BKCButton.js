function BKCButton(props) {
    const {onClick} = props;
    return (
        <div className="row">
            <div className="col-xs-6 col-sm-2">
                <button onClick={() => onClick("save")} className="btn btn-outline-success btn-block">ĐỒNG Ý</button>
            </div>
            <div className="col-xs-6 col-sm-2">
                <button onClick={() => onClick("cancel")} className="btn btn-outline-danger btn-block">HỦY BỎ</button>
            </div>
        </div>
    );
}
export default BKCButton;