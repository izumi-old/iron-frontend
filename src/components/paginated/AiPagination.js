import React, {Component} from 'react';
import {LOGGING_ENABLED} from "../../App";
import {Container, Pagination} from "react-bootstrap";
import {sortById} from "../../services/utils";

class AiPagination extends Component {
    constructor(props) {
        super(props);

        this.state = {
            itemsPageSize: props.itemsPageSize,
            currentPageNumber: 0,
            totalPages: 0,
            totalItems: 0,
            items: [],
            pages: []
        };

        this.changePage = this.changePage.bind(this);
        this.renderingContainer = this.renderingContainer.bind(this);
        this.deleteByIdAndRerender = this.deleteByIdAndRerender.bind(this);
        this.deleteById = this.deleteById.bind(this);
        this.updateItemAndRerender = this.updateItemAndRerender.bind(this);
        this.getSortedItems = this.getSortedItems.bind(this);
        this.gettingFunction = props.gettingFunction;
    }

    deleteById(id) {
        if (LOGGING_ENABLED) {
            console.log("Deleting an item by id. Id: ", id, "\nitems:", this.state.items);
        }
        let index = -1;
        let items = this.state.items;
        for (let i = 0; i < items.length; i++) {
            if (items[i].id === id) {
                index = i;
                break;
            }
        }

        if (index === -1) {
            if (LOGGING_ENABLED) {
                console.log("No one item with such id wasn't found");
            }
            return false;
        }
        items.splice(index, 1);
        if (LOGGING_ENABLED) {
            console.log("An item with such id was found and removed. Items: ", items);
        }
        return true;
    }

    deleteByIdAndRerender(id) {
        let deleted = this.deleteById(id);
        if (deleted) {
            if (LOGGING_ENABLED) {
                console.log("Re-rendering");
            }
            this.setState({
                items: this.state.items
            });
        }
        return deleted;
    }

    updateItemAndRerender(item) {
        if (LOGGING_ENABLED) {
            console.log("Updating items. First step - delete old one entity by id");
        }
        let deleted = this.deleteByIdAndRerender(item.id);
        if (deleted) {
            let items = this.state.items;
            items.push(item);
            if (LOGGING_ENABLED) {
                console.log("Updating items. Next step - add the new item and re-render");
            }
            this.setState({
                items: items
            });
        } else if (!deleted && LOGGING_ENABLED) {
            console.log("Cancel updating, it wasn't found any fit item");
        }
    }

    renderingContainer(items) {
        throw new Error("Rendering container function have to be overridden");
    }

    componentDidMount() {
        this.changePage(0);
    }

    changePage(pageNumber) {
        if (LOGGING_ENABLED) {
            console.log("\n====\nChanging page, page number: " + pageNumber);
        }

        this.gettingFunction(pageNumber, this.state.itemsPageSize).then(response => {
            if (LOGGING_ENABLED) {
                console.log("Got a response, response: ", response);
            }

            let pages = [];
            for (let i = 1; i < response.totalPages+1; i++) {
                pages.push(i);
            }
            this.setState({
                totalPages: response.totalPages,
                totalItems: response.totalElements,
                currentPageNumber: pageNumber,
                items: response.content,
                pages: pages
            });

            if (LOGGING_ENABLED) {
                console.log("Page changing ended successful, current state: ", this.state, "\n====");
            }
        })
    }

    getSortedItems() {
        let items = this.state.items;
        items.sort(sortById);
        return items;
    }

    render() {
        return (
            <Container>
                <Pagination className={"d-flex justify-content-center"}>
                    <Pagination.First onClick={() => this.changePage(0)}/>

                    {this.state.pages.map(page =>
                        <Pagination.Item key={page}
                                         onClick={() => this.changePage(page-1)}
                                         active={page-1 === this.state.currentPageNumber}
                                         activeLabel={""}>
                            {page}
                        </Pagination.Item>)
                    }

                    <Pagination.Last onClick={() => this.changePage(this.state.totalPages-1)}/>
                </Pagination>

                {this.renderingContainer(this.getSortedItems())}
            </Container>
        );
    }
}

export default AiPagination;
