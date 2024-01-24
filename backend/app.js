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
const cors = require("./middlewares/cors");

const ERROR_404 = "Страница не найдена, некорректный запрос";

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());

mongoose.connect("mongodb://127.0.0.1:27017/mestodb")
  .then(() => {
    console.log("Подключение установлено");
  })
  .catch((err) => {
    console.error("Ошибка подключения:", err.message);
  });

app.use(requestLogger);

app.use(cors);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Сервер сейчас упадёт");
  }, 0);
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

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Ссылка на сервер: ${PORT}`);
});
