import React from 'react';
import AiPagination from "./AiPagination";
import {Form} from "react-bootstrap";

class FormSingleSelectPagination extends AiPagination {
    constructor(props) {
        super(props);
        this.renderingFunction = props.renderingFunction;
    }

    renderingContainer(items) {
        return (
            <Form.Control as="select">
                <option key={-1}>Нажмите чтобы открыть/закрыть список</option>
                {items.map((item) => this.renderingFunction(item))}
            </Form.Control>
        );
    }

    render() {
        return super.render();
    }
}

export default FormSingleSelectPagination;
