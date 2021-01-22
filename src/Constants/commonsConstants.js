export const END_POINT = "https://localhost:5001/api"
export const HTTP_METHOD = {
    GET: "GET",
    POST: "POST",
    PUT: "PUT",
    DELETE: "DELETE"
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