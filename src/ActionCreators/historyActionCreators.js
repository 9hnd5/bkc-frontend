// export const saveBookerBkInforBkDetail = (bookerBkInforBkDetails) => {
//     return{
//         type: SAVE_BOOKER_BOOKING_DETAILS,
//         bookerBkInforBkDetails
//     }
// }

// export const fetchBookerBkInforBkDetail = (buId) => {
//     return async dispatch => {
//         const res = await callApi(`https://localhost:5001/api/bkc/`+buId, "POST", null);
//         const bookerBkInforBkDetails = []
//         res.data.forEach(element => {
//             const data = {
//                 booker: element.booker,
//                 bookingInfor: element.bookingInfor,
//                 bookingDetails: element.bookingDetails
//             }
//             bookerBkInforBkDetails.push(data);
//         });
//         console.log("bk", bookerBkInforBkDetails);
//         dispatch(saveBookerBkInforBkDetail(bookerBkInforBkDetails))
//     }
// }