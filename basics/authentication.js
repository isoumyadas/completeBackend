// Here we've continued the progress from mongoose.js

// Here we'll learn about mongodb, authentication and mongoose
// For connecting mongodb with node.js we use mongoose

import express from "express";
import path from "path";
const app = express();
import mongoose from "mongoose";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

//connecting with mongoose
mongoose
  .connect("mongodb://127.0.0.1:27017", {
    dbName: "backend",
  })
  .then(() => console.log("DB connected"))
  .catch((e) => console.log(e));

//------------------------------------------------------------------------
// Creating Schema's or Models

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
});
//creating Model name => Which is also known as collections
const User = mongoose.model("User", userSchema); // => First name of the model then the schema name, and User will bw used in api's.
//------------------------------------------------------------------

//setting up view engine
app.set("view engine", "ejs");

//Bulit in middleware => use is middleware
const staticPath = path.join(path.resolve(), "public"); // This is static so this will be staticly default page
app.use(express.static(staticPath));
//to get data from req.body we'll use express.urlencoded
app.use(express.urlencoded({ extended: true }));

//using cookie parser
app.use(cookieParser());

// ================================================================================================

//creating the middleware for authenticated users
const authenticated = async (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    const decoded = jwt.verify(token, "soumya"); // Here we'll verify the token or decode the token
    console.log(decoded);
    req.user = await User.findById(decoded._id); // Now here, we'll get the user's data forever [It saves the data in req.user so it can]
    next();
  } else {
    res.redirect("/login");
  }
};

// ==============================================================================================

// HOME API

//GET
app.get("/", authenticated, (req, res) => {
  //   console.log(req.user);
  res.render("logout", { name: req.user.name }); // here the name stores the value of user's name
});

// ============================================================================================

//Login api

// app.post("/login", async (req, res) => {
//   const { name, email } = req.body;

//   //Here we are checking the if the user is present or logined [If not then Register first]
//   let user = await User.findOne({ email });
//   if (!user) {
//     return res.redirect("/register");
//   }
//   // else the user will be created
//   user = await User.create({ name, email });

//   //Usage of JWT
//   const token = jwt.sign({ _id: user._id }, "soumya");
//   console.log(token);

//   res.cookie("token", token, {
//     httpOnly: true, // For making more secure
//     expires: new Date(Date.now() + 60 * 1000),
//   });
//   res.redirect("/");
// });

//GET
app.get("/login", (req, res) => {
  res.render("login");
});

//POST
app.post("/login", async (req, res) => {
  const { email, password } = req.body;
  let user = await User.findOne({ email });

  if (!user) {
    return res.redirect("/register");
  }

  //checking password // Comparing the password from req.body and databased save password
  //   const isMatch = user.password === password;
  const isMatch = await bcrypt.compare(password, user.password);

  if (!isMatch) {
    return res.render("login", { email, message: "Incorrect Password" }); // from email part it is for EJS
  }

  //Usage of JWT
  const token = jwt.sign({ _id: user._id }, "soumya");
  console.log(token);

  res.cookie("token", token, {
    httpOnly: true, // For making more secure
    expires: new Date(Date.now() + 60 * 1000),
  });
  res.redirect("/");
});

// =============================================================================================

//Logout api

// GET
app.get("/logout", (req, res) => {
  res.cookie("token", "", {
    httpOnly: true, // For making more secure
    expires: new Date(Date.now()),
  });
  res.redirect("/login");
});

// ==============================================================================================

// Register API

//GET
app.get("/register", (req, res) => {
  res.render("register");
});

// POST
app.post("/register", async (req, res) => {
  const { name, email, password } = req.body;

  //Here we are checking the if the user is present then redirect to login page if not then register and go to login route
  let user = await User.findOne({ email });
  if (user) {
    return res.redirect("/login");
  }
  // Hashed password with the help of bcrypt
  const hashedPassword = await bcrypt.hash(password, 10);

  // else the user will be created
  user = await User.create({ name, email, password: hashedPassword });

  //Usage of JWT
  const token = jwt.sign({ _id: user._id }, "soumya");
  console.log(token);

  res.cookie("token", token, {
    httpOnly: true, // For making more secure
    expires: new Date(Date.now() + 60 * 1000),
  });
  res.redirect("/");
});

//===============================================================================================
app.listen(8000, () => {
  console.log(`Port no 8000 is Running`);
});
