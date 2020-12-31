import React from 'react';
import './BKCHome.scss';
import { MainBtn } from '../../Components/BKC/BKCHomePage/MainBtn';
import { BookerInfor } from '../../Components/BKC/BKCHomePage/BookerInfor';
import { BookInfor } from '../../Components/BKC/BKCHomePage/BookInfor';
import { BookDetail } from '../../Components/BKC/BKCHomePage/BookDetail'
// import { useSelector } from 'react-redux';
// import { useHistory } from 'react-router-dom';
export const BKCHome = (props) => {
    // const user = useSelector(state => state.app.user);
    // const history = useHistory();
    // console.log("user", user);
    // if (Object.keys(user).length == 0) {
    //     alert("Please Login To Go This Page");
    //     history.push("/");
    //     return (
    //         <div>please login</div>
    //     )

    // }

    return (
        <div className="container-fluid">
            <div className="row d-flex justify-content-center">
                <div className="col-11 col-xl-11">
                    <div className="card">
                        <div className="card-body">
                            <BookerInfor />
                            <div className="mt-2"></div>
                            <BookInfor />
                            <div className="mt-2"></div>
                            <BookDetail />
                            <div className="mt-2"></div>
                            <MainBtn />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );

}