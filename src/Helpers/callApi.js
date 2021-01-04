import axios from 'axios';
export const callApi = (url, method, data) => {
    return axios({
        method: method,
        url: url,
        data: data
    }).catch((error) => {
        if (error.response) {
            return {
                status: error.response.status,
                data: error.response.data
            }
        }else if (error.request) {
            return {
                status: 0,
                data: "Chet Server"
            }
        } else return  {
            status: 1,
            data: error.message
        }
    });
}