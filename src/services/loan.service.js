import axios from 'axios';
import authHeader from './headers';
import {API_URL} from "../App";

class LoanService {
    getLoansPaginated(page, size) {
        return axios
            .get(API_URL + "/loans?page=" + page + "&size=" + size, {headers: authHeader()})
            .then(response => {
                return {
                    pageNumber: response.data.number,
                    totalPages: response.data.totalPages,
                    content: response.data.content,
                    totalElements: response.data.totalElements,
                    numberOfElements: response.data.numberOfElements
                };
            });
    }
}

export default new LoanService();
