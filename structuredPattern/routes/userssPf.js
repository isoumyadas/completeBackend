import express from "express";
import {
  getAllUsers,
  login,
  logout,
  myProfile,
  registerUser,
} from "../controllers/userssPf.js";

//middleware
import { isAuth } from "../middlewares/auth.js";

// adding router
const router = express.Router();

//code
router.get("/all", getAllUsers);
router.post("/new", registerUser);
router.post("/login", login);
router.get("/logout", logout);

// we can chain it, cauz this all have same endpoint
router.get("/me", isAuth, myProfile);

// router.get("/userid/:id", getUserById);
// router.put("/userid/:id", updateUserById);
// router.delete("/userid/:id", updateUserById);

export default router;
