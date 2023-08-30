const BankAccount = require("../models/create.model");
function createAccount(req, res) {
  // Create a new account
  const { holderName, dob, accountType, initialBalance } = req.body;
  const account = new BankAccount(holderName, dob, accountType, initialBalance);
  res.json({ message: "Account created", data: account });
}

module.exports = {
  createAccount,
};
