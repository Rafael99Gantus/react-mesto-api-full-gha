const jwt = require("jsonwebtoken");

const { JWT_SECRET_PRODUCTION, JWT_SECRET_DEVELOPMENT, NODE_ENV } = process.env;

module.exports = (req, res, next) => {
  const { authorization } = req.headers;
  const token = authorization.replace("Bearer ", "");
  let payload;
  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET_PRODUCTION : JWT_SECRET_DEVELOPMENT);
    req.user = payload;
    next();
  } catch (err) {
    next(err);
  }
};
