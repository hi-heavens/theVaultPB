const fs = require("fs");
const path = require("path");

class BankAccount {
  constructor(holderName, dob, accountType, initialBalance) {
    this.accountNumber = this.generateAccountNumber();
    this.holderName = holderName;
    this.dob = dob;
    this.accountType = accountType;
    this.balance = initialBalance;
    this.saveAccount();
  }

  generateAccountNumber() {
    return Math.floor(1000000000 + Math.random() * 9000000000);
  }

  saveAccount() {
    const maxAttempts = 10;
    let attempts = 0;

    while (attempts < maxAttempts) {
      const accountsData = this.fetchAccountsData();

      // Check if the generated account number already exists
      const existingAccount = accountsData.find(
        (account) => account.accountNumber === this.accountNumber
      );
      if (!existingAccount) {
        accountsData.push({
          accountNumber: this.accountNumber,
          holderName: this.holderName,
          dob: this.dob,
          accountType: this.accountType,
          balance: this.balance,
        });

        this.updateAccountsData(accountsData);
        return; // Successfully saved the account, so exit the loop
      }

      // Generate a new account number and increment the attempts
      this.accountNumber = this.generateAccountNumber();
      attempts++;
    }
    throw new Error(
      "Failed to generate a unique account number after multiple attempts."
    );
  }

  fetchAccountsData() {
    const filePath = path.join(__dirname, "..", "data.json");
    try {
      const data = fs.readFileSync(filePath, "utf8");
      return JSON.parse(data);
    } catch (error) {
      // If the file doesn't exist or is empty, return an empty array
      return [];
    }
  }

  updateAccountsData(data) {
    const filePath = path.join(__dirname, "..", "data.json");
    const jsonData = JSON.stringify(data, null, 2);
    fs.writeFileSync(filePath, jsonData, "utf8");
  }
}

module.exports = BankAccount;
