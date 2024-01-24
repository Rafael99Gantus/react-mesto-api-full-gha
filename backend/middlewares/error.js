const http2 = require("http2");

const MONGO_DUPLICATE_ERROR_CODE = 11000;
const ERROR_500 = "Произошла ошибка";
const ERROR_404 = "Пользователь не найден";
const ERROR_401 = "Отсутствие токена";
const ERROR_400 = "Переданы некорректные данные";

// eslint-disable-next-line consistent-return, no-unused-vars
const errorHandler = (err, req, res, next) => {
  if (err && err.isJoi) {
    return res.status(400).json({
      message: "Ошибка валидации данных",
      errors: err.details.map((detail) => ({
        field: detail.path.join("."),
        message: detail.message,
      })),
    });
  }

  if (err.code === MONGO_DUPLICATE_ERROR_CODE) {
    return res
      .status(http2.constants.HTTP_STATUS_CONFLICT)
      .json({ message: "Такой пользователь уже существует" });
  }

  if (err.name === "JsonWebTokenError") {
    return res
      .status(http2.constants.HTTP_STATUS_UNAUTHORIZED)
      .json({ message: "Некорректный токен" });
  }

  if (err.name === "JsonWebTokenError") {
    return res
      .status(http2.constants.HTTP_STATUS_UNAUTHORIZED)
      .json({ message: "Отсутствует токен" });
  }

  if (err.name === "CastError") {
    return res
      .status(http2.constants.HTTP_STATUS_BAD_REQUEST)
      .json({ message: ERROR_400 });
  }
  if (err.name === "UnauthorizedError") {
    return res
      .status(http2.constants.HTTP_STATUS_DENIED)
      .json({ message: ERROR_401 });
  }
  if (err.name === "NotFoundError") {
    return res
      .status(http2.constants.HTTP_STATUS_NOT_FOUND)
      .json({ message: ERROR_404 });
  }
  if (err.name === "ValidationError") {
    return res
      .status(http2.constants.HTTP_STATUS_BAD_REQUEST)
      .json({ message: ERROR_400 });
  }
  return res.status(http2.constants.HTTP_STATUS_INTERNAL_SERVER_ERROR)
    .send({ message: ERROR_500 });
};

module.exports = errorHandler;
