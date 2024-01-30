/* eslint-disable max-len */
// eslint-disable-next-line import/no-extraneous-dependencies
require("dotenv").config();
const jwt = require("jsonwebtoken");
const UnauthorizedError = require("../utils/UnauthorizedError");

const { JWT_SECRET, NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  console.log("start auto");
  const { authorization } = req.headers;
  if (!authorization.startsWith("Bearer")) {
    next(new UnauthorizedError("Требуется авторизация"));
  }

  console.log(authorization);
  const token = authorization.replace("Bearer ", "");
  // const token = req.cookies.jwt;
  console.log(token);
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === "production" ? JWT_SECRET : "Придумать ключ");
    console.log(payload);
  } catch (err) {
    next(new UnauthorizedError("Требуется авторизация"));
  }
  req.user = payload;
  console.log(req.user);
  next();
};

// module.exports = (req, res, next) => {
//   let payload;
//   try {
//     const { cookies } = req;
//     if ((cookies && cookies.jwt)) {
//       const token = cookies.jwt;
//       payload = jwt.verify(token, NODE_ENV === "production" ? JWT_SECRET_PRODUCTION : "dev-secret");
//       req.user = payload;
//       next();
//     } else {
//       next(new UnauthorizedError("Неверные авторизационные данные"));
//     }
//   } catch (error) {
//     next(new UnauthorizedError("Неверные авторизационные данные19"));
//   }
// };
