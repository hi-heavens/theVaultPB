# Vault Payment Bank Account Management API

Welcome to the The Vault Payment Bank Account Management API! This project was created as part of an assessment task. The API provides a simple way to create and manage bank accounts. It's built using Node.js and Express.

## Table of Contents

- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Running the Application](#running-the-application)
- [API Endpoints](#api-endpoints)
  - [Create a Bank Account](#create-a-bank-account)
  - [Resolve a Bank Account](#resolve-a-bank-account)
  - [Fetch All Bank Accounts](#fetch-all-bank-accounts)
- [Contribution](#contribution)
- [Deployment](#deployment)

## Getting Started

To run this application on your local machine, follow the steps below.

### Prerequisites

- [Node.js](https://nodejs.org/) installed on your system.
- [Git](https://git-scm.com/) installed on your system (required for cloning the repository and version control). Note that Git often comes pre-installed for macOS and Linux users.

### Installation

Clone the repository to your local machine (or download and unzip the ZIP file):

```bash
git clone https://github.com/hi-heavens/theVaultPB.git
cd theVaultPB
```

Install the required dependencies using npm:

`npm install`

## Running the Application

```bash
npm start
```

The API will be available at http://localhost:3000.

## API Endpoints

### Create a Bank Account

<p><strong>Endpoint:</strong> POST api/v1/create-account</p>
<p>This endpoint allows users to create a new bank account. Users should send a JSON payload containing the following account details:</p>

- Account holder name
- Account holder DOB (Date of Birth) in the format: `YYYY-MM-DD`
- Account type (Savings, Checking, etc.)
- Initial balance

<p><strong>Request Body:</strong></p>

```json
{
  "holderName": "John Doe",
  "dob": "1990-01-15",
  "accountType": "Savings",
  "initialBalance": 1000
}
```

<p><strong>Response:</strong> A JSON object with the generated account number and account details.</p>

<p>The endpoint will return a unique 10-digit account number along with the holder's name, account type, and initial balance.
</p>

```json
{
  "status": "Account created successfully",
  "data": {
    "accountNumber": 4387510694,
    "holderName": "John Doe",
    "accountType": "Savings",
    "balance": 0
  }
}
```

### Resolve a Bank Account

<p><strong>Endpoint:</strong> GET api/v1/account/:accountNumber</p>
<p>This endpoint allows users to fetch the details of a bank account using its account number. Users should provide the account number as a parameter in the URL. The endpoint will respond with the account details if found.
</p>
<p><strong>Response:</strong> A JSON object with the account details associated with the provided account number.</p>

```json
{
  "status": "Successful",
  "data": {
    "accountNumber": 4387510694,
    "holderName": "John Doe",
    "dob": "1990-01-15",
    "accountType": "Savings",
    "balance": 0
  }
}
```

### Fetch All Bank Accounts

<p><strong>Endpoint:</strong> GET /get-accounts</p>
<p>This endpoint returns a list of all bank accounts created so far. The response will include an array containing all account details.
</p>
<p><strong>Response:</strong> An array of JSON objects, each containing account details.</p>

## Contribution

- Kehinde Adedokun
- Contributions are welcome! If you find any issues or want to add improvements, feel free to fork the repository and create a pull request.

## Deployment

The application has been deployed and is accessible at [baseURL](https://the-vault-psb.onrender.com/). When testing the deployed version, don't forget to add `api/v1` to the baseURL for accessing the API endpoints.
