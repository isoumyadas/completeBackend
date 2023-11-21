import express from "express";
import {
  getAllUsers,
  getUserById,
  registerUser,
  updateUserById,
} from "../controllers/user.js";

// adding router
const router = express.Router();

//code
router.get("/all", getAllUsers);
router.post("/new", registerUser);

// we can chain it, cauz this all have same endpoint
router
  .route("/userid/:id")
  .get(getUserById)
  .put(updateUserById)
  .delete(updateUserById);

// router.get("/userid/:id", getUserById);
// router.put("/userid/:id", updateUserById);
// router.delete("/userid/:id", updateUserById);

export default router;
