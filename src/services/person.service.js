import axios from 'axios';
import authHeader from './headers';
import {API_URL} from "../App";

class PersonService {
    getPerson(id) {
        return axios.get(API_URL + "/person/" + id, {headers: authHeader()})
            .then(response => {
                return response.data;
            });
    }

    getPersonsByRole(role, page, size) {
        return axios.get(API_URL + "/persons/filtered?role=" + role + "&page=" + page + "&size=" + size,
            {headers: authHeader()})
            .then(response => {
                return response.data;
            });
    }

    update(person) {
        return axios.patch(API_URL + "/person", person, {headers: authHeader()})
            .then(response => {
                return response.data;
            });
    }
}

export default new PersonService();
export const GET_ROLES_AS_STRING = (person) => {
    let roleNames = [];
    person.roles.forEach((role) => {
        roleNames.push(role.name);
    });
    return roleNames.join(" ");
};
