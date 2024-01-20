const mongoose = require("mongoose");

const isEmail = require("validator/lib/isEmail");
const { default: isURL } = require("validator/lib/isURL");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    default: "Жак-Ив Кусто",
    minlength: [2, "Минимальная длинна текста 2 символа"],
    maxlength: 30,
  },
  about: {
    type: String,
    default: "Исследователь",
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    default: "https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png",
    validate: {
      validator: (v) => isURL(v),
      message: "Ссылка неверного формата",
    },
  },
  email: {
    type: String,
    unique: true,
    required: {
      value: true,
      message: "Поле email обязательное",
    },
    validate: {
      validator: (v) => isEmail(v),
      message: "Неправильный формат почты",
    },
  },
  password: {
    type: String,
    required: {
      value: true,
      message: "Поле password обязательное",
    },
    select: false,
  },
}, { versionKey: false, timestamps: true });

module.exports = mongoose.model("user", userSchema);
