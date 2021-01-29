import "./BookingRequest.scss"
import { TicketContainer } from "../Components/BookingRequest/TicketContainer"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setPageName } from "../ActionCreators/appActionCreator"

export const BookingRequest = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(setPageName("TicketRequest"));
    })
    return(
        <div className="container-fluid">
            <TicketContainer />
        </div>
    )
}