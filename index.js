const server = require('./src/app.js');
const PORT = process.env.PORT || 3001
// swagger

const swaggerUI = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');


server.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);// eslint-disable-line no-console
});

