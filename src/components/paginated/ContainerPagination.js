import React from 'react';
import AiPagination from "./AiPagination";
import {Container} from "react-bootstrap";
import {LOGGING_ENABLED} from "../../App";

class ContainerPagination extends AiPagination {
    constructor(props) {
        super(props);
        this.renderingFunction = props.renderingFunction;
    }

    renderingContainer(items) {
        if (LOGGING_ENABLED) {
            console.log("ContainerPagination renderingContainer. Items:", items);
        }
        return (
            <Container className={"d-flex flex-row justify-content-center align-content-center"}>
                {items.map((item) => this.renderingFunction(item))}
            </Container>
        );
    }

    render() {
        return super.render();
    }
}

export default ContainerPagination;
