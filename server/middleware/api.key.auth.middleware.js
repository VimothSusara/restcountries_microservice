const ApiKey = require("../models/api.key.model");

const apiKeyAuth = async (req, res, next) => {
  const apiKey = req.header("x-api-key");
  if (!apiKey) {
    return res.status(401).json({ message: "API key is required." });
  }

  try {
    const apiKeyData = await ApiKey.validate(apiKey);

    if (!apiKeyData) {
      return res.status(401).json({ message: "Invalid API key" });
    }
    
    req.api_key = apiKeyData;
    next();
  } catch (error) {
    console.error("API key validation error: ", error);
    res.status(500).json({ message: "Error validating API key." });
  }
};

module.exports = apiKeyAuth;
