import { TicketDetail } from "./TicketDetail"
import { TicketInformation } from "./TicketInformation"
import { Location } from './Location'
import { TicketContainerButton } from "./TicketContainerButton"
import { useDispatch, useSelector } from "react-redux"
import { TICKET_STATUS } from "../../Constants/CommonsConstants"
import { addTicketRequest, setLocations, setTicketDetail, updateTicketRequest } from "../../ActionCreators/ticketActionCreator"
import moment from 'moment';
import { useParams } from "react-router-dom"
import { isEmpty } from "lodash"
import { useEffect } from "react"

export const TicketContainer = (props) => {
    const dispatch = useDispatch();
    const { ticketId, action } = useParams();
    const ticketInformation = useSelector(state => state.ticketReducer.ticketInformation);
    const ticketDetail = useSelector(state => state.ticketReducer.ticketDetail);
    const locations = useSelector(state => state.ticketReducer.locations);
    function handleSaveAndSend() {
        if (isEmpty(action)) {
            var ticketAddRequest = {
                employeeId: ticketInformation.employeeId,
                employeeName: ticketInformation.employeeName,
                employeeLineManagerId: ticketInformation.employeeLineManagerId,
                employeeLineManagerName: ticketInformation.employeeLineManagerName,
                employeePhone: ticketInformation.employeePhone,
                employeeBuId: ticketInformation.employeeBuId,
                employeeBuName: ticketInformation.employeeBuName,
                employeeDepartment: ticketInformation.employeeDepartment,
                createDate: moment().format("DD/MM/YYYY"),
                startDate: ticketDetail.startDate,
                endDate: ticketDetail.endDate,
                fromLocation: ticketDetail.fromLocation,
                toLocation: ticketDetail.toLocation,
                totalParticipant: ticketDetail.totalParticipant,
                reasonBooking: ticketDetail.reasonBooking,
                Status: TICKET_STATUS.WAITING,
                locations: locations,
                relatedPeoples: ticketDetail.relatedPeoples
            }
            dispatch(addTicketRequest(ticketAddRequest));
        }
        else {
            if (action === "duplicate") {
                var ticketAddRequest = {
                    employeeId: ticketInformation.employeeId,
                    employeeName: ticketInformation.employeeName,
                    employeeLineManagerId: ticketInformation.employeeLineManagerId,
                    employeeLineManagerName: ticketInformation.employeeLineManagerName,
                    employeePhone: ticketInformation.employeePhone,
                    employeeBuId: ticketInformation.employeeBuId,
                    employeeBuName: ticketInformation.employeeBuName,
                    employeeDepartment: ticketInformation.employeeDepartment,
                    createDate: moment().format("DD/MM/YYYY"),
                    startDate: ticketDetail.startDate,
                    endDate: ticketDetail.endDate,
                    fromLocation: ticketDetail.fromLocation,
                    toLocation: ticketDetail.toLocation,
                    totalParticipant: ticketDetail.totalParticipant,
                    reasonBooking: ticketDetail.reasonBooking,
                    Status: TICKET_STATUS.WAITING,
                    locations: locations,
                    relatedPeoples: ticketDetail.relatedPeoples
                }
                dispatch(addTicketRequest(ticketAddRequest));
            } else if (action === "update") {
                var ticketUpdate = {
                    id: ticketId,
                    employeeId: ticketInformation.employeeId,
                    employeeName: ticketInformation.employeeName,
                    employeeLineManagerId: ticketInformation.employeeLineManagerId,
                    employeeLineManagerName: ticketInformation.employeeLineManagerName,
                    employeePhone: ticketInformation.employeePhone,
                    employeeBuId: ticketInformation.employeeBuId,
                    employeeBuName: ticketInformation.employeeBuName,
                    employeeDepartment: ticketInformation.employeeDepartment,
                    // createDate: moment().format("DD/MM/YYYY"),
                    startDate: ticketDetail.startDate,
                    endDate: ticketDetail.endDate,
                    fromLocation: ticketDetail.fromLocation,
                    toLocation: ticketDetail.toLocation,
                    totalParticipant: ticketDetail.totalParticipant,
                    reasonBooking: ticketDetail.reasonBooking,
                    Status: TICKET_STATUS.WAITING,
                    locations: locations,
                    relatedPeoples: ticketDetail.relatedPeoples
                }
                dispatch(updateTicketRequest(ticketUpdate))
            }
        }

    }
    function handleTempSave() {
        if (isEmpty(action)) {
            var ticketAddRequest = {
                employeeId: ticketInformation.employeeId,
                employeeName: ticketInformation.employeeName,
                employeeLineManagerId: ticketInformation.employeeLineManagerId,
                employeeLineManagerName: ticketInformation.employeeLineManagerName,
                employeePhone: ticketInformation.employeePhone,
                employeeBuId: ticketInformation.employeeBuId,
                employeeBuName: ticketInformation.employeeBuName,
                employeeDepartment: ticketInformation.employeeDepartment,
                createDate: moment().format("DD/MM/YYYY"),
                startDate: ticketDetail.startDate,
                endDate: ticketDetail.endDate,
                fromLocation: ticketDetail.fromLocation,
                toLocation: ticketDetail.toLocation,
                totalParticipant: ticketDetail.totalParticipant,
                reasonBooking: ticketDetail.reasonBooking,
                Status: TICKET_STATUS.DRAFT,
                locations: locations,
                relatedPeoples: ticketDetail.relatedPeoples
            }
            dispatch(addTicketRequest(ticketAddRequest));
        }
        else {
            if (action === "duplicate") {
                var ticketAddRequest = {
                    employeeId: ticketInformation.employeeId,
                    employeeName: ticketInformation.employeeName,
                    employeeLineManagerId: ticketInformation.employeeLineManagerId,
                    employeeLineManagerName: ticketInformation.employeeLineManagerName,
                    employeePhone: ticketInformation.employeePhone,
                    employeeBuId: ticketInformation.employeeBuId,
                    employeeBuName: ticketInformation.employeeBuName,
                    employeeDepartment: ticketInformation.employeeDepartment,
                    createDate: moment().format("DD/MM/YYYY"),
                    startDate: ticketDetail.startDate,
                    endDate: ticketDetail.endDate,
                    fromLocation: ticketDetail.fromLocation,
                    toLocation: ticketDetail.toLocation,
                    totalParticipant: ticketDetail.totalParticipant,
                    reasonBooking: ticketDetail.reasonBooking,
                    Status: TICKET_STATUS.DRAFT,
                    locations: locations,
                    relatedPeoples: ticketDetail.relatedPeoples
                }
                dispatch(addTicketRequest(ticketAddRequest));
            } else if (action === "update") {
                var ticketUpdate = {
                    id: ticketId,
                    employeeId: ticketInformation.employeeId,
                    employeeName: ticketInformation.employeeName,
                    employeeLineManagerId: ticketInformation.employeeLineManagerId,
                    employeeLineManagerName: ticketInformation.employeeLineManagerName,
                    employeePhone: ticketInformation.employeePhone,
                    employeeBuId: ticketInformation.employeeBuId,
                    employeeBuName: ticketInformation.employeeBuName,
                    employeeDepartment: ticketInformation.employeeDepartment,
                    // createDate: moment().format("DD/MM/YYYY"),
                    startDate: ticketDetail.startDate,
                    endDate: ticketDetail.endDate,
                    fromLocation: ticketDetail.fromLocation,
                    toLocation: ticketDetail.toLocation,
                    totalParticipant: ticketDetail.totalParticipant,
                    reasonBooking: ticketDetail.reasonBooking,
                    Status: TICKET_STATUS.DRAFT,
                    locations: locations,
                    relatedPeoples: ticketDetail.relatedPeoples
                }
                dispatch(updateTicketRequest(ticketUpdate));
            }
        }

    }
    useEffect(() => {
        dispatch(setTicketDetail({}));
        dispatch(setLocations([]));
    }, []);
    return (
        <div className="row">
            <div className="col-12 col-xl-12">
                <div className="card">
                    <div className="card-header">
                        <h4>Thông Tin Đặt Xe</h4>
                    </div>
                    <div className="card-body">
                        <TicketInformation />
                        <TicketDetail />
                        <Location />
                        <TicketContainerButton
                            onHandleSaveAndSend={handleSaveAndSend}
                            onHandleTempSave={handleTempSave}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}