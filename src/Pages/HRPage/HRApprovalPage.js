import { useParams } from "react-router-dom";
import { HRAButtons } from "../../Components/HR/HRApprovalPage/HRAButtons";
import { HRAInformation } from "../../Components/HR/HRApprovalPage/HRAInformation";
import { HRAInforCarList } from "../../Components/HR/HRApprovalPage/HRAInforCarList"
import "./HRApprovalPage.scss";
const HRApprovalPage = () => {
    const { inforId } = useParams();
    return (
        <div className="container-fluid">
            <div className="row d-flex justify-content-center">
                <div className="col-12 col-xl-12">
                    <div className="card">
                        <div className="card-body">
                            <HRAInformation inforId={inforId} />
                            <div className="mt-1"></div>
                            <HRAInforCarList inforId={inforId} />
                            <div className="mt-1"></div>
                            <HRAButtons />
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}
export default HRApprovalPage;