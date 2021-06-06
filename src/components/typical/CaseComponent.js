import React, {Component} from 'react';
import {Container, ProgressBar, Table} from "react-bootstrap";

class CaseComponent extends Component {
    constructor(props) {
        super(props);

        let aCase = props.aCase;
        this.state = {
            id: aCase.id,
            amount: aCase.amount,
            paid: aCase.paid,
            durationMonths: aCase.durationMonths,
            confirmationDate: aCase.confirmationDate,
            loan: aCase.loan,
            closed: aCase.closed,
            payments: aCase.payments
        };

        this.comparePayment = this.comparePayment.bind(this);
    }

    comparePayment(a, b) {
        if (a.date) {
            return a.date >= b.date? 1 : -1;
        } else {
            return Number.parseInt(a.id) >= Number.parseInt(b.id) ? 1 : -1;
        }
    }

    render() {
        return (
            <Container className={"d-flex flex-column justify-content-center align-content-center"}>
                <p>Срок: {this.state.durationMonths}
                    {this.state.durationMonths === 1 ? " месяц" : ""}
                    {(this.state.durationMonths >= 2 && this.state.durationMonths <= 4) ? " месяца" : ""}
                    {this.state.durationMonths > 4 ? " месяцев" : ""}
                </p>
                <div>
                    <h4>Выплачено:</h4>
                    <ProgressBar now={(this.state.paid / this.state.amount) * 100} variant={"warning"} />
                    <p>{this.state.paid} из {this.state.amount} (IU)</p>
                </div>
                <Table striped bordered hover className={"container-fluid"}>
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Дата</th>
                            <th>Нужно заплатить</th>
                            <th>В выплату основного долга</th>
                            <th>В выплату процентов</th>
                        </tr>
                    </thead>
                    <tbody>
                    {[].concat(this.state.payments)
                        .sort((a, b) => this.comparePayment(a, b))
                        .map((payment, index) =>
                            <tr className={payment.paidOut ? "bg-info" : "bg-danger"}>
                                <td>{index+1}</td>
                                <td>{payment.date ? payment.date : "Появится после подтверждения кредита"}</td>
                                <td>{payment.amount}</td>
                                <td>{payment.loanRepaymentAmount}</td>
                                <td>{payment.interestRepaymentAmount}</td>
                            </tr>)}
                    </tbody>
                </Table>
                <hr className={"style1"}/>
            </Container>
        );
    }
}

export default CaseComponent;
