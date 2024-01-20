const mongoose = require("mongoose");

const { default: isURL } = require("validator/lib/isURL");

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v) => isURL(v),
      message: "Ссылка неверного формата",
    },
  },
  owner: {
    type: [mongoose.Schema.Types.ObjectId],
    required: true,
    ref: "user",
  },
  likes: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "user",
    default: [],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
}, { versionKey: false, timestamps: true });

module.exports = mongoose.model("card", cardSchema);
