import axios from 'axios';
export const callApi = (url, method, data) => {
    return axios({
        method: method,
        url: url,
        data: data
    }).catch((error) => {
        console.log(`Error when call API ${url}: `, error);
    });
}