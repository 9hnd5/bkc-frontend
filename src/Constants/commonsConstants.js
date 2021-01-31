export const END_POINT = "https://localhost:5001/api"
// export const END_POINT = "http://192.168.170.82:5001/api"
// export const END_POINT = "https://idcgfvnprts01.greenfeed.com.vn:5002/api"
export const HTTP_METHOD = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE",
    PATCH: "PATCH"
}
export const CAR_STATUS = {
    BOOKED: "Booked",
    FREE: "Free"
}
export const BOOKING_DETAIL_DEFAULT = {
    startDate: "",
    endDate: "",
    fromLocation: "",
    toLocation: "",
    totalParticipant: "",
    relatedPeoples: [],
    reasonBooking: ""
}
export const LOCATION_DEFAULT = {
    place: "",
    time: "",
    participants: [],
    guestName: "",
    phone: "",
    note: "",
}

export const TICKET_STATUS = {
    APPROVED: "APPROVED",
    REJECTED: "REJECTED",
    DRAFT: "DRAFT",
    WAITING: "WAITING"
}
export const TICKET_IS_FINISH = {
    
}
export const CAR_ADD_DEFAULT = {
    number: "",
    totalSeat: "",
    buName: "",
    buId: "",
    currentLocation: "",
    manufactured: "",
    name: ""
}
export const DRIVER_ADD_DEFAULT = {
    employeeName: "",
    employeeId: "",
    employeePhone: "",
    employeeEmail: "",
    employeeBuId: "",
    employeeBuName: "",
    carId: -1,
    car: undefined
}
export const ROLE = {
    SUPER_ADMIN: "SUPERADMIN",
    ADMIN: "ADMIN",
    MEMBER: "MEMBER"
}