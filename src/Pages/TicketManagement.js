import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTicketsByBuId } from "../ActionCreators/ticketManagementActionCreator";
import { setPageName } from "../ActionCreators/appActionCreator";
import { TicketRequestContainer } from "../Components/TicketManagement/TicketRequestContainer";
import "./TicketManagement.scss";
export const TicketManagement = () => {
    const dispatch = useDispatch();
    const employee = useSelector(state => state.appReducer.employee)
    useEffect(() => {
        dispatch(setPageName("TicketManagement"));
        dispatch(fetchTicketsByBuId(employee.buId));
    })
    return (
        <div className="container-fluid">
            <TicketRequestContainer />
        </div>
    );
}