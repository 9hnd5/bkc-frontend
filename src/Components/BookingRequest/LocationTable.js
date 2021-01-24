import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { HTTP_METHOD, END_POINT } from "../../Constants/CommonsConstants";
import { callApi } from "./../../Helpers/callApi";
import isEmpty from "lodash/isEmpty";
import { ModalAddLocation } from "./ModalAddLocation";
import { LocationItem } from "./LocationItem";
import { setLocations } from './../../ActionCreators/ticketActionCreator'
import { remove } from "lodash";
import { useParams } from "react-router-dom";
export const LocationTable = (props) => {
    const { ticketId } = useParams();
    const tickets = useSelector(state => state.bookingHistoryReducer.tickets);
    const dispatch = useDispatch();
    const { t } = useTranslation();
    const [locationLocals, setLocationLocals] = useState([]);
    const diplayLocation = locationLocals.map((location, index) => {
        return <LocationItem
            key={index}
            no={index + 1}
            location={location}
            onSaveUpdate={handleUpdateLocation}
            onDelete={handleDeleteLocation}
        />
    });
    function handleModalSave(location) {
        location.id = locationLocals.length;
        setLocationLocals([...locationLocals, location]);
    }
    function handleUpdateLocation(location) {
        const index = locationLocals.findIndex((item) => {
            return item.id === location.id;
        });
        if (index > -1) {
            const newLocationLocals = [...locationLocals];
            newLocationLocals[index] = location;
            setLocationLocals(newLocationLocals)
        }
    }
    function handleDeleteLocation(location) {
        const newLocationLocals = [...locationLocals];
        remove(newLocationLocals, item => {
            return item.id === location.id;
        });
        for (let i = 0; i < newLocationLocals.length; i++) {
            newLocationLocals[i].id = i;
        }
        setLocationLocals(newLocationLocals);

    }
    useEffect(() => {
        dispatch(setLocations(locationLocals))
    }, [locationLocals]);
    useEffect(() => {
        const ticket = tickets.find(item => {
            return item.id === +ticketId
        })
        if (ticket) {
            const locations = ticket.locations.map((location, index) => {
                return {
                    ...location,
                    id: index
                }
            });
            setLocationLocals(locations);
        }
    }, [tickets]);
    return (
        <div className="row">
            <div className="col-12 col-xl-12">
                <div className="table-responsive location_table_responsive">
                    <table className="table table-sm table-striped table-bordered table_detail">
                        <thead>
                            <tr>
                                <th scope="col" className="w_4" >{t("sothutu")}</th>
                                <th scope="col" className="w_12" >{t("diadiemdon")}</th>
                                <th scope="col" className="w_12" >{t("giodon")}</th>
                                <th scope="col" className="w_12" >{t("nhanvien")}</th>
                                <th scope="col" className="w_12" >{t("khach")}</th>
                                <th scope="col" className="w_12" >{t("sodienthoai")}</th>
                                <th scope="col" className="w_12" >{t("ghichu")}</th>
                                <th scope="col" className="w_12" >{t("hanhdong")}</th>
                            </tr>
                        </thead>
                        <tbody>
                            {diplayLocation}
                        </tbody>
                    </table>
                </div>
                <ModalAddLocation onSave={handleModalSave} />
            </div>
        </div>
    );
}