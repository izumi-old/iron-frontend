class Loan {
    constructor(id, minAmount, maxAmount, minDurationMonths, maxDurationMonths, interestRate) {
        this.id = id;
        this.minAmount = minAmount;
        this.maxAmount = maxAmount;
        this.minDurationMonths = minDurationMonths;
        this.maxDurationMotnhs = maxDurationMonths;
        this.interestRate = interestRate;
    }
}

export default Loan;
