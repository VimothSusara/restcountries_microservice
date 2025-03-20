const ApiKey = require("../models/api.key.model");

const generateApiKey = async (req, res) => {
  try {
    const { user_id } = req.body;

    if (!user_id) {
      return res
        .status(400)
        .json({ message: "User ID is required to generate API key." });
    }

    const apiKey = await ApiKey.createApiKey(user_id);
    res.status(200).json({ message: "API key generated successfully", apiKey });
  } catch (error) {
    console.error("Error while generating API key: ", error);
    res
      .status(500)
      .json({ message: "An error occurred while generating API key." });
  }
};

const generate = async (req, res) => {
  try {
    const api_key = await ApiKey.generateApiKey();
    res
      .status(200)
      .json({ message: "API key generated successfully", api_key });
  } catch (error) {
    console.error("Error while generating API key: ", error);
    res
      .status(500)
      .json({ message: "An error occurred while generating API key." });
  }
};

const saveApiKey = async (req, res) => {
  try {
    const { user_id, api_key, api_key_label } = req.body;
    const apiKey = await ApiKey.saveApiKey(user_id, api_key, api_key_label);
    res.status(200).json({ message: "API key saved successfully", apiKey });
  } catch (error) {
    console.error("Error while saving API key: ", error);
    res
      .status(500)
      .json({ message: error.message});
  }
};

module.exports = { generateApiKey, generate, saveApiKey };
