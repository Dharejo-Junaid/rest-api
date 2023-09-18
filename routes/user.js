const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getuserById,
  createNewUser,
  updateUserById,
  deleteUserById,
} = require("../controllers/user");

//routes;
router.route("/").get(getAllUsers).post(createNewUser);

router
  .route("/:id")
  .get(getuserById)
  .patch(updateUserById)
  .delete(deleteUserById);

module.exports = router;
