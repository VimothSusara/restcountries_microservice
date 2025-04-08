const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/jwt.utils");
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const nodemailer = require("nodemailer");

const User = require("../models/user.model");

const register = async (req, res) => {
  try {
    const { username, password, first_name, last_name, email, phone_number } =
      req.body;

    // Validate the input
    if (!username) {
      return res.status(400).json({ message: "Username is required." });
    }

    if (!password) {
      return res.status(400).json({ message: "Password is required." });
    }

    if (!first_name) {
      return res.status(400).json({ message: "First Name is required." });
    }

    if (!phone_number) {
      return res.status(400).json({ message: "Phone Number required." });
    }

    // Check if the username already exists
    const existingUser = await User.findUsername(username);
    if (existingUser) {
      return res.status(400).json({ message: "Username already exists." });
    }

    const newUser = await User.register(
      username,
      password,
      first_name,
      last_name,
      email,
      phone_number
    );
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findUsername(username);
    // console.log("user body: ", user);

    // TODO: handle active/inactive users

    if (!user) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials." });
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    //set token in Http-only cookies
    res.cookie("access_token", accessToken, {
      httpOnly: true,
      secure: false, //true for production
      sameSite: "Strict",
    });

    res.cookie("refresh_token", refreshToken, {
      httpOnly: true,
      secure: false, //true for production
      sameSite: "Strict",
    });

    res.json({
      message: "Logged in successfully",
      user: { username: user.username, id: user.id, role_id: user.role_id },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const checkAuth = async (req, res) => {
  try {
    const accessToken = req.cookies.access_token;
    // console.log("AccessToken: ", accessToken);
    if (!accessToken) {
      return res.status(401).json({ authenticated: false });
    }

    const user = await User.verifyAccessToken(accessToken);

    if (!user) {
      return res.status(403).json({ authenticated: false });
    }

    res.status(200).json({ authenticated: true, user });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const logout = async (req, res) => {
  res.clearCookie("access_token");
  res.clearCookie("refresh_token");
  res.status(200).json({ message: "Logout successful" });
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  try {
    const user = await User.findUserWithEmail(email);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    // Generate a unique token for password reset
    const token = crypto.randomBytes(20).toString("hex");

    //expiration date for token (1 hour)
    const expiresIn = new Date(Date.now() + 3600000);

    await User.saveToken(token, expiresIn, user.user_id);

    const account = await nodemailer.createTestAccount();

    if (!account) {
      return res.status(500).json({ message: "Error creating test account." });
    }

    // Send password reset email using Nodemailer
    const transporter = nodemailer.createTransport({
      host: account.smtp.host,
      port: account.smtp.port,
      secure: account.smtp.secure,
      auth: {
        user: account.user,
        pass: account.pass,
      },
    });

    let message = {
      from: process.env.EMAIL_USER || "no-reply@example.com",
      to: email,
      subject: "Password Reset",
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n
        Please click on the following link, or paste this into your browser to complete the process:\n\n
        ${process.env.CLIENT_URL}/reset-password/${token}\n\n
        If you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(message, (err, info) => {
      if (err) {
        console.error("Error sending email: ", err);
        return res.status(500).json({ message: "Error sending email." });
      }
      console.log("Message sent: %s", info.messageId);
      console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    });

    res.status(200).json({ message: "Password reset email sent." });
  } catch (error) {
    console.error("Error while sending password reset email: ", error.message);
    res.status(500).json({ message: error.message });
  }
};

const resetPassword = async (req, res) => {
  const { token } = req.params;
  const { newPassword } = req.body;

  try {
    const user = await User.findUserWithResetToken(token);

    if (!user) {
      return res.status(404).json({ message: "Invalid or Expired token." });
    }

    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(newPassword, saltRounds);

    await User.updatePassword(hashedPassword, user.id);

    res.status(200).json({ message: "Password reset successful." });
  } catch (error) {
    console.error("Error while resetting password: ", error);

    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  register,
  login,
  checkAuth,
  logout,
  forgotPassword,
  resetPassword,
};
