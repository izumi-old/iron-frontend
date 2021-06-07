import React, {Component} from "react";
import LoanCard from "./card/LoanCard";
import ContainerPagination from "./paginated/ContainerPagination";
import loanService from "../services/loan.service";

class Loans extends Component {
    render() {
        return (
            <ContainerPagination
                gettingFunction={(page, size) => loanService.getLoansPaginated(page, size)}
                itemsPageSize={3}
                renderingFunction={(loan) => {
                    return (<LoanCard key={loan.id} loan={loan} />);
                }} />
        );
    }
}

export default Loans;
