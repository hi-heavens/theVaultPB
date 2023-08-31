const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "THE VAULTPB",
      version: "1.0.0",
      description: "F4B  technical test (ENG 1)",
    },
  },
  apis: ["./src/customers/customer.router.js"],
};

const swaggerSpec = swaggerJSDoc(options);

module.exports = swaggerSpec;
