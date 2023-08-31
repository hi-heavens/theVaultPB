const fs = require("fs");
const path = require("path");

function updateAccountsData(data) {
  const filePath = path.join(__dirname, "..", "data.json");
  const jsonData = JSON.stringify(data, null, 2);
  fs.writeFileSync(filePath, jsonData, "utf8");
}

module.exports = updateAccountsData;
