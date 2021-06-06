import React, {Component} from 'react';
import {Container} from "react-bootstrap";

class LoanComponent extends Component {
    constructor(props) {
        super(props);

        let loan = props.loan;
        this.state = {
            minAmount: loan.minAmount,
            maxAmount: loan.maxAmount,
            minDurationMonths: loan.minDurationMonths,
            maxDurationMonths: loan.maxDurationMonths,
            interestRate: loan.interestRate
        };
    }

    render() {
        return (
            <Container className={"w-auto"}>
                <p>Минимальная сумма: {this.state.minAmount}</p>
                <p>Максимальная сумма: {this.state.maxAmount}</p>
                <p>Минимальный срок (месяцев): {this.state.minDurationMonths}</p>
                <p>Максимальный срок (месяцев): {this.state.maxDurationMonths}</p>
                <p>Процентная ставка: {this.state.interestRate}</p>
            </Container>
        );
    }
}

export default LoanComponent;
