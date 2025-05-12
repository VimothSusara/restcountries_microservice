const express = require("express");
const router = express.Router();

const requestLogger = require("../middleware/request.logger.middleware");
const apiKeyAuth = require("../middleware/api.key.auth.middleware");
const authenticateToken = require("../middleware/auth.token.middleware");
const countriesController = require("../controllers/countries.controller");

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

//get country by full name
router.get(
  "/fullName/:fullName",
  countriesController.getCountryByFullName
);

//get country by country code
router.get(
  "/alpha/:code",
  countriesController.getCountryByCode
);

//get country by currency
router.get(
  "/currency/:currency",
  countriesController.getCountryByCurrency
);

//get country by lang
router.get(
  "/lang/:lang",
  countriesController.getCountryByLang
);

//get country by capital
router.get(
  "/capital/:capital",
  countriesController.getCountryByCapital
);

module.exports = router;
