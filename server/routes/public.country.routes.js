const express = require("express");
const router = express.Router();

const countriesController = require("../controllers/countries.controller");

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

module.exports = router;
