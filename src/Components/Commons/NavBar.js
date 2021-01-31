import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import './NavBar.scss';
import { ROLE } from '../../Constants/CommonsConstants';
import { requestAuthenticated, setEmployee, setIsAuth } from '../../ActionCreators/appActionCreator';
import { login, logout } from '../../Helpers/login';
import { notification, NOTIFICATION_TYPE } from '../../Helpers/notification';
import vnFlag from './../../Assets/Bootstrap-icon/vnFlag.jpg';
import usaFlag from './../../Assets/Bootstrap-icon/usaFlag.jpg';
import { useState } from 'react';
export const NavBar = () => {
    const { t, i18n } = useTranslation();
    const history = useHistory();
    const dispatch = useDispatch();
    const isAuth = useSelector(state => state.appReducer.isAuth);
    const pageName = useSelector(state => state.appReducer.pageName);
    const employee = useSelector(state => state.appReducer.employee);
    const isShowNavBar = Object.keys(employee).length !== 0 ? true : false;
    const isShowAdmin = employee && (employee.role === ROLE.SUPER_ADMIN || employee.role === ROLE.ADMIN);
    const isShowTicketManagement = (employee.role === ROLE.SUPER_ADMIN || employee.role === ROLE.ADMIN) ? true : false;

    const [tempEmailLogin, setTempEmailLogin] = useState("");
    async function handleClick(e) {
        if (e === "logout") {
            // logout();
            dispatch(setEmployee({}));
            dispatch(setIsAuth(false));
            history.push("/");
            return;
        }
        if (e === "login") {
            // const u = await login();
            // if (u) {
            //     dispatch(requestAuthenticated(u.mail));
            // } else {
            //     notification(NOTIFICATION_TYPE.ERROR, "Login Fail, Please Try Again")
            // }

            // dispatch(requestAuthenticate("hoe.ph@greenfeed.com.vn"));
            // dispatch(requestAuthenticate("khiem.nt@greenfeed.com.vn"));
            // dispatch(requestAuthenticated("huy.ndinh@greenfeed.com.vn"));
            dispatch(requestAuthenticated(tempEmailLogin));
        }
    }
    function handleChangeLanguage(lang) {
        i18n.changeLanguage(lang);
    }
    function handleChange(e) {
        setTempEmailLogin(e.target.value)
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
                                <li className={pageName === "TicketRequest" ? "nav-item active-page" : "nav-item"}>
                                    <Link className="nav-link" to="/ticket-request">
                                        <i className="fas fa-car mr-1"></i>
                                        {t("yeucaudatxe")}
                                    </Link>
                                </li>
                                <li className={pageName === "TicketHistory" ? "nav-item active-page" : "nav-item"}>
                                    <Link className="nav-link" to="/ticket-history">
                                        <i className="fas fa-history mr-1"></i>
                                        {t("lichsudatxe")}
                                    </Link>
                                </li>
                                <li
                                    className={pageName === "TicketManagement" ? "nav-item active-page" : "nav-item"}
                                    style={{ display: isShowTicketManagement ? "" : "none" }}
                                >
                                    <Link className="nav-link" to="/ticket-management">
                                        <i className="fas fa-user-cog mr-1"></i>
                                        {t("xulidatxe")}
                                    </Link>
                                </li>
                                <li
                                    style={{ display: isShowAdmin ? "" : "none" }}
                                    className={pageName === "CarManagement" || pageName === "DriverManagement" ? "nav-item dropdown active-page" : "nav-item dropdown"}
                                >
                                    <a className="nav-link dropdown-toggle" href="#" id="navbarDropdownMenuLink" role="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        <i className="fas fa-user-cog mr-1"></i>
                                        {t("admin")}
                                    </a>
                                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                                        <Link to="/driver-management" className="dropdown-item" href="#">{t("quanlitaixe")}</Link>
                                        <Link to="/car-management" className="dropdown-item" href="#">{t("quanlixe")}</Link>
                                        {/* <a className="dropdown-item" href="#">Quản Lí Tài Khoản</a> */}
                                    </div>
                                </li>
                                <li className="nav-item d-flex align-items-center ml-2">
                                    <img onClick={() => handleChangeLanguage("vn")} className="mr-2" style={{ height: "26px", cursor: "pointer" }} src={vnFlag} />
                                    <img onClick={() => handleChangeLanguage("en")} style={{ height: "25px", cursor: "pointer" }} src={usaFlag} />
                                </li>
                            </ul>

                        </div>
                        <form className="form-inline mr-150">
                            <input
                                onChange={handleChange}
                                className="form-control mr-sm-2 form-control-sm"
                                name="email"
                                value={tempEmailLogin}
                                placeholder="Type your email here"
                            />
                            <button
                                className="btn btn-light my-2 my-sm-0 btn-sm"
                                type="button"
                                onClick={() => handleClick(!isAuth ? "login" : "logout")}
                            >
                                {!isAuth ? t("dangnhap") : t("dangxuat")}
                            </button>
                        </form>
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