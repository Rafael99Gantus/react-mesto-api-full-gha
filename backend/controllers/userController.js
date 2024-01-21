/* eslint-disable max-len */
const http2 = require("http2");

const bcrypt = require("bcrypt");

const jwt = require("jsonwebtoken");

const User = require("../models/user");

const NotFoundError = require("../utils/NotFoundError");
const UnauthorizedError = require("../utils/UnauthorizedError");

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
  try {
    console.log("postUser");
    const hashPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await User.create({
      name: req.body.name,
      about: req.body.about,
      avatar: req.body.avatar,
      email: req.body.email,
      password: hashPassword,
    });
    res.status(http2.constants.HTTP_STATUS_OK).json(newUser);
  } catch (err) {
    next(err);
  }
};

// eslint-disable-next-line consistent-return
module.exports.login = async (req, res, next) => {
  try {
    console.log("login");
    const { email, password } = req.body;
    const user = await User.findOne({ email }).select("+password").orFail(() => new UnauthorizedError(`${ERROR_404}`));
    const matched = await bcrypt.compare(password, user.password);
    if (!matched) {
      throw new UnauthorizedError("Почта или пароль неверные");
    }
    const token = generateToken({ _id: foundUser._id });
    res.cookie('jwt', token, {
      maxAge: 3600000 * 24 * 7,
      httpOnly: true,
      sameSite: true,
      secure: false,
    });
    res.status(http2.constants.HTTP_STATUS_OK).send({ token, message: "Пользователь авторизован" });
  } catch (err) {
    next(err);
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
