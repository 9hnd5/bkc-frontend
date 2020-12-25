import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import BKCDetail from '../../Components/BKC/BKCHomePage/BKCDetail';
import BKCFormInfor from '../../Components/BKC/BKCHomePage/BKCFormInfor';
import { BKC_FORM_INFOR_DEFAULT } from '../../Constants/bkcConstants';
import { callApi } from '../../Helpers/callApi';
import { randomId } from '../../Helpers/randomId';
import './BKCHomePage.scss';
import BKCButton from '../../Components/BKC/BKCHomePage/BKCButton';
import { fetchUserRequest } from '../../ActionCreators/bkcActionCreators';
function BKCHomePage(props) {
    const dispatch = useDispatch();
    const user = useSelector(state => state.bkc.user);
    let bkcDetails = useSelector(state => state.bkc.bkcDetails);
    const [bkcFormInfor, setBkcFormInfor] = useState(BKC_FORM_INFOR_DEFAULT);
    function handleChangeBkcFormInfor(e) {
        setBkcFormInfor({
            ...bkcFormInfor,
            [e.target.name]: e.target.value
        });
    }
    useEffect(() => {
        dispatch(fetchUserRequest());
    }, []);
    function handleClick(event) {
        const id = randomId();
        bkcFormInfor.id = id;
        bkcDetails = bkcDetails.map(bkcDetail => {
            return {
                ...bkcDetail,
                idBook: id
            }
        });
        switch (event) {
            case "save": {
                callApi("http://localhost:3001/bkcRequest", "POST", bkcFormInfor);
                callApi("http://localhost:3001/bkcReqDetail", "POST", bkcDetails)
                break;
            }
            default: {
                break;
            }
        }
    }
    useEffect(() => {
        setBkcFormInfor({
            ...BKC_FORM_INFOR_DEFAULT,
            name: user.name,
            phone: user.phone,
        })
    }, [user]);
    return (
        <div className="container-fluid">
            <div className="row d-flex justify-content-center">
                <div className="col-xs-12 col-xl-10">
                    <div className="card">
                        <div className="card-body">
                            <div className="mt-4 mb-4"></div>
                            <BKCFormInfor bkcFormInfor={bkcFormInfor} onChange={handleChangeBkcFormInfor} />
                            <div className="mt-5 mb-5"></div>
                            <BKCDetail />
                            <div className="mt-5 mb-5"></div>
                            <BKCButton onClick={handleClick} />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
export default BKCHomePage;