class Case {
    constructor(id, clientId, creatorId, loanId, amount, durationMonths, paid, statusBankSide,
                statusClientSide, confirmationDate, closed, payments, loan) {
        this.id = id;
        this.clientId = clientId;
        this.creatorId = creatorId;
        this.loanId = loanId;
        this.amount = amount;
        this.durationMonths = durationMonths;
        this.paid = paid;
        this.statusBankSide = statusBankSide;
        this.statusClientSide = statusClientSide;
        this.confirmationDate = confirmationDate;
        this.closed = closed;
        this.payments = payments;
        this.loan = loan;
    }
}

export default Case;
