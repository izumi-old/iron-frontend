import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import unknownProfile from "../assets/unknownProfile.png";
import AuthService from "../../services/auth.service";
import {Container} from "react-bootstrap";
import {required, vFirstName, vLastName,
    vPassportSeriesAndNumber, vPassword, email} from "../../services/validation.service";

class Signup extends Component {
    constructor(props) {
        super(props);
        this.handleRegister = this.handleRegister.bind(this);
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

    handleRegister(e) {
        e.preventDefault();

        this.setState({
            message: "",
            successful: false
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.register(
                this.state.firstName,
                this.state.lastName,
                this.state.passportSeriesAndNumber,
                this.state.email,
                this.state.password
            ).then(() => {
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
                    <img src={unknownProfile} alt="profile-img"
                         className="img-thumbnail align-self-center" width={"256px"}/>

                    <Form onSubmit={this.handleRegister} ref={c => {this.form = c;}}>
                        {!this.state.successful && (
                            <div>
                                <div className="form-group">
                                    <label htmlFor={"lastName"}>Фамилия</label>
                                    <Input type={"text"} name="lastName" className={"form-control"}
                                           value={this.state.lastName} onChange={this.onChangeLastName}
                                           validations={[required, vLastName]}/>

                                    <label htmlFor={"firstName"}>Имя</label>
                                    <Input type={"text"} name={"firstName"} className={"form-control"}
                                           value={this.state.firstName} onChange={this.onChangeFirstName}
                                           validations={[required, vFirstName]}/>
                                </div>

                                <div className={"form-group"}>
                                    <label htmlFor={"passportSeriesAndNumber"}>Номер и серия паспорта (xxxx xxxxxx)</label>
                                    <Input type={"text"} name={"passportSeriesAndNumber"} className={"form-control"}
                                           value={this.state.passportSeriesAndNumber}
                                           onChange={this.onChangePassportSeriesAndNumber}
                                           validations={[required, vPassportSeriesAndNumber]}/>
                                </div>

                                <div className={"form-group"}>
                                    <label htmlFor="email">Электронный почтовый адрес</label>
                                    <Input type={"text"} name={"email"} className={"form-control"}
                                           value={this.state.email} onChange={this.onChangeEmail}
                                           validations={[required, email]}/>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="password">Пароль</label>
                                    <Input type={"password"} name={"password"} className={"form-control"}
                                           value={this.state.password} onChange={this.onChangePassword}
                                           validations={[required, vPassword]}/>
                                </div>

                                <div className="form-group">
                                    <button className="btn btn-primary btn-block">Зарегистрировать</button>
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

export default Signup;
