const fs = require("fs");
const path = require("path");

function fetchAccountsData() {
  const filePath = path.join(__dirname, "..", "data.json");
  try {
    const data = fs.readFileSync(filePath, "utf8");
    return JSON.parse(data);
  } catch (error) {
    // If the file doesn't exist or is empty, return an empty array
    return [];
  }
}

module.exports = fetchAccountsData;
