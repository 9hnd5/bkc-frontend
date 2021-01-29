import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchTicketsByBuId, fetchDriversByBuId } from "../ActionCreators/adminActionCreator";
import { setPageName } from "../ActionCreators/appActionCreator";
import { TicketRequestContainer } from "../Components/Admin/TicketRequestContainer";
import "./Admin.scss";
export const TicketManagement = () => {
    const dispatch = useDispatch();
    const employee = useSelector(state => state.appReducer.employee)
    useEffect(() => {
        dispatch(setPageName("TicketManagement"));
        dispatch(fetchTicketsByBuId(employee.buId));
        dispatch(fetchDriversByBuId(employee.buId))
    })
    return (
        <div className="container-fluid">
            <TicketRequestContainer />
        </div>
    );
}