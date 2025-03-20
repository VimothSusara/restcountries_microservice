const {
  generateAccessToken,
  generateRefreshToken,
} = require("../utils/jwt.utils");
const bcrypt = require("bcrypt");

const User = require("../models/user.model");

const register = async (req, res) => {
  try {
    const {
      username,
      password,
      first_name,
      last_name,
      email,
      phone_number,
      address,
    } = req.body;

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
      phone_number,
      address
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

module.exports = {
  register,
  login,
  checkAuth,
  logout,
};
