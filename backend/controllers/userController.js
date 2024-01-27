/* eslint-disable max-len */
const http2 = require("http2");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const User = require("../models/user");

const NotFoundError = require("../utils/NotFoundError");
const UnauthorizedError = require("../utils/UnauthorizedError");
const BadRequestError = require("../utils/BadRequest");

const { JWT_SECRET, NODE_ENV } = process.env;

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

module.exports.postUser = async (req, res, next) => {
  console.log("register start");
  console.log(process.env.JWT_SECRET);
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
      name: newUser.name,
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

module.exports.login = async (req, res, next) => {
  try {
    console.log("login start");
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return next(new UnauthorizedError("пользователь с таким email не найден"));
    }
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      return next(new UnauthorizedError("Неверный пароль"));
    }
    const token = jwt.sign({ _id: user._id }, NODE_ENV === "production" ? JWT_SECRET : "Придумать ключ");
    if (!token) {
      console.log("error token");
    }
    // res.cookie("jwt", token, {
    //   maxAge: 3600000 * 24 * 7,
    //   httpOnly: true,
    //   sameSite: false,
    //   secure: true,
    // });
    return res.status(http2.constants.HTTP_STATUS_OK).send({ token });
  } catch (err) {
    if (err.name === "ValidationError") {
      return next(new BadRequestError("Не удалось войти"));
    }
    return next(err);
  }
};

// module.exports.login = async (req, res, next) => {
//   try {
//     const { email, password } = req.body;

//     const foundUser = await User.findOne({ email }).select("+password");
//     if (!foundUser) {
//       return next(new UnauthorizedError("пользователь с таким email не найден"));
//     }
//     const compareResult = await bcrypt.compare(password, foundUser.password);
//     if (!compareResult) {
//       return next(new UnauthorizedError("Неверный пароль"));
//     }
//     const token = jwt.sign({ _id: foundUser._id }, NODE_ENV === "production" ? JWT_SECRET : "Придумать ключ");
//     res.cookie("jwt", token, {
//       maxAge: 3600000 * 24 * 7,
//       httpOnly: true,
//       sameSite: true,
//       secure: false,
//     });
//     return res.send({
//       email: foundUser.email,
//       about: foundUser.about,
//       name: foundUser.email,
//       avatar: foundUser.avatar,
//       _id: foundUser._id,
//     });
//   } catch (err) {
//     if (err.name === "ValidationError") {
//       return next(new BadRequestError("Не удалось войти"));
//     }
//     return next(err);
//   }
// };

module.exports.getMe = async (req, res, next) => {
  try {
    if (!req.user || !req.user._id) {
      throw new Error("Пользователь не авторизован");
    }
    console.log("getMe");
    const userId = req.user._id;
    const me = await User.find({ userId }).orFail(() => new NotFoundError(`${ERROR_404}`));
    res.status(http2.constants.HTTP_STATUS_OK).json({
      name: me.name,
      email: me.email,
      about: me.about,
      avatar: me.avatar,
      _id: me._id,
    });
  } catch (err) {
    next(err);
  }
};
