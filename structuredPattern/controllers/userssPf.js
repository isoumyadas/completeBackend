import { User } from "../models/user.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";
import { sendToken } from "../utils/features.js";
import ErrorHandler from "../middlewares/error.js";

//===================================================================================
// getAllUsers
export const getAllUsers = async (req, res) => {};

//=====================================================================================
// login
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    // finding the user if it's exist or not
    const user = await User.findOne({ email }).select("+password"); // we've used select because in model we gave password select as false, so here we've to specify that we want password access.
    // Error Handler
    if (!user) return next(new ErrorHandler("Invalid email or password", 404));

    //Comparing the password
    const isMatch = bcrypt.compare(password, user.password);

    // you can use this, but optimization is neccessary
    // if (!isMatch) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "Invalid email or password",
    //   });
    // }

    //Better way to do this and recommeded way
    if (!isMatch)
      return next(new ErrorHandler("Invalid email or password", 404));

    // reusing the function from utils
    sendToken(res, user, `Welcome back, ${user.name}`, 200);
  } catch (error) {
    next(error);
  }
};

//=====================================================================================
//register
export const registerUser = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // finding the user if it's exist or not
    const user = await User.findOne({ email });

    //======================================= You can use this but if you want or not, but reccomeded way is to follow the error handler helper functions
    // if (user) {
    //   return res.status(404).json({
    //     success: false,
    //     message: "User Already Exists",
    //   });
    // }

    // Error Hanlder
    if (user) return next(new ErrorHandler("User Already Exists", 404));

    const hashedPassword = await bcrypt.hash(password, 10);

    //creating the user
    const userData = await User.create({
      email,
      name,
      password: hashedPassword,
    });

    // reusing the function from utils
    sendToken(res, userData, "Registered Successfully", 201);
  } catch (error) {
    next(error);
  }
};

//======================================================================================
// Dynamic Routing => Always keep Dynamic Routing at last
//getUserById
export const myProfile = (req, res) => {
  res.status(200).json({
    success: true,
    message: "OK",
    user: req.user, // we've created the auth middleware to verify the token and decode the token
  });
};

// Here in my Profile and logout, we had not use error handler cauz, here we haven't use the async and await method

//=======================================================================================

export const logout = (req, res) => {
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none",
      secure: process.env.NODE_ENV === "Development" ? false : true,
    })
    .json({
      success: true,
      message: "You are successfully Logged Out",
      user: req.user,
    });
};
