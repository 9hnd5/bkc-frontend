import React, { useEffect } from 'react';
import './BookingCarHome.scss';
import { MainBtn } from '../../Components/BKC/BKCHomePage/MainBtn';
import { useDispatch, useSelector } from 'react-redux';
import { savePageName } from '../../ActionCreators/appActionCreators';
import { useState } from 'react/cjs/react.development';
import { requestInsertBookingInfor, requestUpdateBookingInfor } from '../../ActionCreators/bkcActionCreators'
import { STATUS } from '../../Constants/bkcConstants';
import { useHistory, useParams } from 'react-router-dom';
import { BookingInfor } from '../../Components/BKC/BKCHomePage/BookingInfor';
import omit from 'lodash/omit'

export const BookingCarHome = (props) => {
    const dispatch = useDispatch();
    const history = useHistory();
    const isRequestSuccess = useSelector(state => state.bkc.isRequestSuccess);
    const { action } = useParams();
    const bookingInforId = useSelector(state => state.app.bookingInforId)
    const [bookingInforLocal, setBookingInforLocal] = useState({});
    const bookingInfors =useSelector(state => state.bh.bookingInfors);
    const booker = useSelector(state => state.bkc.booker);
    const bookingDetail = useSelector(state => state.bkc.bookingDetail);
    const pickupLocations = useSelector(state => state.bkc.pickupLocations)
    const [isDisabledBtnSaveAndSend, setIsDisabledBtnSaveAndSend] = useState(true);
    const [isDisabledBtnTempSave, setIsDisabledBtnTempSave] = useState(true);
    const [isDisplayBtnBack, setIsDisplayBtnBack] = useState(false);
    function handleTempSave() {
        if (action === "update" && bookingInforId) {
            
            const bookingInfor = {
                ...booker,
                ...bookingDetail,
                bookingResult: bookingInfors.find((item) => {
                    return item.id === bookingInforId;
                }).bookingResult,
                relatePersons: bookingDetail.relatePersons,
                pickupLocations: pickupLocations,

            }
            console.log("bookingInfor", bookingInfor);
            dispatch(requestUpdateBookingInfor(bookingInfor));
            return;
        }
        const bookingInfor = {
            ...booker,
            ...omit(bookingDetail, ["id"]),
            bookingResult: {
                status: STATUS.DRAFT
            },
            relatePersons: bookingDetail.relatePersons,
            pickupLocations: pickupLocations,

        }
        console.log("bookingInfor", bookingInfor);
        dispatch(requestInsertBookingInfor(bookingInfor));
    }
    function handleSaveAndSend() {
        if (action === "update") {
            const data = null
            return dispatch(requestUpdateBookingInfor(data));
        }
        const data = {
            booker: {
                ...booker,
                bookingPickupLocations: pickupLocations
            },
            bookingDetail: bookingDetail,
            bookingResult: {
                status: STATUS.WAITING,
                responseByAdmin: null
            },
        }
        return dispatch(requestInsertBookingInfor(data));

    }
    useEffect(() => {
        dispatch(savePageName("BookingCar"))
    });
    useEffect(() => {
        if ((Object.keys(bookingDetail).length > 0) && (pickupLocations.length > 0)) {
            setIsDisabledBtnSaveAndSend(false)
        }
        else {
            setIsDisabledBtnSaveAndSend(true)
        }

        if (Object.keys(bookingDetail).length > 0) {
            setIsDisabledBtnTempSave(false);
        }
        else {
            setIsDisabledBtnTempSave(true);
        }
    }, [bookingDetail, pickupLocations])
    useEffect(() => {
        if ((action === "update" || action === "duplicate") && bookingInforId && bookingInfors.length !== 0) {
            const bookingInfor = bookingInfors.find((item) => {
                return item.id === bookingInforId;
            });
            if (bookingInfor === undefined) alert("Khong tim thay booking infor");
            
            setBookingInforLocal(bookingInfor);
            setIsDisplayBtnBack(true);
        }
    }, [bookingInforId, action])
    // useEffect(()=>{
    //     if(isRequestSuccess) history.push("/history-booking");
    // }, [isRequestSuccess])
    return (
        <div className="container-fluid">
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-xl-12">
                    <div className="card">
                        <div className="card-body">
                            <BookingInfor bookingInfor={bookingInforLocal} />
                            <div className="mt-1"></div>
                            <MainBtn
                                onTempSave={handleTempSave}
                                onSaveAndSend={handleSaveAndSend}
                                disabledBtnSaveAndSend={isDisabledBtnSaveAndSend}
                                disabledBtnTempSave={isDisabledBtnTempSave}
                                isDisplayBtnBack={isDisplayBtnBack}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );

}