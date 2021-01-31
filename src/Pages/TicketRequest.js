import "./TicketRequest.scss"
import { TicketContainer } from "../Components/TicketRequest/TicketContainer"
import { useEffect } from "react"
import { useDispatch } from "react-redux"
import { setPageName } from "../ActionCreators/appActionCreator"

export const TicketRequest = () => {
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