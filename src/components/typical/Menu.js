import React, {Component} from "react";
import {Container, Row, Col, Navbar} from "react-bootstrap";
import logo from "../../logo.svg";
import {Link} from "react-router-dom";
import AuthService from "../../services/auth.service";

class Menu extends Component {
    constructor(props) {
        super(props);
        this.logOut = this.logOut.bind(this);
        this.hasRole = this.hasRole.bind(this);

        this.state = {
            showManagerBoard: false,
            showAdminBoard: false,
            person: undefined,
        };
    }

    componentDidMount() {
        const person = AuthService.getCurrentPerson();

        if (person) {
            this.setState({
                person: person,
                showManagerBoard: this.hasRole(person, "MANAGER"),
                showAdminBoard: this.hasRole(person, "ADMIN")
            });
        }
    }

    hasRole(person, role) {
        let result = false;
        person.roles.some((role0) => {
            let localResult = role0.name === role;
            if (localResult) {
                result = true;
                return true;
            }
            return false;
        });
        return result;
    }

    logOut() {
        AuthService.logout();
        window.location.href = "/";
    }

    render() {
        const { person, showManagerBoard, showAdminBoard } = this.state;

        return (
            <Container>
                <Row>
                    <Navbar bg="dark" variant="dark">
                        <Col sm={2}>
                            <Link to={"/"} className={"nav-link"}>
                                <Navbar.Brand>
                                    <img src={logo} height="32px" width="32px" alt="logo" />
                                    Железный банк
                                </Navbar.Brand>
                            </Link>
                        </Col>
                        <Col sm={8}>
                            <Navbar className={"d-flex justify-content-center"}>
                                <Link to={"/"} className={"nav-link text-center"}>
                                    Главная
                                </Link>
                                <Link to={"/contacts"} className={"nav-link text-center"}>
                                    Связаться
                                </Link>

                                {person && (
                                    <Link to={"/client"} className={"nav-link text-center"}>
                                        Клиент
                                    </Link>
                                )}

                                {showManagerBoard && (
                                    <Link to={"/manager"} className={"nav-link text-center"}>
                                        Менеджер
                                    </Link>
                                )}

                                {showAdminBoard && (
                                    <Link to={"/admin"} className={"nav-link text-center"}>
                                        Администратор
                                    </Link>
                                )}

                                {person ? (
                                    <div className="ml-auto">
                                        <Link to={"/profile"} className={"nav-link text-center"}>
                                            {person.firstName} профиль
                                        </Link>
                                        <Link to={"/logout"} className={"nav-link text-center"} onClick={this.logOut}>
                                            Выход
                                        </Link>
                                    </div>
                                ) : (
                                    <Link to={"/login"} className={"nav-link text-center"}>
                                        Авторизация
                                    </Link>
                                )}
                            </Navbar>
                        </Col>
                    </Navbar>
                </Row>
            </Container>
        );
    }
}

export default Menu;
