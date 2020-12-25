import { useParams } from "react-router-dom";
import { HRAButtons } from "../../Components/HR/HRApprovalPage/HRAButtons";
import { HRAInformation } from "../../Components/HR/HRApprovalPage/HRAInformation";
import { HRAInforCarList } from "../../Components/HR/HRApprovalPage/HRAInforCarList"
import "./HRApprovalPage.scss";
const HRApprovalPage = () => {
    const { id } = useParams();
    return (
        <div className="container-fluid">
            <div className="row d-flex justify-content-center">
                <div className="col-xs-12 col-xl-10">
                    <div className="card">
                        <div className="card-body">
                            <div className="mt-4 mb-4"></div>
                            <HRAInformation id={id} />
                            <div className="mt-5 mb-5"></div>
                            <HRAInforCarList />
                            <div className="mt-5 mb-5"></div>
                            <HRAButtons />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
export default HRApprovalPage;