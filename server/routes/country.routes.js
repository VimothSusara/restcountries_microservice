const express = require("express");
const router = express.Router();

const authenticateToken = require("../middleware/auth.token.middleware");
const countriesController = require("../controllers/countries.controller");

//get all countries
router.get("/all", authenticateToken, countriesController.getAllCountries);

//get country by name
router.get(
  "/name/:name",
  authenticateToken,
  countriesController.getCountryByName
);

module.exports = router;
