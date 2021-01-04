// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { requestAuthenticate, saveAccessToken, saveAuthenticate, saveEmployee } from '../../ActionCreators/appActionCreators';
import './NavBar.scss';
// import { login, logout } from '../../Helpers/login';
export const NavBar = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    // const user = useSelector(state => state.app.user);
    const isAuth = useSelector(state => state.app.isAuth);
    const pageName = useSelector(state => state.app.pageName);
    async function handleClick(e) {
        if (e === "logout") {
            // logout();
            dispatch(saveEmployee({}));
            dispatch(saveAccessToken(""));
            dispatch(saveAuthenticate(false));
            // console.log("Logout success with email: ", user.employeeEmail);
            history.push("/");
            return;
        }
        if (e === "login") {
            // const u = await login();
            // if (u) {
            //     console.log("Login success with email: ", u.mail);
            //     dispatch(requestAuthenticate(u.mail));
            // }else{
            //     console.log("Login fail, please try again");
            // }

            // huy.ndinh@greenfeed.com.vn Head Office admin
            // chi.tn@greenfeed.com.vn Head Office employee
            // lieu.pt@greenfeed.com.vn Head Office employee
            // truyen.nv@greenfeed.com.vn Projects admin
            // lecongtru.gf@gmail.com Projects employee

            dispatch(requestAuthenticate("huy.ndinh@greenfeed.com.vn"));
            // dispatch(requestAuthenticate("chi.tn@greenfeed.com.vn"));
            // dispatch(requestAuthenticate("lieu.pt@greenfeed.com.vn"));
            // dispatch(requestAuthenticate("truyen.nv@greenfeed.com.vn"));
            // dispatch(requestAuthenticate("lecongtru.gf@gmail.com"));
        }
    }
    return (
        <div className="container-fluid">
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-xl-12">
                    <nav className="navbar navbar-expand-lg navbar-light bg-success">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <Link to="/" className="navbar-brand"><i className="fas fa-home"></i></Link>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                            <ul className="navbar-nav mr-auto">
                                <li className={pageName === "Home" ? "nav-item active" : "nav-item"}>
                                    <Link className="nav-link" to="/">
                                        <i className="fas fa-home mr-1"></i>
                                        Trang Chủ
                                    </Link>
                                </li>
                                <li className={pageName === "HistoryBooking" ? "nav-item active" : "nav-item"}>
                                    <Link className="nav-link" to="/history-booking">
                                        <i className="fas fa-history mr-1"></i>
                                        Lịch Sử Đặt Xe
                                    </Link>
                                </li>
                                <li className={pageName === "BookingCar" ? "nav-item active" : "nav-item"}>
                                    <Link className="nav-link" to="/request-booking">
                                        <i className="fas fa-car mr-1"></i>
                                        Yêu Cầu Đặt Xe
                                    </Link>
                                </li>
                                <li className={pageName === "Admin" ? "nav-item active" : "nav-item"}>
                                    <Link className="nav-link" to="/admin">
                                        <i className="fas fa-user-cog mr-1"></i>
                                        Admin
                                    </Link>
                                </li>
                            </ul>

                            <button
                                onClick={() => handleClick(!isAuth ? "login" : "logout")}
                                className="btn btn-light btn-sm my-2 my-sm-0"
                            >
                                <i className={!isAuth? "fas fa-arrow-alt-circle-right mr-1": "fas fa-arrow-alt-circle-left mr-1"}></i>
                                {!isAuth ? "Log in" : "Log out"}
                            </button>

                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}