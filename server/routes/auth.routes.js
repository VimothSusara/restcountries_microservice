const express = require("express");
const router = express.Router();

const authController = require("../controllers/auth.controller");
const authenticateToken = require("../middleware/auth.token.middleware");

//register user
router.post("/register", authController.register);

//login user
router.post("/login", authController.login);

//check authentication status
router.get("/checkAuth", authController.checkAuth);

//logout user
router.post("/logout", authController.logout);

//forgot password
router.post("/forgot-password", authController.forgotPassword);

//reset password
router.post("/reset-password/:token", authController.resetPassword);

router.use(authenticateToken);

router.patch("/user-update", authController.updateUser);

router.patch("/password-update", authController.updatePasswordWithExisting);

module.exports = router;
