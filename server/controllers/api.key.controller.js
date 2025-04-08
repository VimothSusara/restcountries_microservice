const ApiKey = require("../models/api.key.model");

// const generateApiKey = async (req, res) => {
//   try {
//     const { user_id } = req.body;

//     if (!user_id) {
//       return res
//         .status(400)
//         .json({ message: "User is required to generate a key." });
//     }

//     const apiKey = await ApiKey.createApiKey(user_id);

//     res.status(200).json({ message: "API key generated successfully", apiKey });
//   } catch (error) {
//     console.error("Error while generating API key: ", error);
//     res
//       .status(500)
//       .json({ message: "An error occurred while generating API key." });
//   }
// };

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
    const { id } = req.user;
    const { api_key, api_label } = req.body;

    if (!id) {
      return res.status(400).json({ message: "User ID is required" });
    }

    if (!api_key) {
      return res.status(400).json({ message: "API key is required" });
    }

    if (!api_label) {
      return res.status(400).json({ message: "API key label is required" });
    }

    const apiKey = await ApiKey.saveApiKey(id, api_key, api_label);
    res.status(200).json({ message: "API key saved successfully", api_key: apiKey.api_key });
  } catch (error) {
    console.error("Error while saving API key: ", error);
    res.status(500).json({ message: error.message });
  }
};

const getApiKeys = async (req, res) => {
  try {
    const { id } = req.user;

    if (!id) {
      return res.status(400).json({ message: "User ID is required." });
    }

    const apiKeys = await ApiKey.getApiKeys(id);

    res.status(200).json({ message: "API keys retrieved successfully", api_keys: apiKeys.api_keys });
  } catch (error) {
    console.error("Error while retrieving API keys: ", error);
    res.status(500).json({ message: error.message });
  }
}

const updateApiKey = async (req, res) => {
  try {
    const { id } = req.params;
    const { status, label } = req.body;

    if (!id) {
      return res.status(400).json({ message: "API key ID is required." });
    }

    if (status === undefined) {
      return res.status(400).json({ message: "API key status is required." });
    }

    if (!label) {
      return res.status(400).json({ message: "API key label is required." });
    }

    const api_key = await ApiKey.updateApiKey(id, status, label);
    res.status(200).json({ message: "API key updated successfully", api_key });
  } catch (error) {
    console.error("Error while updating API key: ", error);
    res.status(500).json({ message: error.message });
  }
}

const deleteApiKey = async (req, res) => {
  try {
    const { id } = req.params;
    const { id: user_id } = req.user;

    if (!id) {
      return res.status(400).json({ message: "API key ID is required." });
    }

    const api_key_id = await ApiKey.deleteApiKey(id, user_id);
    res.status(200).json({ message: "API key deleted successfully", api_key_id })
  }
  catch (error) {
    console.log("Error while deleting API key: ", error);
    res.status(500).json({
      message: error.message
    })
  }
}

module.exports = { generate, saveApiKey, getApiKeys, updateApiKey, deleteApiKey };
