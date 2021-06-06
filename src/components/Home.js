import React, {Component} from 'react';
import About from "./typical/About";
import {Container} from "react-bootstrap";
import LoansPaginated from "./paginated/LoansPaginated";

class Home extends Component {
    render() {
        return (
            <Container className={"container-fluid"}>
                <About/>
                <hr className="mt-5 style1"/>
                <div className="mt-5 text-center">
                    <h2>Информация о доступных кредитах</h2>
                    <LoansPaginated />
                </div>
                <hr className="mt-5 style1"/>
            </Container>
        );
    }
}

export default Home;
