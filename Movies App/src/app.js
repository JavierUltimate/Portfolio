require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const { connectDb } = require("./db");
const authRouter = require("./routes/auth.routes");
const port = process.env.PORT || 4000;
const cookieParser = require("cookie-parser");
const movieRouter = require("./routes/movie.routes");
const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api", authRouter);
app.use("/api", movieRouter);
connectDb();

module.exports = { app, port };
