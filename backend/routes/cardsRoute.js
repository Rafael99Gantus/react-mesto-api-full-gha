const router = require("express").Router();
const { postCardValidation, cardsIdValidation } = require("../middlewares/celebrate");
const {
  getCards, getCardsId, postCard, deleteCard,
} = require("../controllers/cardController");
const auth = require("../middlewares/auth");
const { setLike, deleteLike } = require("../controllers/otherControllers");

router.get("/", getCards);
router.get("/:cardId", auth, getCardsId);
router.post("/", auth, postCardValidation, postCard);
router.put("/:cardId/likes", auth, cardsIdValidation, setLike);
router.delete("/:cardId/likes", auth, cardsIdValidation, deleteLike);
router.delete("/:cardId", auth, cardsIdValidation, deleteCard);

module.exports = router;
