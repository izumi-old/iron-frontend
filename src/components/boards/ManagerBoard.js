import React, {Component} from "react";
import {Button, Container, Tab, Tabs} from "react-bootstrap";
import caseService, {STATUS_APPROVED, STATUS_PENDING, STATUS_REJECTED} from "../../services/case.service";
import CaseComponent from "../entity/CaseComponent";
import {LOGGING_ENABLED} from "../../App";
import CaseEntity from "../entity/Case";
import ContainerPagination from "../paginated/ContainerPagination";
import Case from "../entity/Case";

class ManagerBoard extends Component {
    constructor(props) {
        super(props);

        this.goToRegistration = this.goToRegistration.bind(this);
        this.newCase = this.newCase.bind(this);
        this.rejectCase = this.rejectCase.bind(this);
        this.renderCaseCancelable = this.renderCaseCancelable.bind(this);
        this.renderCaseNonCancelable = this.renderCaseNonCancelable.bind(this);
        this.newCasesComponent = null;
        this.acceptedCasesComponent = null;
        this.confirmedCasesComponent = null;
    }

    goToRegistration() {
        this.props.history.push("/signup");
        window.location.reload();
    }

    newCase() {
        this.props.history.push("/cases");
        window.location.reload();
    }

    rejectCase(targetComponent, aCase) {
        if (LOGGING_ENABLED) {
            console.log("Trying to reject a case. Case: ", aCase);
        }

        caseService.update(new CaseEntity(aCase.id, null, null, null, null,
            null, null, STATUS_REJECTED, null))
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
            null, STATUS_APPROVED, null))
            .then(response => {
                if (LOGGING_ENABLED) {
                    console.log("Approving completed successfully. Response: ", response)
                }
                if (response.statusClientSide === STATUS_APPROVED) {
                    this.confirmedCasesComponent.addItemIfAbsent(aCase);
                } else {
                    this.acceptedCasesComponent.addItemIfAbsent(aCase);
                }
                targetComponent.deleteByIdAndRerender(aCase.id);
            });
    }

    renderCaseCancelable(targetComponent, aCase) {
        return (
            <div key={aCase.id} className={"w-auto d-flex flex-column justify-content-center p-5"}>
                <CaseComponent aCase={aCase}/>
                <Button variant={"success"} onClick={() => this.approveCase(targetComponent, aCase)}>
                    Утвердить
                </Button>
                <Button variant={"warning"} onClick={() => this.rejectCase(targetComponent, aCase)}>
                    Отозвать
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
                <Button className={"m-2"} onClick={this.goToRegistration}>
                    Регистрация нового клиента
                </Button>
                <Button className={"m-2"} onClick={this.newCase}>
                    Создать новое кредитное предложение
                </Button>
                <hr/>
                <Tabs defaultActiveKey={"new"}>
                    <Tab eventKey={"new"} title={"Новые"}>
                        <ContainerPagination ref={(comp) => {this.newCasesComponent = comp;}}
                            gettingFunction={(page, size) => caseService.getCasesByStatuses(STATUS_PENDING, STATUS_PENDING, page, size)}
                            itemsPageSize={3}
                            renderingFunction={(aCase) => this.renderCaseCancelable(this.newCasesComponent, aCase)} />
                    </Tab>
                    <Tab eventKey={"accepted"} title={"В ожидании подтверждения"}>
                        <ContainerPagination ref={(comp) => {this.acceptedCasesComponent = comp;}}
                            gettingFunction={(page, size) => caseService.getCasesByStatuses(STATUS_PENDING, STATUS_APPROVED, page, size)}
                            itemsPageSize={3}
                            renderingFunction={(aCase) => this.renderCaseCancelable(this.newCasesComponent, aCase)} />
                    </Tab>
                    <Tab eventKey={"confirmed"} title={"Принятые"}>
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

export default ManagerBoard;
