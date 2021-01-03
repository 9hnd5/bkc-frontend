import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { requestAuthenticate, savePageName } from "../../ActionCreators/appActionCreators";
import { getAllAccount } from "./../../Helpers/login";

export const Home = () => {
    const dispatch = useDispatch();
    const employee = useSelector(state => state.app.employee);
    useEffect(async () => {
        const accounts = await getAllAccount();
        if (accounts && accounts.length > 0) {
            if (!Object.keys(employee).length) {
                console.log("Account still valid");
                dispatch(requestAuthenticate(accounts[0].username));
            }
        }
        dispatch(savePageName("Home"));
    }, []);
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-11 col-xl-11 d-flex justify-content-center">
                    <h4>Xin Vui Lòng Đăng Nhập</h4>
                </div>
            </div>

        </div>
    )
}