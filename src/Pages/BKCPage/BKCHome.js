import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import './BKCHome.scss';
import {MainBtn} from '../../Components/BKC/BKCHomePage/MainBtn';
import { fetchEmpRequest } from '../../ActionCreators/bkcActionCreators';
import { BookerInfor } from '../../Components/BKC/BKCHomePage/BookerInfor';
import { BookInfor } from '../../Components/BKC/BKCHomePage/BookInfor';
import { BookDetail } from '../../Components/BKC/BKCHomePage/BookDetail'
export const BKCHome = (props) => {
    const dispatch = useDispatch();
    // const user = useSelector(state => state.bkc.user);
    let bkcDetails = useSelector(state => state.bkc.bkcDetails);
    useEffect(() => {
        dispatch(fetchEmpRequest());
    }, []);
    // function handleClick(event) {
    //     const id = randomId();
    //     bkcFormInfor.id = id;
    //     bkcDetails = bkcDetails.map(bkcDetail => {
    //         return {
    //             ...bkcDetail,
    //             idBook: id
    //         }
    //     });
    //     switch (event) {
    //         case "save": {
    //             callApi("http://localhost:3001/bkcRequest", "POST", bkcFormInfor);
    //             callApi("http://localhost:3001/bkcReqDetail", "POST", bkcDetails)
    //             break;
    //         }
    //         default: {
    //             break;
    //         }
    //     }
    // }
    // useEffect(() => {
    //     setBkcFormInfor({
    //         ...BKC_FORM_INFOR_DEFAULT,
    //         name: user.name,
    //         phone: user.phone,
    //     })
    // }, [user]);
    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-12 col-xl-12">
                    <div className="card">
                        <div className="card-body">
                            <BookerInfor />
                            <div className="mt-4"></div>
                            <BookInfor />
                            <div className="mt-4"></div>
                            <BookDetail />
                            <div className="mt-4"></div>
                            <MainBtn />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}