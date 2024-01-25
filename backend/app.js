/* eslint-disable max-len */
const express = require("express");
const mongoose = require("mongoose");
const { errors } = require("celebrate");
const NotFoundError = require("./utils/NotFoundError");
// eslint-disable-next-line import/no-extraneous-dependencies
require("dotenv").config();
const { routerUsers, routerCards } = require("./routes/index");
const { postUser, login } = require("./controllers/userController");
const errorHandler = require("./middlewares/error");
const { signUpValidation, signInValidation } = require("./middlewares/celebrate");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const allowedCors = require("./middlewares/cors");

const ERROR_404 = "Страница не найдена, некорректный запрос";

const { PORT = 3000 } = process.env;

const app = express();
// app.use(cors);
app.use((req, res, next) => {
  const { origin } = req.headers;
  const { method } = req;
  const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
  const requestHeaders = req.headers["access-control-request-headers"];
  if (allowedCors.includes(origin)) {
    res.header("Access-Control-Allow-Origin", origin);
  }
  if (method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);
    res.header("Access-Control-Allow-Headers", requestHeaders);
    return res.end();
  }

  return next();
});
app.use(express.json());
app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
});

mongoose.connect("mongodb://127.0.0.1:27017/mestodb")
  .then(() => {
    console.log("Подключение установлено");
  })
  .catch((err) => {
    console.error("Ошибка подключения:", err.message);
  });

app.post("/signin", signInValidation, login);
app.post("/signup", signUpValidation, postUser);

app.use("/users", routerUsers);
app.use("/cards", routerCards);
app.use("*", (req, res, next) => {
  next(new NotFoundError(`${ERROR_404}`));
});

app.use(errorLogger); // логгер ошибок

app.use(errors()); // обработчик ошибок celebrate

// app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Ссылка на сервер: ${PORT}`);
});
