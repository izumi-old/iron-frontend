import React, { Component } from "react";
import Form from "react-validation/build/form";
import Input from "react-validation/build/input";
import CheckButton from "react-validation/build/button";

import AuthService from "../services/auth.service";
import {Container} from "react-bootstrap";
import {isEmail} from "validator";

const required = value => {
    if (!value) {
        return (
            <div className="alert alert-danger" role="alert">
                Это поле является обязательным для ввода
            </div>
        );
    }
};

const email = value => {
    if (!isEmail(value)) {
        return (
            <div className="alert alert-danger" role="alert">
                Введённый адрес электронной почты некорректен
            </div>
        );
    }
};

const vPassword = value => {
    if (value.length < 3 || value.length > 40) {
        return (
            <div className="alert alert-danger" role="alert">
                Длина пароля должна быть от 3 до 40 символов
            </div>
        );
    }
};

class Login extends Component {
    constructor(props) {
        super(props);
        this.handleLogin = this.handleLogin.bind(this);
        this.onChangeEmail = this.onChangeEmail.bind(this);
        this.onChangePassword = this.onChangePassword.bind(this);

        this.state = {
            email: "",
            password: "",
            loading: false,
            message: ""
        };
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

    handleLogin(e) {
        e.preventDefault();

        this.setState({
            message: "",
            loading: true
        });

        this.form.validateAll();

        if (this.checkBtn.context._errors.length === 0) {
            AuthService.login(this.state.email, this.state.password).then(
                () => {
                    if (!localStorage.getItem("token")) {
                        return;
                    }

                    this.props.history.push("/profile");
                    window.location.reload();
                },
                error => {
                    const resMessage =
                        (error.response &&
                            error.response.data &&
                            error.response.data.message) ||
                        error.message ||
                        error.toString();

                    this.setState({
                        loading: false,
                        message: resMessage
                    });
                }
            );
        } else {
            this.setState({
                loading: false
            });
        }
    }

    render() {
        return (
            <div className="col-md-12">
                <Container className={"w-25"}>
                    <img src="//ssl.gstatic.com/accounts/ui/avatar_2x.png" alt="profile-img"
                        className="img-thumbnail align-self-center" width={"256px"}/>

                    <Form onSubmit={this.handleLogin} ref={c => {this.form = c;}}>
                        <div className="form-group">
                            <label htmlFor="email">Электронный почтовый адрес</label>
                            <Input type={"text"} name={"email"} className={"form-control"} value={this.state.email}
                                   onChange={this.onChangeEmail} validations={[required, email]}/>
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Пароль</label>
                            <Input type={"password"} name={"password"} className={"form-control"}
                                   value={this.state.password} onChange={this.onChangePassword}
                                   validations={[required, vPassword]}/>
                        </div>

                        <div className="form-group">
                            <button className="btn btn-primary btn-block" disabled={this.state.loading}>
                                {this.state.loading && (
                                    <span className="spinner-border spinner-border-sm"/>
                                )}
                                <span>Подтвердить</span>
                            </button>
                        </div>

                        {this.state.message && (
                            <div className="form-group">
                                <div className="alert alert-danger" role="alert">
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

export default Login;
