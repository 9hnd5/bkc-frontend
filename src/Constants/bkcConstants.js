export const TOGGLE_BKC_DETAIL_INSERT = "TOGGLE_BKC_DETAIL_INSERT";
export const SET_LOADING = "SET_LOADING";
export const SAVE_LIST_FILTER_EMPLOYEE = "SAVE_LIST_FILTER_EMPLOYEE";
export const SET_BOOKER = "SET_BOOKER";
export const SET_BOOKING_DETAIL = "SET_BOOKING_DETAIL";
export const SET_PICKUP_LOCATIONS = "SET_PICKUP_LOCATIONS";


export const STATUS = {
    WAITING: "Waiting",
    DRAFT: "Draft",
    SUCCESS: "Success",
    REJECT: "Reject"
}
export const BOOK_INFOR_DEFAULT = {
    pickupTime: null,
    returnTime: null,
    location: null,
    destination: null,
    totalPerson: null,
    ccPersons: null
}
export const BOOKING_DETAIL_DEFAULT1 = {
    pickupLocation: "",
    pickupTime: "",
    employees: [],
    guestName: "",
    phone: "",
    noteByBooker: ""
}
export const BOOKING_DETAIL_DEFAULT = {
    moveDate: "",
    returnDate: "",
    location: "",
    destination: "",
    totalPerson: "",
    relatePersons: [],
    reasonBooking: ""
}
