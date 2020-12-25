import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom'
function Nav() {
    const pageActive = useSelector(state => state.app.pageActive);
    return (
        <div className="container-fluid">
            <div className="row d-flex justify-content-center">
                <div className="col-10">
                    <ul className="nav nav-tabs">
                        <li className="nav-item">
                            <Link className={`nav-link ${pageActive === "BKC_PAGE" ? "active" : "disabled"}`} to="bookingcar">ĐẶT XE</Link>
                        </li>
                        <li className="nav-item">
                            <Link className={`nav-link ${pageActive === "HR_PAGE" ? "active" : "disabled"}`} to="/hr-page">HR</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}
export default Nav