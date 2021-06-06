import axios from "axios";
import personService from "./person.service";
import authHeader from "./headers";
import {API_URL} from "../App";

class AuthService {
    login(email, password) {
        return axios
            .post(API_URL + "/login", {
                email,
                password
            })
            .then(response => {
                let token = response.headers.authorization;
                if (token) {
                    localStorage.setItem("token", token);
                }
            })
            .then(() => {
                return personService.getPerson("current");
            })
            .then(response => {
                localStorage.setItem("person", JSON.stringify(response));
            });
    }

    logout() {
        localStorage.removeItem("token");
        localStorage.removeItem("person");
    }

    register(firstName, lastName, passportSeriesAndNumber, email, password) {
        return axios.post(API_URL + "/person", {
            firstName,
            lastName,
            passportSeriesAndNumber,
            email,
            password
        }, {headers: authHeader()});
    }

    getCurrentPerson() {
        return JSON.parse(localStorage.getItem("person"));
    }
}

export default new AuthService();
