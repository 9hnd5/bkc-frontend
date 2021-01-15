import React, { useEffect } from 'react';
import './BookingCarHome.scss';
import { MainBtn } from '../../Components/BKC/BKCHomePage/MainBtn';
import { Booker } from '../../Components/BKC/BKCHomePage/Booker';
import { BookingDetail } from '../../Components/BKC/BKCHomePage/BookingDetail';
import { useDispatch, useSelector } from 'react-redux';
import { savePageName } from '../../ActionCreators/appActionCreators';
import { useState } from 'react/cjs/react.development';
import { requestBooking, requestUpdateBooking } from '../../ActionCreators/bkcActionCreators'
import { STATUS } from '../../Constants/bkcConstants';
import { useParams } from 'react-router-dom';
import { BookingInfor } from '../../Components/BKC/BKCHomePage/BookingInfor';
import { PickupLocation } from '../../Components/BKC/BKCHomePage/PickupLocation';


export const BookingCarHome = (props) => {
    const bookerId = useSelector(state => state.app.bookerId);
    const { action } = useParams();
    const dispatch = useDispatch();
    const [booker, setBooker] = useState({});
    const [bookingInfor, setBookingInfor] = useState({});
    const [bookingDetails, setBookingDetails] = useState([]);
    const [isDisabledBtnSaveAndSend, setIsDisabledBtnSaveAndSend] = useState(true);
    const [isDisabledBtnTempSave, setIsDisabledBtnTempSave] = useState(true);
    const isDisplayBtnBack = (action && bookerId) ? true : false;
    function handleTempSave() {
        if (action === "update" && bookerId) {
            const data = {
                booker: {
                    ...booker,
                    id: bookerId,
                    bookingPickupLocations: bookingDetails
                },
                bookingInfor: bookingInfor,
                bookingResult: {
                    status: STATUS.DRAFT,
                    responseByAdmin: null
                },
            }
            return dispatch(requestUpdateBooking(data));
        }
        const data = {
            booker: {
                ...booker,
                bookingPickupLocations: bookingDetails
            },
            bookingInfor: bookingInfor,
            bookingResult: {
                status: STATUS.DRAFT,
                responseByAdmin: null
            },
        }
        dispatch(requestBooking(data));
    }
    function handleSaveAndSend() {
        if (action === "update" && bookerId) {
            const data = null
                
            return dispatch(requestUpdateBooking(data));
        }
        const data = {
            booker: {
                ...booker,
                bookingPickupLocations: bookingDetails
            },
            bookingInfor: bookingInfor,
            bookingResult: {
                status: STATUS.WAITING,
                responseByAdmin: null
            },
        }
        return dispatch(requestBooking(data));

    }
    function handleGetBookingInfor(bookingInfor) {
        setBookingInfor(bookingInfor);
    }
    function handleGetBookingDetails(bookingDetails) {
        setBookingDetails(bookingDetails)
    }
    function handleGetBooker(booker) {
        setBooker(booker);
    }
    useEffect(() => {
        dispatch(savePageName("BookingCar"))
    });
    useEffect(() => {
        if ((Object.keys(bookingInfor).length > 0) && (bookingDetails.length > 0)) {
            setIsDisabledBtnSaveAndSend(false)
        }
        else {
            setIsDisabledBtnSaveAndSend(true)
        }

        if (Object.keys(bookingInfor).length > 0) {
            setIsDisabledBtnTempSave(false);
        }
        else {
            setIsDisabledBtnTempSave(true);
        }
    }, [bookingInfor, bookingDetails])
    return (
        <div className="container-fluid">
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-xl-12">
                    <div className="card">
                        <div className="card-body">
                            {/* <Booker
                                onGetBooker={handleGetBooker}
                            />
                            <div className="mt-1"></div>
                            <BookingDetail
                                onGetBookingInfor={handleGetBookingInfor}
                                bookerId={bookerId}
                            />
                            <div className="mt-1"></div>
                            <PickupLocation
                                onGetBookingDetails={handleGetBookingDetails}
                                bookerId={bookerId}
                                totalPerson={bookingInfor.totalPerson}
                                bookingDetails={bookingDetails}
                            />
                            <div className="mt-1"></div>
                            <MainBtn
                                onTempSave={handleTempSave}
                                onSaveAndSend={handleSaveAndSend}
                                disabledBtnSaveAndSend={isDisabledBtnSaveAndSend}
                                disabledBtnTempSave={isDisabledBtnTempSave}
                                isDisplayBtnBack={isDisplayBtnBack}
                            />
                            <div className="mt-1"></div> */}
                            <BookingInfor />
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