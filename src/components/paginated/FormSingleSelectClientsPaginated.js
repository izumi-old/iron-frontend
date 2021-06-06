import React, {Component} from "react";
import personService from "../../services/person.service";
import FormSingleSelectPagination from "./FormSingleSelectPagination";

class FormSingleSelectClientsPaginated extends Component {
    constructor(props) {
        super(props);

        this.handleSelected = props.handleSelected;
        this.onSelect = this.onSelect.bind(this);
        this.getRendering = this.getRendering.bind(this);

        this.state = {
            selectedId: 0,
            itemsPageSize: props.itemsPageSize
        };
    }

    onSelect(person) {
        this.setState({
            selectedId: person.id
        });
        this.handleSelected(person);
    }

    getRendering(person) {
        if (person.patronymic) {
            return person.lastName + " " + person.firstName + " " + person.patronymic;
        } else {
            return person.firstName + " " + person.lastName;
        }
    }

    render() {
        return (
            <FormSingleSelectPagination
                gettingFunction={(page, size) => personService.getPersonsByRole("CLIENT", page, size)}
                itemsPageSize={this.state.itemsPageSize}
                renderingFunction={(person) => {
                    return (
                        <option key={person.id} onClick={() => this.onSelect(person)}>
                            {this.getRendering(person)}
                        </option>
                    );
                }} />
        );
    }
}

export default FormSingleSelectClientsPaginated;
