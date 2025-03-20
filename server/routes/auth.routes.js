const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");

//register user
router.post("/register", authController.register);

//login user
router.post("/login", authController.login);

//check authentication status
router.get("/checkAuth", authController.checkAuth);

//logout user
router.post("/logout", authController.logout);

module.exports = router;
