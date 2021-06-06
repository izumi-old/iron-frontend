import React, {Component} from "react";
import loanService from "../../services/loan.service";
import FormSingleSelectPagination from "./FormSingleSelectPagination";

class FormSingleSelectLoansPaginated extends Component {
    constructor(props) {
        super(props);

        this.handleSelected = props.handleSelected;
        this.onSelect = this.onSelect.bind(this);

        this.state = {
            selectedId: 0,
            itemsPageSize: props.itemsPageSize
        };
    }

    onSelect(loan) {
        this.setState({
            selectedId: loan.id
        });
        this.handleSelected(loan);
    }

    render() {
        return (
            <FormSingleSelectPagination
                gettingFunction={(page, size) => loanService.getLoansPaginated(page, size)}
                itemsPageSize={this.state.itemsPageSize}
                renderingFunction={(loan) => {
                    return (
                        <option key={loan.id} onClick={() => this.onSelect(loan)}>
                            Сумма: [{loan.minAmount} - {loan.maxAmount}] @
                            Срок (месяцы): [{loan.minDurationMonths} - {loan.maxDurationMonths}] @
                            Процентная ставка: {loan.interestRate}%
                        </option>
                    );
                }} />
        );
    }
}

export default FormSingleSelectLoansPaginated;
