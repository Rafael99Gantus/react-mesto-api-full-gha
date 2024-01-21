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

// const allowedCors = [
//   "https://praktikum.tk",
//   "http://praktikum.tk",
//   "localhost:3000",
// ];

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

// app.use((req, res, next) => {
//   const { origin } = req.headers; // Сохраняем источник запроса в переменную origin
//   // проверяем, что источник запроса есть среди разрешённых
//   if (allowedCors.includes(origin)) {
//     // устанавливаем заголовок, который разрешает браузеру запросы с этого источника
//     // res.header("Access-Control-Allow-Origin", origin);
//     // устанавливаем заголовок, который разрешает браузеру запросы из любого источника
//     res.header("Access-Control-Allow-Origin", "*");
//   }

//   next();
// });

// // eslint-disable-next-line consistent-return
// app.use((req, res, next) => {
//   const { method } = req; // Сохраняем тип запроса (HTTP-метод) в соответствующую переменную
//   // Значение для заголовка Access-Control-Allow-Methods по умолчанию (разрешены все типы запросов)
//   // const DEFAULT_ALLOWED_METHODS = "GET,HEAD,PUT,PATCH,POST,DELETE";
//   // Если это предварительный запрос, добавляем нужные заголовки
//   const requestHeaders = req.headers["access-control-request-headers"];
//   if (method === "OPTIONS") {
//     // разрешаем кросс-доменные запросы любых типов (по умолчанию)
//     // res.header("Access-Control-Allow-Methods", DEFAULT_ALLOWED_METHODS);

//     // разрешаем кросс-доменные запросы с этими заголовками
//     res.header("Access-Control-Allow-Headers", requestHeaders);
//     // завершаем обработку запроса и возвращаем результат клиенту
//     return res.end();
//   }
//   next();
// });

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
