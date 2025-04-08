const { default: axios } = require("axios");
const ApiKey = require("../models/api.key.model");
const sanitize = require('../utils/sanitize.country');

const getAllCountries = async (req, res) => {
  // console.log(req.api_key);
  try {
    const response = await axios.get(`${process.env.REST_COUNTRIES_API}/all`);

    if (!response.data) {
      res.status(404).json({ message: "Countries not found" });
    }

    const sanitizedResponse = await sanitize(response.data);
    res.status(200).json(sanitizedResponse);
  } catch (error) {
    console.error("Error while fetching all countries: ", error);
    res.status(500).json({ message: "Failed to fetch countries." });
  }
};

const getCountryByName = async (req, res) => {
  try {
    const name = req.params.name;

    if (!name || typeof name !== 'string') {
      return res.status(400).json({ message: 'Invalid Country Name' });
    }

    const response = await axios.get(
      `${process.env.REST_COUNTRIES_API}/name/${name}`
    );

    if (!response.data) {
      return res.status(404).json({ message: "Country not found" })
    }

    const sanitizedResponse = await sanitize(response.data);
    res.status(200).json(sanitizedResponse);
  } catch (error) {
    console.error("Error while fetching country by name: ", error);
    res.status(404).json({ message: "Country not found." });
  }
};

module.exports = {
  getAllCountries,
  getCountryByName,
};
