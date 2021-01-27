// import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './NavBar.scss';
// import VNflag from './../../Assets/Bootstrap-icon/vietnam.svg'
// import { login, logout } from '../../Helpers/login';
// import { login, logout } from '../../Helpers/login';
export const NavBar = () => {
    const { t, i18n } = useTranslation();
    const history = useHistory();
    // const dispatch = useDispatch();
    // const user = useSelector(state => state.app.user);
    // const isAuth = useSelector(state => state.app.isAuth);
    // const pageName = useSelector(state => state.app.pageName);
    const pageName = "";
    // const employee = useSelector(state => state.app.employee);
    const employee = {};
    // console.log("role", employee.role);
    // const isShowNavBar = Object.keys(employee).length !== 0? true: false;
    const isShowNavBar = true;
    // const isShowBtnAdmin = (employee.role === ROLE.SUPER_ADMIN || employee.role === ROLE.ADMIN)? true: false;
    async function handleClick(e) {
        if (e === "logout") {
            // logout();
            // dispatch(saveEmployee({}));
            // dispatch(saveAccessToken(""));
            // dispatch(saveAuthenticate(false));
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

            // dispatch(requestAuthenticate("hoe.ph@greenfeed.com.vn"));
            // dispatch(requestAuthenticate("khiem.nt@greenfeed.com.vn"));
            // dispatch(requestAuthenticate("huy.ndinh@greenfeed.com.vn"));

        }
    }
    function handleChangeLanguage(lang) {
        i18n.changeLanguage(lang);
    }
    return (
        <div className="container-fluid">
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-xl-12">
                    <nav className="navbar navbar-expand-lg navbar-light bg-success shift">
                        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarTogglerDemo03" aria-controls="navbarTogglerDemo03" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon"></span>
                        </button>
                        <Link to="/" className="navbar-brand"><i className="fas fa-home"></i></Link>
                        <div className="collapse navbar-collapse" id="navbarTogglerDemo03">
                            <ul style={{ display: isShowNavBar ? "" : "none" }} className="navbar-nav mr-auto">
                                {/* <li className={pageName === "Home" ? "nav-item active" : "nav-item"}>
                                    <Link className="nav-link" to="/">
                                        <i className="fas fa-home mr-1"></i>
                                        {t("trangchu")}
                                    </Link>
                                </li> */}
                                <li className={pageName === "BookingCar" ? "nav-item active" : "nav-item"}>
                                    <Link className="nav-link" to="/booking-request">
                                        <i className="fas fa-car mr-1"></i>
                                        {t("yeucaudatxe")}
                                    </Link>
                                </li>
                                <li className={pageName === "BookingHistory" ? "nav-item active" : "nav-item"}>
                                    <Link className="nav-link" to="/booking-history">
                                        <i className="fas fa-history mr-1"></i>
                                        {t("lichsudatxe")}
                                    </Link>
                                </li>
                                <li
                                    className={pageName === "Admin" ? "nav-item active" : "nav-item"}
                                // style={{ display: isShowBtnAdmin? "": "none" }}
                                >
                                    <Link className="nav-link" to="/ticket-management">
                                        <i className="fas fa-user-cog mr-1"></i>
                                        Danh Sách Yêu Cầu
                                    </Link>
                                </li>
                                <li className="nav-item dropdown">
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-user-cog mr-1"></i>
                                        {t("admin")}
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <Link to="/car-management" className="dropdown-item" href="#">Quản Lí Xe</Link>
                                        <Link to="/driver-management" className="dropdown-item" href="#">Quản Lí Tài Xế</Link>
                                        <a className="dropdown-item" href="#">Quản Lí Tài Khoản</a>
                                    </div>
                                </li>
                                <div className="btn-group mr-2" role="group">
                                    <button onClick={() => handleChangeLanguage("en")} className="btn btn-sm btn-primary" type="button">
                                        Tiếng Anh
                                    </button>
                                    <button onClick={() => handleChangeLanguage("vn")} className="btn btn-sm btn-primary" type="button">
                                        Tiếng Việt
                                    </button>
                                </div>
                            </ul>

                        </div>
                        {/* <div className="btn__login">
                            <button
                                onClick={() => handleClick(!isAuth ? "login" : "logout")}
                                className="btn btn-light btn-sm my-2 my-sm-0"
                            >
                                <i className={!isAuth ? "fas fa-arrow-alt-circle-right mr-1" : "fas fa-arrow-alt-circle-left mr-1"}></i>
                                {!isAuth ? t("dangnhap") : t("dangxuat")}
                            </button>
                        </div> */}
                    </nav>
                </div>
            </div>
        </div>
    );
}