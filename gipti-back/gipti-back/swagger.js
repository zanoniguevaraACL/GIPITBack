const swaggerJsdoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      title: 'Company API',
      version: '1.0.0',
    },
  },
  apis: ['./pages/api/**/*.ts'],
};

const specs = swaggerJsdoc(options);

module.exports = { swaggerUi, specs };