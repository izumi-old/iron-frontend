import React, { Component } from "react";
import AuthService from "../services/auth.service";
import {Button, Container} from "react-bootstrap";
import {LOGGING_ENABLED} from "../App";

class Profile extends Component {
    constructor(props) {
        super(props);

        this.state = {
            person: AuthService.getCurrentPerson()
        };

        if (LOGGING_ENABLED) {
            console.log("current person: ");
            console.log(this.state.person);
        }

        this.edit = this.edit.bind(this);
    }

    edit() {
        this.props.history.push("/persons");
        window.location.reload();
    }

    render() {
        return (
            <Container>
                <Button onClick={this.edit}>Редактировать</Button>
                <hr className={"style1"}/>
                <header className={"Jumbotron"}>
                    <h3>
                        <strong>{this.state.person.firstName} {this.state.person.lastName}
                            {this.state.person.patronymic ? this.state.person.patronymic : ""}</strong> профиль
                    </h3>
                </header>
                <p>
                    <strong>Адрес электронной почты: </strong>{this.state.person.email}
                </p>
                <br/>
                <strong>Роли:</strong>
                <ul>
                    {this.state.person.roles.map((role, index) => <li key={index}>{role.name}</li>)}
                </ul>
            </Container>
        );
    }
}

export default Profile;
