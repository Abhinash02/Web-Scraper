const express = require("express");
const cors = require("cors");
const morgan = require("morgan");

const authRoutes = require("./routes/authRoutes");
const storyRoutes = require("./routes/storyRoutes");
const scrapeRoutes = require("./routes/scrapeRoutes");
const notFound = require("./middleware/notFoundMiddleware");
const errorHandler = require("./middleware/errorMiddleware");

const app = express();

app.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));

app.get("/", (req, res) => {
  res.json({ message: "API is running" });
});

app.use("/api/auth", authRoutes);
app.use("/api/stories", storyRoutes);
app.use("/api/scrape", scrapeRoutes);

app.use(notFound);
app.use(errorHandler);

module.exports = app;