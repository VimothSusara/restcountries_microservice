const express = require("express");
const router = express.Router();

const apiKeyController = require("../controllers/api.key.controller");
const authenticateToken = require("../middleware/auth.token.middleware");

//generate an api key
router.post("/generate", authenticateToken, apiKeyController.generateApiKey);

//generate an api key and return it to the user
router.post("/generate-key", authenticateToken, apiKeyController.generate);

//save the api key
router.post("/save", authenticateToken, apiKeyController.saveApiKey);

module.exports = router;
