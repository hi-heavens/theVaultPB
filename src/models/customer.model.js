const generateAccountNumber = require("../services/generateAccountNumber");

// Create a new bank account and return it
function createAccount(holderName, dob, accountType, initialBalance) {
  const accountNumber = generateAccountNumber();
  const account = {
    accountNumber,
    holderName,
    dob,
    accountType,
    balance: initialBalance,
  };
  return account;
}

module.exports = { createAccount };
