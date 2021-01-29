
const formatPhoneNumber = phone => {
    let result = phone&&phone.split("");
    if (result) {
        if (result[0] === "8" && result[1] === "4") {
            return result.join("");
        } else {
            result && result.unshift("0");
            return result.join("");
        }
    }
}
export default formatPhoneNumber;