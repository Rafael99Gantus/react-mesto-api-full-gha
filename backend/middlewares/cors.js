const allowedCors = [
  "http://mesto.rafael.nomoredomainsmonster.ru",
  "https://mesto.rafael.nomoredomainsmonster.ru",
  "http://api.mesto.rafael.nomoredomainsmonster.ru",
  "https://api.mesto.rafael.nomoredomainsmonster.ru",
  "http://localhost:3000",
  "https://localhost:3000",
  "http://127.0.0.1:3000",
  "https://127.0.0.1:3000",
  "http://127.0.0.1:27017",
  "https://127.0.0.1:27017",
  "http://localhost:5173",
  "https://localhost:5173",
  "http://127.0.0.1:5173",
  "https://127.0.0.1:5173",
  "http://84.201.154.246",
  "https://84.201.154.246",
  "http://127.0.0.1:80",
  "https://127.0.0.1:80",
  "*",
];

module.exports.cors = ((req, res, next) => {
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
