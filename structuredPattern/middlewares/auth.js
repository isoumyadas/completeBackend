import { User } from "../models/user.js";
import jwt from "jsonwebtoken";

export const isAuth = async (req, res, next) => {
  const { token } = req.cookies;

  if (!token) {
    return res.status(404).json({
      success: false,
      message: "You are logged out",
    });
  }

  //Verify the token || Decode the token
  const decoded = jwt.verify(token, process.env.SECRET_KEY);

  //finding the user ID with decoded Token
  req.user = await User.findById(decoded._id); // we've saved the user decoded id in req.user

  next();
};
// Instead of creating here we can create on other file where it can be reuseable : we've created the file successfully.
