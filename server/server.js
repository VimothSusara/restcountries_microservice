require("dotenv").config();

const db = require("./config/db");
// const User = require("./models/user.model");
// const Role = require("./models/role.model");
const ApiKey = require("./models/api.key.model");

const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");

// routes
const authRoutes = require("./routes/auth.routes");
const apiKeyRoutes = require("./routes/api.key.routes");
const countryRoutes = require("./routes/country.routes");
const publicCountryRoutes = require("./routes/public.country.routes");

// middleware to authenticate API keys
const apiKeyAuth = require("./middleware/api.key.auth.middleware");

const app = express();

const allowedOrigins = process.env.CLIENT_URL.split(",");

app.use(
  cors({
    origin: (origin, callback) => {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    // optionsSuccessStatus: 200,
  })
);

app.use(express.json());
app.use(cookieParser());

db.serialize(() => {
  // User.createUserDetailsTable();
  // User.alterColumn();
  // Role.createTable();
  // ApiKey.alterColumn();
});

//routes
app.use("/api/auth", authRoutes);
app.use("/api/key", apiKeyRoutes);
app.use("/api/countries", countryRoutes);
app.use("/api/public/countries", publicCountryRoutes);

app.listen(process.env.PORT, () => {
  console.log(`Server is running on port ${process.env.PORT}`);
});
