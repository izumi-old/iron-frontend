import axios from 'axios';
import authHeader from './headers';
import {API_URL} from "../App";

class CaseService {
    getCasesByStatuses(bankStatus, clientStatus, page, size) {
        return axios.get(API_URL + "/cases/filtered?bankStatus=" + bankStatus + "&clientStatus=" + clientStatus +
            "&page=" + page + "&size=" + size, {headers: authHeader()})
            .then(response => {
                return response.data;
            });
    }

    update(aCase) {
        return axios.patch(API_URL + "/case", aCase, {headers: authHeader()})
            .then(response => {
                return response.data;
            });
    }

    create(aCase) {
        return axios.post(API_URL + "/case", aCase, {headers: authHeader()})
            .then(response => {
                return response.data;
            });
    }
}

export default new CaseService();
export const STATUS_PENDING = "PENDING";
export const STATUS_APPROVED = "APPROVED";
export const STATUS_REJECTED = "REJECTED";
