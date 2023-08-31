class BankAccount {
  constructor(holderName, dob, accountType, initialBalance) {
    this.accountNumber = this.generateAccountNumber();
    this.holderName = holderName;
    this.dob = dob;
    this.accountType = accountType;
    this.balance = initialBalance;
  }

  generateAccountNumber() {
    return Math.floor(1000000000 + Math.random() * 9000000000);
  }
}

module.exports = BankAccount;
