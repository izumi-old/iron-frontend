import React, {Component} from "react";
import {Card} from "react-bootstrap";
import LoanComponent from "../entity/LoanComponent";

class LoanCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loan: props.loan
        };
    }

    render() {
        return (
            <Card className={"w-50"}>
                <Card.Body>
                    <Card.Title>#{this.state.loan.id}</Card.Title>
                    <Card.Text className={"text-start"}>
                        <LoanComponent loan={this.state.loan}/>
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

export default LoanCard;
