// eslint-disable-next-line import/no-extraneous-dependencies
require("dotenv").config();
const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../utils/UnauthorizedError");

const { JWT_SECRET_PRODUCTION, NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  // const { authorization } = req.headers;
  // const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    const { cookies } = req;
    if (cookies && cookies.jwt) {
      const token = cookies.jwt;
      payload = jwt.verify(token, NODE_ENV === "production" ? JWT_SECRET_PRODUCTION : "Придумать ключ");
      req.user = payload;
      next();
    } else {
      next(new UnauthorizedError("Требуется авторизация"));
    }
  } catch (err) {
    next(new UnauthorizedError("Требуется авторизация"));
  }
};
