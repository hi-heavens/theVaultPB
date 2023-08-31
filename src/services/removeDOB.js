function removeDOB(accountsData) {
  for (const account of accountsData) {
    if (account.hasOwnProperty("dob")) {
      delete account.dob;
    }
  }
  return accountsData;
}

module.exports = removeDOB;
