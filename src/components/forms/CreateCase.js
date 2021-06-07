import React, {Component} from "react";
import {Button, Container, Form} from "react-bootstrap";
import caseService, {STATUS_PENDING} from "../../services/case.service";
import authService from "../../services/auth.service";
import Case from "../entity/Case";
import {LOGGING_ENABLED} from "../../App";
import FormSingleSelectLoansPaginated from "../paginated/FormSingleSelectLoansPaginated";
import FormSingleSelectClientsPaginated from "../paginated/FormSingleSelectClientsPaginated";

class CreateCase extends Component {
    constructor(props) {
        super(props);

        this.state = {
            loan: null,
            amount: 0,
            durationMonths: 0,
            clientId: null,
            loanId: null,
            messages: []
        };

        this.confirmCreation = this.confirmCreation.bind(this);
        this.onChangeAmount = this.onChangeAmount.bind(this);
        this.onChangeDurationMonths = this.onChangeDurationMonths.bind(this);
        this.selectLoan = this.selectLoan.bind(this);
        this.selectClient = this.selectClient.bind(this);
        this.validateAndGetResult = this.validateAndGetResult.bind(this);
    }

    onChangeAmount(e) {
        this.setState({
            amount: e.target.value
        });
    }

    onChangeDurationMonths(e) {
        this.setState({
            durationMonths: e.target.value
        });
    }

    confirmCreation() {
        if (LOGGING_ENABLED) {
            console.log("Trying to save a case. Before validation");
        }
        if (!this.validateAndGetResult()) {
            return;
        }
        let toSave = new Case(null,
            this.state.clientId,
            authService.getCurrentPerson().id,
            this.state.loanId,
            this.state.amount,
            this.state.durationMonths,
            null,
            STATUS_PENDING,
            STATUS_PENDING,
            null,
            false,
            null,
            null);
        if (LOGGING_ENABLED) {
            console.log("Trying to save a case. After validation. Case: ", toSave);
        }
        caseService.create(toSave)
            .then(() => {
                this.props.history.push("/manager");
                window.location.reload();
            },
            error => {
                const resMessage =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();
                let messages = [];
                messages.push(resMessage);

                this.setState({
                    completedWithErrors: true,
                    messages: messages
                });
            }
        );
    }

    validateAndGetResult() {
        let messages = [];
        let valid = true;
        if (!this.state.loanId) {
            messages.push("Выберите кредит");
            valid = false;
        } else {
            if (this.state.durationMonths < this.state.loan.minDurationMonths) {
                messages.push("Срок должен быть больше чем " + this.state.loan.minDurationMonths + " месяц(а/ев)");
                valid = false;
            }
            if (this.state.durationMonths > this.state.loan.maxDurationMonths) {
                messages.push("Срок должен быть меньше чем " + this.state.loan.maxDurationMonths + " месяц(а/ев)");
                valid = false;
            }

            if (this.state.amount < this.state.loan.minAmount) {
                messages.push("Сумма должна быть больше чем " + this.state.loan.minAmount);
                valid = false;
            }
            if (this.state.amount > this.state.loan.maxAmount) {
                messages.push("Сумма должна быть меньше чем " + this.state.loan.maxAmount);
                valid = false;
            }
        }
        if (!this.state.clientId) {
            messages.push("Выберите клиента");
            valid = false;
        }
        if (!valid) {
            this.setState({
                completedWithErrors: true,
                messages: messages
            });
        }
        return valid;
    }

    selectLoan(loan) {
        if (LOGGING_ENABLED) {
            console.log("Loan was selected. Loan: ", loan);
        }
        this.setState({
            loanId: loan.id,
            loan: loan
        })
    }

    selectClient(person) {
        if (LOGGING_ENABLED) {
            console.log("Client was selected. Client: ", person);
        }
        this.setState({
            clientId: person.id
        })
    }

    render() {
        return (
            <div className="col-md-12">
                <Container className={"w-50"}>
                    <Form>
                        <Form.Group className={"border-primary p-5"} controlId="loan">
                            <Form.Label>Выберите кредит</Form.Label>
                            <FormSingleSelectLoansPaginated itemsPageSize={10}
                                                            handleSelected={this.selectLoan} />
                        </Form.Group>

                        <Form.Group controlId="amount">
                            <Form.Label>Сумма</Form.Label>
                            <Form.Control
                                required
                                min={this.state.loan ? this.state.loan.minAmount : 0}
                                max={this.state.loan ? this.state.loan.maxAmount : 0}
                                type="number"
                                placeholder="Введите сумму"
                                onChange={this.onChangeAmount} />
                            <Form.Text className="text-muted">
                                Сумма должна быть в диапазоне от {this.state.loan ?
                                this.state.loan.minAmount : 0} до {this.state.loan ?
                                this.state.loan.maxAmount : 0}
                            </Form.Text>
                        </Form.Group>

                        <Form.Group controlId="durationMonths">
                            <Form.Label>Срок (в месяцах)</Form.Label>
                            <Form.Control
                                required
                                min={this.state.loan ? this.state.loan.minDurationMonths : 0}
                                max={this.state.loan ? this.state.loan.maxDurationMonths : 0}
                                type="number"
                                placeholder="Введите срок (в месяцах)"
                                onChange={this.onChangeDurationMonths} />
                            <Form.Control.Feedback>Подходит</Form.Control.Feedback>
                            <Form.Text className="text-muted">
                                Срок должен быть в диапазоне от {this.state.loan ?
                                this.state.loan.minDurationMonths : 0} до {this.state.loan ?
                                this.state.loan.maxDurationMonths : 0} месяцев
                            </Form.Text>
                        </Form.Group>

                        <Form.Group className={"border-primary p-5"} controlId={"client"}>
                            <Form.Label>Выберите клиента</Form.Label>
                            <FormSingleSelectClientsPaginated itemsPageSize={10}
                                handleSelected={this.selectClient} />
                        </Form.Group>

                        <Button variant="primary" onClick={this.confirmCreation}>
                            Создать
                        </Button>
                        <div className={this.state.completedWithErrors ? "active alert alert-danger" : "hidden"}
                             role={"alert"}>
                            {this.state.messages.map((message, index) => {
                                return (<p key={index}>{message}</p>);
                            })}
                        </div>
                    </Form>
                </Container>
            </div>
        );
    }
}

export default CreateCase;
