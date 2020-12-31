// import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { requestAuthenticate, saveAccessToken, saveAuthenticate, saveEmployee } from '../../ActionCreators/appActionCreators';
import { login, logout } from '../../Helpers/login';
function Nav() {
    const history = useHistory();
    const dispatch = useDispatch();
    const user = useSelector(state => state.app.user);
    const isAuth = useSelector(state => state.app.isAuth);
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
                <div className="col-11 col-xl-11">
                    <nav className="navbar navbar-expand-lg navbar-light bg-success">
                        <a className="navbar-brand">BOOKING CAR APP</a>
                        <div className="collapse navbar-collapse" id="navbarSupportedContent">
                            <ul className="navbar-nav mr-auto">
                                <li className="nav-item">
                                    <Link className="nav-link" to="/">Home Page</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/historybooking">History Booking</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/bookingcar">Booking Car</Link>
                                </li>
                                <li className="nav-item">
                                    <Link className="nav-link" to="/hr-page">HR</Link>
                                </li>
                            </ul>

                            <button
                                onClick={() => handleClick(!isAuth ? "login" : "logout")}
                                className="btn btn-outline-primary btn-sm my-2 my-sm-0">{!isAuth ? "Log in" : "Log out"}
                            </button>

                        </div>
                    </nav>
                </div>
            </div>
        </div>
    );
}
export default Nav