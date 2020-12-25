import { useDispatch } from "react-redux";
import { requestAccessToken } from "../../ActionCreators/appActionCreators";
import { login } from "../../Helpers/login"

export const LoginPage = () => {
    const dispatch = useDispatch();
    async function handleClick(){
        // const user = await login();
        if(true){
            dispatch(requestAccessToken("trandoan280367@gmail.com"));
        }
    }
    return (
        <div className="container-fluid">
            <div className="row d-flex justify-content-center mt-5">
                <div onClick={handleClick} className="col-10">
                    <button className="btn btn-info btn-block">Login</button>
                </div>
            </div>
        </div>
    )
}