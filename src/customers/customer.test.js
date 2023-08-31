const request = require("supertest");
const app = require("../app");

describe("Testing of the Customer Routes", () => {
  it("should create a new bank account", async () => {
    const response = await request(app).post("/api/v1/create-account").send({
      holderName: "John Doe",
      dob: "1990-01-15",
      accountType: "Savings",
      initialBalance: 500,
    });

    expect(response.status).toBe(201);
    expect(response.body.status).toBe("Account created successfully");
    expect(response.body.data).toHaveProperty("accountNumber");
  });

  it("should handle missing input data when creating an account", async () => {
    const response = await request(app).post("/api/v1/create-account").send({});

    expect(response.status).toBe(400);
    expect(response.body.status).toBe("failed");
    expect(response.body.error).toBe("Missing/Invalid input data");
  });

  it("should handle negative initial balance when creating an account", async () => {
    const response = await request(app).post("/api/v1/create-account").send({
      holderName: "Folake Awe",
      dob: "2023-04-29",
      accountType: "Checking",
      initialBalance: -100,
    });

    expect(response.status).toBe(400);
    expect(response.body.status).toBe("failed");
    expect(response.body.error).toBe("Initial balance cannot be less than 0");
  });

  it("should get an account by account number", async () => {
    const accountsData = [
      {
        accountNumber: 4150688824,
        holderName: "John Doe",
        dob: "1990-01-15",
        accountType: "Savings",
        balance: 500,
      },
    ];
    // Mock fetchAccountsData function
    jest.mock("../services/fetchAccountsData", () => () => accountsData);

    const response = await request(app).get("/api/v1/account/4150688824");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("Successful");
    expect(response.body.data).toEqual(accountsData[0]);
  });

  it("should handle missing account number when getting an account", async () => {
    const response = await request(app).get("/api/v1/account/");

    expect(response.status).toBe(404);
    expect(response.body.status).toBe("failed");
    expect(response.body.message).toBe(
      "Can't find /api/v1/account/ on this server!"
    );
  });

  it("should handle non-existent account number when getting an account", async () => {
    const accountsData = [];

    // Mock fetchAccountsData function
    jest.mock("../services/fetchAccountsData", () => () => accountsData);

    const response = await request(app).get("/api/v1/account/9876543210");

    expect(response.status).toBe(404);
    expect(response.body.status).toBe("failed");
    expect(response.body.error).toBe(
      "Please reconfirm provided account number"
    );
  });

  it("should get all accounts", async () => {
    const accountsData = [
      {
        accountNumber: 1982815924,
        holderName: "Adesuwa Juan",
        dob: "1992-09-10",
        accountType: "Checking",
        balance: 5000,
      },
      {
        accountNumber: 4150688824,
        holderName: "John Doe",
        dob: "1990-01-15",
        accountType: "Savings",
        balance: 500,
      },
    ];

    // Mock fetchAccountsData function
    // To run this successfully, comment out the creation of the account test above
    // Update the accountsData with the current content of your data.json file
    /**
    jest.mock("../services/fetchAccountsData", () => () => accountsData);

    const response = await request(app).get("/api/v1/get-accounts");

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("Successful");
    expect(response.body.data).toEqual(accountsData);
    */
  });
});
