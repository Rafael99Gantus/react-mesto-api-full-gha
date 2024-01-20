const router = require("express").Router();
const { postCardValidation, cardsIdValidation } = require("../middlewares/celebrate");
const {
  getCards, getCardsId, postCard, deleteCard,
} = require("../controllers/cardController");

const { setLike, deleteLike } = require("../controllers/otherControllers");

router.get("/", getCards);
router.get("/:cardId", getCardsId);
router.post("/", postCardValidation, postCard);
router.put("/:cardId/likes", cardsIdValidation, setLike);
router.delete("/:cardId/likes", cardsIdValidation, deleteLike);
router.delete("/:cardId", cardsIdValidation, deleteCard);

module.exports = router;
