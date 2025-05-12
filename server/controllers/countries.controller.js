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

const getCountryByFullName = async (req, res) => {
  try {
    const name = req.params.fullName;

    if (!name || typeof name !== 'string') {
      return res.status(400).json({ message: 'Invalid Country Name' });
    }

    const response = await axios.get(
      `${process.env.REST_COUNTRIES_API}/name/${name}?fullText=true`
    );

    if (!response.data) {
      return res.status(404).json({ message: "Country not found" })
    }

    const sanitizedResponse = await sanitize(response.data);
    res.status(200).json(sanitizedResponse);
  } catch (error) {
    console.error("Error while fetching country by full name: ", error);
    res.status(404).json({ message: "Country not found." });
  }
};

const getCountryByCode = async (req, res) => {
  try {
    const code = req.params.code;

    if (!code || typeof code !== 'string') {
      return res.status(400).json({ message: 'Invalid Country Code' });
    }

    const response = await axios.get(
      `${process.env.REST_COUNTRIES_API}/alpha/${code}`
    );

    if (!response.data) {
      return res.status(404).json({ message: "Country not found" })
    }

    const sanitizedResponse = await sanitize(response.data);
    res.status(200).json(sanitizedResponse);
  } catch (error) {
    console.error("Error while fetching country by code: ", error);
    res.status(404).json({ message: "Country not found." });
  }
};

const getCountryByCurrency = async (req, res) => {
  try {
    const currency = req.params.currency;

    if (!currency || typeof currency !== 'string') {
      return res.status(400).json({ message: 'Invalid Country Currency' });
    }

    const response = await axios.get(
      `${process.env.REST_COUNTRIES_API}/currency/${currency}`
    );

    if (!response.data) {
      return res.status(404).json({ message: "Country not found" })
    }

    const sanitizedResponse = await sanitize(response.data);
    res.status(200).json(sanitizedResponse);
  } catch (error) {
    console.error("Error while fetching country by currency: ", error);
    res.status(404).json({ message: "Country not found." });
  }
};

const getCountryByLang = async (req, res) => {
  try {
    const lang = req.params.lang;

    if (!lang || typeof lang !== 'string') {
      return res.status(400).json({ message: 'Invalid Country Language' });
    }

    const response = await axios.get(
      `${process.env.REST_COUNTRIES_API}/lang/${lang}`
    );

    if (!response.data) {
      return res.status(404).json({ message: "Country not found" })
    }

    const sanitizedResponse = await sanitize(response.data);
    res.status(200).json(sanitizedResponse);
  } catch (error) {
    console.error("Error while fetching country by language: ", error);
    res.status(404).json({ message: "Country not found." });
  }
};

const getCountryByCapital = async (req, res) => {
  try {
    const capital = req.params.capital;

    if (!capital || typeof capital !== 'string') {
      return res.status(400).json({ message: 'Invalid Country Capital' });
    }

    const response = await axios.get(
      `${process.env.REST_COUNTRIES_API}/capital/${capital}`
    );

    if (!response.data) {
      return res.status(404).json({ message: "Country not found" })
    }

    const sanitizedResponse = await sanitize(response.data);
    res.status(200).json(sanitizedResponse);
  } catch (error) {
    console.error("Error while fetching country by country: ", error);
    res.status(404).json({ message: "Country not found." });
  }
};

module.exports = {
  getAllCountries,
  getCountryByName,
  getCountryByFullName,
  getCountryByCode,
  getCountryByCurrency,
  getCountryByLang,
  getCountryByCapital
};
