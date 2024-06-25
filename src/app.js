require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const session = require("express-session");
const getUser = require("./middlewares/getUser");
const sessionConfig = require("./config/sessionConfig");

const app = express();
const PORT = process.env.PORT ?? 3001;

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  next();
});

app.use(morgan("dev"));
app.use(express.urlencoded({ extended: true }));
app.use(session(sessionConfig));
app.use(getUser);
app.use(express.json());

// Импортируем маршруты из routes/index.js
const routes = require("./importRoutes");

app.use("/api", routes);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});