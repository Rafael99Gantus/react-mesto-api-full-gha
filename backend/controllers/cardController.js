const http2 = require("http2");

const Card = require("../models/card");

const NotFoundError = require("../utils/NotFoundError");

const ERROR_404 = "Карточка не найдена";

module.exports.getCards = async (req, res, next) => {
  try {
    console.log("getCards");
    const cards = await Card.find({});
    res.status(http2.constants.HTTP_STATUS_OK).send(cards);
  } catch (err) {
    next(err);
  }
};

module.exports.getCardsId = async (req, res, next) => {
  try {
    console.log("getCardsId");
    const cardId = await Card.findById(req.params.cardId).orFail(() => new NotFoundError(`${ERROR_404}`));
    res.status(http2.constants.HTTP_STATUS_OK).send(cardId);
  } catch (err) {
    next(err);
  }
};

module.exports.deleteCard = async (req, res, next) => {
  try {
    const { cardId } = req.params;
    console.log("deleteCard");
    await Card.deleteOne({ _id: cardId }).orFail(() => new NotFoundError(`${ERROR_404}`));
    res.status(http2.constants.HTTP_STATUS_OK).json(cardId);
  } catch (err) {
    next(err);
  }
};

module.exports.postCard = async (req, res, next) => {
  try {
    console.log("postCard");
    const owner = req.user._id;
    console.log(owner);
    const { name, link } = req.body;
    const newCard = await Card.create({ name, link, owner });
    res.status(http2.constants.HTTP_STATUS_OK).send(newCard);
  } catch (err) {
    next(err);
  }
};
