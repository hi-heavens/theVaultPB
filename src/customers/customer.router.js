const express = require("express");
const {
  createAccountController,
  accountValidationController,
  getAllAccountsController,
} = require("./customer.controller");
const createAccountValidation = require("../services/createAccountValidation");

const router = express.Router();

/**
 * @swagger
 * /api/v1/create-account:
 *   post:
 *     tags:
 *        - Vault Payment Bank Account Management API
 *     description: This endpoint allows users to create a new bank account. Users should send a JSON payload containing the following account details
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               holderName:
 *                 type: string
 *               dob:
 *                 type: string
 *               accountType:
 *                 type: string
 *               initialBalance:
 *                 type: number
 *             example:
 *               holderName: "Ada Ola"
 *               dob: "1990-08-16"
 *               accountType: "Savings"
 *               initialBalance: 1500
 *     responses:
 *       201:
 *         description: Account successfully created.
 */

router.post(
  "/create-account",
  createAccountValidation,
  createAccountController
);

/**
 * @swagger
 * /api/v1/account/{accountNumber}:
 *   get:
 *     tags:
 *        - Vault Payment Bank Account Management API
 *     description: This endpoint allows users to fetch the details of a bank account using its account number. Users should provide the account number as a parameter in the URL. The endpoint will respond with the account details if found.
 *     parameters:
 *      - in: path
 *        name: accountNumber
 *        required: true
 *        schema:
 *         type: string
 *     responses:
 *       200:
 *         description: Account Retrieved Successfully.
 */
router.get("/account/:accountNumber", accountValidationController);

/**
 * @swagger
 * /api/v1/accounts:
 *   get:
 *     tags:
 *        - Vault Payment Bank Account Management API
 *     description: This endpoint returns a list of all bank accounts created so far. The response will include an array containing all account details.
 *     responses:
 *       200:
 *         description: Accounts Retrieved Successfully.
 */
router.get("/accounts", getAllAccountsController);

module.exports = router;
