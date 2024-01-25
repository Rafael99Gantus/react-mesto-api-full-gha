// eslint-disable-next-line import/no-extraneous-dependencies
require("dotenv").config();
const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../utils/UnauthorizedError");

const { JWT_SECRET_PRODUCTION, NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  console.log("start auto");
  const { authorization } = req.headers;
  console.log(authorization);
  const token = authorization.replace("Bearer ", "");
  // const token = req.cookies.jwt;
  let payload;
  try {
    console.log(payload);
    payload = jwt.verify(token, NODE_ENV === "production" ? JWT_SECRET_PRODUCTION : "Придумать ключ");
    console.log(payload);
  } catch (err) {
    next(new UnauthorizedError("Требуется авторизация"));
  }
  req.user = payload;
  next();
};
