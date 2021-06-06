import React, {Component} from "react";
import {Card} from "react-bootstrap";
import {GET_ROLES_AS_STRING} from "../../services/person.service";
import PersonComponent from "../typical/PersonComponent";

class PersonCard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            person: props.person
        };
    }

    render() {
        return (
            <Card key={this.state.person.id} className={"w-50"}>
                <Card.Body>
                    <Card.Title>{this.state.person.firstName} {this.state.person.lastName}
                        {this.state.person.patronymic ? " " + this.state.person.patronymic : ""}</Card.Title>
                    <Card.Subtitle className={"mb-2 text-muted"}>
                        {GET_ROLES_AS_STRING(this.state.person)}
                    </Card.Subtitle>
                    <Card.Text className={"text-start"}>
                        <PersonComponent person={this.state.person}/>
                    </Card.Text>
                </Card.Body>
            </Card>
        );
    }
}

export default PersonCard;
