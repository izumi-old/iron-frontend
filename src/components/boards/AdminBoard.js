import React, {Component} from "react";
import {Container, Tab, Tabs} from "react-bootstrap";
import personService from "../../services/person.service";
import {LOGGING_ENABLED} from "../../App";
import Person from "../entity/Person";
import ContainerPagination from "../paginated/ContainerPagination";
import PersonCardEditable from "../card/PersonCardEditable";

class AdminBoard extends Component {
    constructor(props) {
        super(props);

        this.ban = this.ban.bind(this);
        this.unban = this.unban.bind(this);
        this.clientsComponent = null;
        this.managersComponent = null;
    }

    unban(targetComponent, person) {
        if (LOGGING_ENABLED) {
            console.log("Trying to revoke a person ban. PersonComponent: ", person);
        }

        personService.update(new Person(person.id, null, null, null, null,
            null, null, null, false, null, null))
            .then(response => {
                if (LOGGING_ENABLED) {
                    console.log("Revoking of the ban completed successfully. Response: ", response)
                }
                console.log(targetComponent);
                targetComponent.updateItemAndRerender(response);
            });
    }

    ban(targetComponent, person) {
        if (LOGGING_ENABLED) {
            console.log("Trying to ban a person. PersonComponent: ", person);
        }

        personService.update(new Person(person.id, null, null, null, null,
            null, null, null, true, null, null))
            .then(response => {
                if (LOGGING_ENABLED) {
                    console.log("Ban completed successfully. Response: ", response)
                }
                console.log(targetComponent);
                targetComponent.updateItemAndRerender(response);
            });
    }

    render() {
        return (
            <Container>
                <Tabs defaultActiveKey={"clients"}>
                    <Tab eventKey={"clients"} title={"Клиенты"}>
                        <ContainerPagination ref={(comp) => this.clientsComponent = comp}
                            gettingFunction={(page, size) => personService.getPersonsByRole("CLIENT", page, size)}
                            itemsPageSize={3}
                            renderingFunction={(person) => {
                                return (<PersonCardEditable key={person.id}
                                                            person={person}
                                                            ban={() => this.ban(this.clientsComponent, person)}
                                                            unban={() => this.unban(this.clientsComponent, person)}/>);
                            }} />
                    </Tab>
                    <Tab eventKey={"managers"} title={"Менеджеры"}>
                        <ContainerPagination ref={(comp) => this.managersComponent = comp}
                            gettingFunction={(page, size) => personService.getPersonsByRole("MANAGER", page, size)}
                            itemsPageSize={3}
                             renderingFunction={(person) => {
                                 return (<PersonCardEditable key={person.id}
                                                             person={person}
                                                             ban={() => this.ban(this.managersComponent, person)}
                                                             unban={() => this.unban(this.managersComponent, person)}/>);
                             }} />
                    </Tab>
                </Tabs>
            </Container>
        );
    }
}

export default AdminBoard;
