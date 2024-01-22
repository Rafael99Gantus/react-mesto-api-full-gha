// eslint-disable-next-line import/no-extraneous-dependencies
require("dotenv").config();
const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../utils/UnauthorizedError");

const { JWT_SECRET_PRODUCTION, NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === "production" ? JWT_SECRET_PRODUCTION : "Придумать ключ");
    req.user = payload;
    next();
  } catch (err) {
    next(new UnauthorizedError("Требуется авторизация"));
  }
};
