function generateAccountNumber() {
  let accountNumber = String(Math.floor(100000000 + Math.random() * 90000000));

  // Calculate and append the Luhn checksum digit
  const checksumDigit = calculateLuhnChecksum(accountNumber);
  accountNumber += checksumDigit.toString();
  return accountNumber;
}

// Function to calculate the Luhn checksum digit
function calculateLuhnChecksum(digitsString) {
  const digitsArray = digitsString.split("").map(Number);
  let sum = 0;
  let next = false;

  for (let i = digitsArray.length - 1; i >= 0; i--) {
    let digit = digitsArray[i];

    if (next) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }

    sum += digit;
    next = !next;
  }

  return (10 - (sum % 10)) % 10;
}

module.exports = generateAccountNumber;
