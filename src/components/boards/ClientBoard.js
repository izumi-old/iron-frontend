import React, {Component} from "react";
import {Button, Container, Tab, Tabs} from "react-bootstrap";
import caseService, {STATUS_APPROVED, STATUS_PENDING, STATUS_REJECTED} from "../../services/case.service";
import CaseComponent from "../entity/CaseComponent";
import Case from "../entity/Case";
import {LOGGING_ENABLED} from "../../App";
import ContainerPagination from "../paginated/ContainerPagination";

class ClientBoard extends Component {
    constructor(props) {
        super(props);

        this.rejectCase = this.rejectCase.bind(this);
        this.renderCaseCancelable = this.renderCaseCancelable.bind(this);
        this.renderCaseNonCancelable = this.renderCaseNonCancelable.bind(this);
        this.newCasesComponent = null;
        this.acceptedCasesComponent = null;
        this.confirmedCasesComponent = null;

        this.state = {
            items: []
        }
    }

    rejectCase(targetComponent, aCase) {
        if (LOGGING_ENABLED) {
            console.log("Trying to reject a case. Case: ", aCase);
        }

        caseService.update(new Case(aCase.id, null, null, null, null, null,
            null, null, STATUS_REJECTED))
            .then(response => {
                if (LOGGING_ENABLED) {
                    console.log("Rejecting completed successfully. Response: ", response)
                }
                targetComponent.deleteByIdAndRerender(aCase.id);
            });
    }

    approveCase(targetComponent, aCase) {
        if (LOGGING_ENABLED) {
            console.log("Trying to approve a case. Case: ", aCase);
        }

        caseService.update(new Case(aCase.id, null, null,null, null, null,
            null, null, STATUS_APPROVED))
            .then(response => {
                if (LOGGING_ENABLED) {
                    console.log("Approving completed successfully. Response: ", response)
                }
                if (response.statusBankSide === STATUS_APPROVED) {
                    this.confirmedCasesComponent.addItemIfAbsent(response);
                } else {
                    this.acceptedCasesComponent.addItemIfAbsent(response);
                }
                targetComponent.deleteByIdAndRerender(aCase.id);
            });
    }

    renderCaseCancelable(targetComponent, aCase) {
        return (
            <div key={aCase.id} className={"w-auto d-flex flex-column justify-content-center p-5"}>
                <CaseComponent aCase={aCase}/>
                <Button variant={"success"} onClick={() => this.approveCase(targetComponent, aCase)}>
                    Согласиться
                </Button>
                <Button variant={"warning"} onClick={() => this.rejectCase(targetComponent, aCase)}>
                    Отказаться
                </Button>
                <hr className={"style1"}/>
            </div>
        );
    }

    renderCaseNonCancelable(aCase) {
        return (
            <div key={aCase.id} className={"w-auto p-5"}>
                <CaseComponent aCase={aCase} />
            </div>
        );
    }

    render() {
        return (
            <Container>
                <h2>Кредиты</h2>
                <Tabs defaultActiveKey={"not-accepted"}>
                    <Tab eventKey={"new"} title={"Новые"}>
                        <ContainerPagination ref={(comp) => {this.newCasesComponent = comp;}}
                            gettingFunction={(page, size) => caseService.getCasesByStatuses(STATUS_PENDING, STATUS_PENDING, page, size)}
                            itemsPageSize={3}
                            renderingFunction={(aCase) => this.renderCaseCancelable(this.newCasesComponent, aCase)} />
                    </Tab>
                    <Tab eventKey={"accepted"} title={"В ожидании подтверждения"}>
                        <ContainerPagination ref={(comp) => {this.acceptedCasesComponent = comp;}}
                            gettingFunction={(page, size) => caseService.getCasesByStatuses(STATUS_APPROVED, STATUS_PENDING, page, size)}
                            itemsPageSize={3}
                            renderingFunction={(aCase) => this.renderCaseCancelable(this.newCasesComponent, aCase)} />
                    </Tab>
                    <Tab eventKey={"confirmed"} title={"Подтвержденные"}>
                        <ContainerPagination ref={(comp) => {this.confirmedCasesComponent = comp;}}
                            gettingFunction={(page, size) => caseService.getCasesByStatuses(STATUS_APPROVED, STATUS_APPROVED, page, size)}
                            itemsPageSize={3}
                            renderingFunction={this.renderCaseNonCancelable} />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

export default ClientBoard;
