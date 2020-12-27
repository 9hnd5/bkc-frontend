import { useDispatch } from "react-redux";
import { toggleBkcDetailModalInsert } from "../../../ActionCreators/bkcActionCreators";
import { BookDetailBtn } from "./BookDetailBtn";
import { BookDetailTable } from "./BookDetailTable";
import {ModalInsertBookDetail} from "./ModalInsertBookDetail";

export const BookDetail = () => {
    const dispatch = useDispatch();
    function handleClick() {
        dispatch(toggleBkcDetailModalInsert());
    }
    return (
        <div className="row">
            <div className="col-12">
                <div className="card">
                    <div className="card-header">
                        THÔNG TIN NGƯỜI ĐI
                    </div>
                    <div className="card-body">
                        <BookDetailTable />
                        <div className="w-100 mt-2 mb-2"></div>
                        <BookDetailBtn onClick={handleClick} />
                        <ModalInsertBookDetail />
                    </div>
                </div>
            </div>
        </div>
    );
}