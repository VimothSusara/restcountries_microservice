const express = require("express");
const router = express.Router();

const apiKeyController = require("../controllers/api.key.controller");
const authenticateToken = require("../middleware/auth.token.middleware");

// TODO: Add a middleware for admin only routes

// Middleware to authenticate Token
router.use(authenticateToken);

//generate an api key
// router.post("/generate", authenticateToken, apiKeyController.generateApiKey);

//generate an api key and return it to the user
router.post("/generate-key", apiKeyController.generate);

//save the api key
router.post("/save", apiKeyController.saveApiKey);

//get all api keys for a user
router.get("/all", apiKeyController.getApiKeys);

//update an api key
router.post("/update/:id", apiKeyController.updateApiKey);

//delete an api key
router.delete("/delete/:id", apiKeyController.deleteApiKey);

module.exports = router;
