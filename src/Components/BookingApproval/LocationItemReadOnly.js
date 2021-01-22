import { Fragment } from "react";

export const LocationItemReadOnly = (props) => {
    const {locationItem, no} = props;
    return(
        <Fragment>
            <tr>
                <td>{no}</td>
                <td>{locationItem.place}</td>
                <td>{locationItem.time}</td>
                <td>{locationItem.participants.map(item => {
                    return item.employeeName
                }).join(", ")}</td>
                <td>{locationItem.guestName}</td>
                <td>{locationItem.phone}</td>
                <td>{locationItem.note}</td>
            </tr>
        </Fragment>
    );
}