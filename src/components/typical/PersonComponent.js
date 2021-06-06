import React, {Component} from 'react';
import {Container} from "react-bootstrap";

class PersonComponent extends Component {
    constructor(props) {
        super(props);

        let person = props.person;
        this.state = {
            id: person.id,
            firstName: person.firstName,
            lastName: person.lastName,
            patronymic: person.patronymic,
            email: person.email,
            latestSignInDate: person.latestSignInDate,
            roles: person.roles,
            banned: person.banned
        };
    }

    render() {
        return (
            <Container>
                <p>Имя: {this.state.firstName}</p>
                <p>Фамилия: {this.state.lastName}</p>
                <p>Отчество: {this.state.patronymic ? this.state.patronymic : "-"}</p>
                <p>Адрес электронной почты: {this.state.email}</p>
                <p>Дата последнего посещения: {this.state.latestSignInDate}</p>
                <p>{this.state.banned ? "Заблокирован" : "Не заблокирован"}</p>
            </Container>
        );
    }
}

export default PersonComponent;
