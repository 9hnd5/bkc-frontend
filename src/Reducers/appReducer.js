import { SAVE_ACCESSTOKEN, SET_PAGE_ACTIVE } from "../Constants/appConstants";

const initialState = {
    pageActive: "BKC_PAGE",
    accessToken: ""
}
export const appReducer = (state = initialState, action) => {
    switch(action.type){
        case SET_PAGE_ACTIVE:{
            return {
                ...state,
                pageActive: action.pageActive
            }
        }
        case SAVE_ACCESSTOKEN:
            return {
                ...state,
                accessToken: action.accessToken
            }
        default: {
            return{
                ...state
            }
            
        }
    }
}