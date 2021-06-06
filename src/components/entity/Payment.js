class Payment {
    constructor(id, date, amount, loanRepaymentAmount, interestRepaymentAmount, paidOut) {
        this.id = id;
        this.date = date;
        this.amount = amount;
        this.loanRepaymentAmount = loanRepaymentAmount;
        this.interestRepaymentAmount = interestRepaymentAmount;
        this.paidOut = paidOut;
    }
}

export default Payment;
