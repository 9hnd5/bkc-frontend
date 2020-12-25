export const HRAInforCarItem = (props) => {
    const {carDriver} = props;
    return (
        <tr>
            <td>{carDriver.driverName}</td>
            <td>{carDriver.driverPhone}</td>
            <td>{carDriver.carNumber}</td>
            <td>{carDriver.quantity}</td>
            <td>{carDriver.status}</td>
            <td>{carDriver.personBook}</td>
            <td>xxx</td>
            <td>{carDriver.dateBook}</td>
            
            <td>
                <button className="btn btn-success">CHỌN XE</button>
            </td>
        </tr>
    );
}