const router = require("express").Router();
const { getUsersIdValidation, patchMeValidation, patchMyAvatarValidation } = require("../middlewares/celebrate");
const { getUsers, getUsersId, getMe } = require("../controllers/userController");
const { patchMe, patchMyAvatar } = require("../controllers/otherControllers");
const auth = require("../middlewares/auth");

router.get("/", auth, getUsers);
router.get("/:usersId", auth, getUsersIdValidation, getUsersId);
router.patch("/me", auth, patchMeValidation, patchMe);
router.get("/me", getMe);
router.patch("/me/avatar", auth, patchMyAvatarValidation, patchMyAvatar);

module.exports = router;
