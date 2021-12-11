const express = require("express");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const routes = require("./routes/index.js");
const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUI = require('swagger-ui-express');


const path = require("path");

const server = express();

server.name = "API";

server.use(express.urlencoded());
server.use(express.json());
server.use(cookieParser());
server.use(morgan("dev"));
server.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization, X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-COntrol-Allow-Request-Method"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  res.header("Allow", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

server.get("/", (req, res) => {
  res.json({ info: "Pagina cargada con exito" });
});
server.use("/", routes);

// Error catching endware.
server.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send(message);
});



//swagger:
const swaggerOptions = {
  definition: { 
    openapi: "3.0.0",
    info: {
      title: "API de Pokemons",
      version: "1.0.0",
      description: "API para la gestion de pokemons",
      contact: {
        name: "Flavio",
        email: "feperez3312@gmail.com",
      },
      servers: [
        {
          url: "http://localhost:3001/",
          description: "Local server",
        },
  
      ], 
     },
    
  },
  apis: [`${path.join(__dirname, "./routes/*.js")}`],

};




server.use("/api", routes);
server.use("/api-docs", swaggerUI.serve, swaggerUI.setup(swaggerJSDoc(swaggerOptions)));





module.exports = server;
