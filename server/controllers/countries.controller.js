const { default: axios } = require("axios");
const ApiKey = require("../models/api.key.model");

const getAllCountries = async (req, res) => {
  try {
    const response = await axios.get(`${process.env.REST_COUNTRIES_API}/all`);
    const sanitizedResponse = await sanitize(response.data);
    res.json(sanitizedResponse);
  } catch (error) {
    console.error("Error while fetching all countries: ", error);
    res.status(500).json({ message: "Failed to fetch countries." });
  }
};

const getCountryByName = async (req, res) => {
  const name = req.params.name;
  try {
    const response = await axios.get(
      `${process.env.REST_COUNTRIES_API}/name/${name}`
    );
    const sanitizedResponse = await sanitize(response.data);
    res.json(sanitizedResponse);
  } catch (error) {
    console.error("Error while fetching country by name: ", error);
    res.status(404).json({ message: "Country not found." });
  }
};

const sanitize = async (countries) => {
  var sanitizedCountries = [];
  for (let country of countries) {
    sanitizedCountries.push({
      name: country.name.common,
      currencies: country.currencies,
      capital: country.capital,
      languages: country.languages,
      flag: country.flag,
      flags: country.flags,
    });
  }
  return sanitizedCountries;
};

module.exports = {
  getAllCountries,
  getCountryByName,
};
