import React, {Component} from "react";
import loanService from "../../services/loan.service";
import ContainerPagination from "./ContainerPagination";
import LoanCard from "../card/LoanCard";

class LoansPaginated extends Component {
    render() {
        return (
            <ContainerPagination
                gettingFunction={(page, size) => loanService.getLoansPaginated(page, size)}
                itemsPageSize={2}
                renderingFunction={(loan) => {return (<LoanCard key={loan.id} loan={loan} />);}}
            />
        );
    }
}

export default LoansPaginated;
