const fetchAccountsData = require("./fetchAccountsData");
const updateAccountsData = require("./updateAccountsData");
const generateAccountNumber = require("./generateAccountNumber");

const saveAccount = (newAccount) => {
  const maxAttempts = 10;
  let attempts = 0;

  while (attempts < maxAttempts) {
    const accountsData = fetchAccountsData();
    // Check if the generated account number already exists
    const existingAccount = accountsData.find(
      (account) => account.accountNumber === newAccount.accountNumber
    );
    if (!existingAccount) {
      accountsData.push({
        accountNumber: newAccount.accountNumber,
        holderName: newAccount.holderName,
        dob: newAccount.dob,
        accountType: newAccount.accountType,
        balance: newAccount.balance,
      });

      updateAccountsData(accountsData);
      return; // Successfully saved the account, so exit the loop
    }
    // Generate a new account number and increment the attempts
    newAccount.accountNumber = generateAccountNumber();
    attempts++;
  }
  throw new Error(
    "Failed to generate a unique account number after multiple attempts."
  );
};

module.exports = saveAccount;
