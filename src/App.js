import { BrowserRouter as Router, Route } from 'react-router-dom';
import './App.css';
import Header from "./components/typical/Header";
import Footer from "./components/typical/Footer";

import Home from "./components/Home";
import Profile from "./components/Profile";
import Contacts from "./components/typical/Contacts";
import Login from "./components/forms/Login";
import Signup from "./components/forms/Signup";
import ClientBoard from "./components/boards/ClientBoard";
import ManagerBoard from "./components/boards/ManagerBoard";
import AdminBoard from "./components/boards/AdminBoard";
import React, {Component} from "react";
import Switch from "react-bootstrap/Switch";
import CreateCase from "./components/forms/CreateCase";
import ProfileEdit from "./components/forms/ProfileEdit";

class App extends Component {
    render() {
        return (
            <Router>
                <div className="App">
                    <Header/>
                    <div className={"wrapper-content"}>
                        <Switch>
                            <Route exact path="/" component={Home} />
                            <Route exact path="/login" component={Login} />
                            <Route exact path="/signup" component={Signup} />
                            <Route path="/profile" component={Profile} />
                            <Route path="/client" component={ClientBoard} />
                            <Route path="/manager" component={ManagerBoard} />
                            <Route path="/admin" component={AdminBoard} />
                            <Route exact path="/contacts" component={Contacts} />
                            <Route exact path={"/cases"} component={CreateCase} />
                            <Route exact path={"/persons"} component={ProfileEdit} />
                        </Switch>
                    </div>
                    <Footer/>
                </div>
            </Router>
        );
    }
}

export {App};
export const LOGGING_ENABLED = true;
export const API_URL = "http://localhost:8080/iron/v1";
