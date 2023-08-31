const fs = require("fs");
const path = require("path");

const generateAccountNumber = () => {
  return Math.floor(1000000000 + Math.random() * 9000000000);
};

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

const fetchAccountsData = () => {
  const filePath = path.join(__dirname, "..", "data.json");
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist or is empty, return an empty array
    return [];
  }
};

const updateAccountsData = (data) => {
  const filePath = path.join(__dirname, "..", "data.json");
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, jsonData, "utf8");
};

module.exports = { saveAccount };
