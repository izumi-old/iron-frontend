import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import personService from "../../services/person.service";
import AuthService from "../../services/auth.service";
import {Container} from "react-bootstrap";
import {vFirstName, vLastName,
    vPassportSeriesAndNumber, vPassword, email} from "../../services/validation.service";
import Person from "../entity/Person";

class ProfileEdit extends Component {
    constructor(props) {
        super(props);
        this.edit = this.edit.bind(this);
        this.onChangeFirstName = this.onChangeFirstName.bind(this);
        this.onChangeLastName = this.onChangeLastName.bind(this);
        this.onChangePassportSeriesAndNumber = this.onChangePassportSeriesAndNumber.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            firstName: "",
            lastName: "",
            passportSeriesAndNumber: "",
            email: "",
            password: "",
            successful: false,
            message: ""
        };
    }

    onChangeFirstName(e) {
        this.setState({
            firstName: e.target.value
        });
    }

    onChangeLastName(e) {
        this.setState({
            lastName: e.target.value
        });
    }

    onChangePassportSeriesAndNumber(e) {
        this.setState({
            passportSeriesAndNumber: e.target.value
        });
    }

    onChangeEmail(e) {
        this.setState({
            email: e.target.value
        });
    }

    onChangePassword(e) {
        this.setState({
            password: e.target.value
        });
    }

    edit(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        let currentPerson = AuthService.getCurrentPerson();

        if (this.checkBtn.context._errors.length === 0) {
            personService.update(new Person(currentPerson.id,
                this.state.firstName ? this.state.firstName : null,
                this.state.lastName ? this.state.lastName : null, null,
                this.state.email ? this.state.email : null, null,
                this.state.password ? this.state.password : null, null,
                null, null, null))
            .then(() => {
                    this.setState({
                        message: "Успешно",
                        successful: true
                    });
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        successful: false,
                        message: resMessage
                    });
                }
            );
        }
    }

    render() {
        return (
            <div className="col-md-12">
                <Container className={"w-25"}>
                    <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img"
                         className="img-thumbnail align-self-center" width={"256px"}/>

                    <Form onSubmit={this.edit} ref={c => {this.form = c;}}>
                        {!this.state.successful && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor={"lastName"}>Фамилия</label>
                                    <Input type={"text"} name="lastName" className={"form-control"}
                                           value={this.state.lastName} onChange={this.onChangeLastName}
                                           validations={[vLastName]}/>

                                    <label htmlFor={"firstName"}>Имя</label>
                                    <Input type={"text"} name={"firstName"} className={"form-control"}
                                           value={this.state.firstName} onChange={this.onChangeFirstName}
                                           validations={[vFirstName]}/>
                                </div>

                                <div className={"form-group"}>
                                    <label htmlFor={"passportSeriesAndNumber"}>Номер и серия паспорта (xxxx xxxxxx)</label>
                                    <Input type={"text"} name={"passportSeriesAndNumber"} className={"form-control"}
                                           value={this.state.passportSeriesAndNumber}
                                           onChange={this.onChangePassportSeriesAndNumber}
                                           validations={[vPassportSeriesAndNumber]}/>
                                </div>

                                <div className={"form-group"}>
                                    <label htmlFor="email">Электронный почтовый адрес</label>
                                    <Input type={"text"} name={"email"} className={"form-control"}
                                           value={this.state.email} onChange={this.onChangeEmail}
                                           validations={[email]}/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Пароль</label>
                                    <Input type={"password"} name={"password"} className={"form-control"}
                                           value={this.state.password} onChange={this.onChangePassword}
                                           validations={[vPassword]}/>
                                </div>

                                <div className="form-group">
                                    <button className="btn btn-primary btn-block">Обновить</button>
                                </div>
                            </div>
                        )}

                        {this.state.message && (
                            <div className="form-group">
                                <div className={this.state.successful
                                    ? "alert alert-success"
                                    : "alert alert-danger"}
                                     role="alert">
                                    {this.state.message}
                                </div>
                            </div>
                        )}
                        <CheckButton style={{ display: "none" }} ref={c => {this.checkBtn = c;}}/>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default ProfileEdit;
