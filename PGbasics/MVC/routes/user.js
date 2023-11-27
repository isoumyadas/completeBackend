const express = require("express");
const router = express.Router();
const {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  createUser,
} = require("../controllers/user");

// router.get("/", getAllUsers);
// router.get("/:id", getUserById);
// router.post("/", createUser);
// router.patch("/:id", updateUserById);
// router.delete("/:id", deleteUserById);

// Or you can do like this

router.route("/").get(getAllUsers).post(createUser);
router
  .route("/:id")
  .get(getUserById)
  .patch(updateUserById)
  .delete(deleteUserById);

module.exports = router;
