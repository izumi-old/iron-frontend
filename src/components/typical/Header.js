import React, {Component} from 'react';
import Menu from "./Menu";

class Header extends Component {
    render() {
        return (
            <header className={"container-fluid mb-3"}>
                <Menu />
            </header>
        );
    }
}

export default Header;
