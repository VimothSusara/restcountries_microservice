const express = require("express");
const router = express.Router();

const requestLogger = require("../middleware/request.logger.middleware");
const apiKeyAuth = require("../middleware/api.key.auth.middleware");
const authenticateToken = require("../middleware/auth.token.middleware");
const countriesController = require("../controllers/countries.controller");

// Middleware to authenticate Token
router.use(authenticateToken);

// Middleware to authenticate API key
router.use(apiKeyAuth);

// Middleware to log requests
router.use(requestLogger);

//get all countries
router.get("/all", countriesController.getAllCountries);

//get country by name
router.get(
  "/name/:name",
  countriesController.getCountryByName
);

module.exports = router;
