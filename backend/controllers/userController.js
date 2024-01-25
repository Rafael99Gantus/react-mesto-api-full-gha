/* eslint-disable max-len */
const http2 = require("http2");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const User = require("../models/user");

const NotFoundError = require("../utils/NotFoundError");
const UnauthorizedError = require("../utils/UnauthorizedError");
const BadRequestError = require("../utils/BadRequest");

const { JWT_SECRET_PRODUCTION, NODE_ENV } = process.env;

const ERROR_404 = "Пользователь не найден";

module.exports.getUsers = async (req, res, next) => {
  try {
    console.log("getUsers");
    const users = await User.find({});
    res.status(http2.constants.HTTP_STATUS_OK).send(users);
  } catch (err) {
    next(err);
  }
};

module.exports.getUsersId = async (req, res, next) => {
  try {
    const { usersId } = req.params;
    const userId = await User.findById(usersId).orFail(() => new NotFoundError(`${ERROR_404}`));
    res.status(http2.constants.HTTP_STATUS_OK).send(userId);
  } catch (err) {
    next(err);
  }
};

// module.exports.postUser = async (req, res, next) => {
//   try {
//     console.log("postUser");
//     const newUser = await User.create({
//       name: req.body.name,
//       about: req.body.about,
//       avatar: req.body.avatar,
//       email: req.body.email,
//       // password: hashPassword,
//     });
//     res.status(http2.constants.HTTP_STATUS_CREATED).json(newUser);
//   } catch (err) {
//     next(err);
//   }
// };
module.exports.postUser = async (req, res, next) => {
  console.log("register start");
  const {
    name, about, avatar, email, password,
  } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);
  return User
    .create({
      name, about, avatar, email, password: hashedPassword,
    })
  // eslint-disable-next-line no-shadow
    .then((newUser) => res.status(http2.constants.HTTP_STATUS_CREATED).send({
      about: newUser.about,
      avatar: newUser.avatar,
      email: newUser.email,
    }))
    .catch((err) => {
      if (err.name === "ValidationError") {
        return next(new BadRequestError("Не удалось добавить пользователя"));
      }
      return next(err);
    });
};
// const hashPassword = await bcrypt.hash(req.body.password, 10);
// eslint-disable-next-line consistent-return
// module.exports.login = async (req, res, next) => {
//   try {
//     console.log("login");
//     const { email, password } = req.body;
//     // const user = await User.findOne({ email }).select("+password");
//     const user = await User.findOne({ email, password });
//     if (!user) {
//       console.log("User not found");
//       throw new UnauthorizedError("Пользователь не найден");
//     }
//     const matched = await bcrypt.compare(password, user.password);
//     if (!matched) {
//       console.log("matched not found");
//       throw new UnauthorizedError("Неправильный пароль");
//     }
//     const token = jwt.sign({ _id: user._id }, NODE_ENV === "production" ? JWT_SECRET_PRODUCTION : "Придумать ключ");
//     console.log("token");
//     res
//       .cookie("jwt", token, {
//         maxAge: 3600000 * 24 * 7,
//         httpOnly: true,
//         sameSite: true,
//         secure: false,
//       })
//       .status(http2.constants.HTTP_STATUS_OK)
//       .send({ token, password, message: "Пользователь авторизован" });
//   } catch (err) {
//     next(err);
//   }
// };
module.exports.login = async (req, res, next) => {
  try {
    console.log("login start");
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    console.log("user find");
    if (!user) {
      return next(new UnauthorizedError("пользователь с таким email не найден"));
    }
    const matched = await bcrypt.compare(password, user.password);
    console.log("matched find");
    console.log(matched);
    if (!matched) {
      return next(new UnauthorizedError("Неверный пароль"));
    }
    console.log(user._id);
    const token = jwt.sign({ _id: user._id }, NODE_ENV === "production" ? JWT_SECRET_PRODUCTION : "Придумать ключ");
    if (!token) {
      console.log("error token");
    }
    console.log(token);
    res.cookie("jwt", token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      sameSite: true,
      secure: false,
    });
    return res.send({
      email: user.email,
      about: user.about,
      name: user.email,
      avatar: user.avatar,
      _id: user._id,
    });
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(new BadRequestError("Не удалось войти"));
    }
    return next(err);
  }
};
module.exports.getMe = async (req, res, next) => {
  try {
    console.log("getMe");
    const userId = req.user._id;
    const me = await User.find({ userId }).orFail(() => new NotFoundError(`${ERROR_404}`));
    res.status(http2.constants.HTTP_STATUS_OK).json({
      name: me.name,
      email: me.email,
      about: me.about,
      avatar: me.avatar,
    });
  } catch (err) {
    next(err);
  }
};
