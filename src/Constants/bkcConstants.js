export const INSERT_BOOKING_DETAIL = "INSERT_BOOKING_DETAIL";
export const UPDATE_BOOKING_DETAIL = "UPDATE_BOOKING_DETAIL";
export const DELETE_BOOKING_DETAIL = "DELETE_BOOKING_DETAIL";
export const TOGGLE_BKC_DETAIL_INSERT = "TOGGLE_BKC_DETAIL_INSERT";
export const INSERT_BOOKER = "INSERT_BOOKER";
export const INSERT_BOOKING_INFOR = "INSERT_BOOKING_INFOR";
export const TOGGLE_BKINFOR_VALID = "TOGGLE_BKINFOR_VALID";
export const TOGGLE_BKDETAIL_VALID = "TOGGLE_BKDETAIL_VALID";
export const EMPTY_BOOKING_INFOR = "EMPTY_BOOKING_INFOR";
export const EMPTY_BOOKING_DETAILS = "EMPTY_BOOKING_DETAILS";
export const SET_LOADING = "SET_LOADING";
export const SAVE_LIST_FILTER_EMPLOYEE = "SAVE_LIST_FILTER_EMPLOYEE";


export const STATUS = {
    WAITING: "Waiting"
}
export const BOOK_INFOR_DEFAULT = {
    pickupTime: null,
    returnTime: null,
    location: null,
    destination: null,
    totalPerson: null,
    ccPersons: null
}
export const BOOKING_DETAIL_DEFAULT = {
    pickupLocation: "",
    pickupTime: "",
    employeeName: "",
    guestName: "",
    phone: "",
    noteByBooker: ""
}
export const BOOKING_DETAIL_DEFAULT1 = {
    pickupLocation: "",
    pickupTime: "",
    employees: "",
    guestName: "",
    phone: "",
    noteByBooker: ""
}
export const BOOKING_INFOR_DEFAULT = {
    moveDate: "",
    returnDate: "",
    location: "",
    destination: "",
    totalPerson: "",
    mailToManager: "",
    reasonBooking: ""
}
