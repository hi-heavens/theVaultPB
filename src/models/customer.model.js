const generateAccountNumber = require("../services/generateAccountNumber");

class BankAccount {
  constructor(holderName, dob, accountType, initialBalance) {
    this.accountNumber = generateAccountNumber();
    this.holderName = holderName;
    this.dob = dob;
    this.accountType = accountType;
    this.balance = initialBalance;
  }
}

module.exports = BankAccount;
