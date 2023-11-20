// Here we'll learn about mongodb, authentication and mongoose
// For connecting mongodb with node.js we use mongoose

import express from "express";
import path from "path";
const app = express();
import mongoose from "mongoose";
import cookieParser from "cookie-parser";

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

//creating the middleware for authenticated users
const authenticated = (req, res, next) => {
  const { token } = req.cookies;
  if (token) {
    next();
  } else {
    res.render("login");
  }
};

// app.get("/", (req, res) => {
//   const { token } = req.cookies;

//   if (token) {
//     res.render("logout");
//     console.log(req.cookies);
//   } else {
//     res.render("login");
//   }

//   // Now what happens here is we are requesting the cookie to give the key of the cookie which we can verify if the cookie is present or not,
//   // if present then render the logout page if not then render login page
// });

app.get("/", authenticated, (req, res) => {
  res.render("logout");
  // so, Here we've done the above api is same created as middleware {authenticated}, which will used to find if the user is authenticated or not,
  // so here we've passed the logout render, because we've used next if token is not present then it will render login page.
});

//Login api
app.post("/login", (req, res) => {
  res.cookie("token", "soumya", {
    httpOnly: true, // For making more secure
    expires: new Date(Date.now() + 60 * 1000),
  });
  res.redirect("/");
});

//Logout api
app.get("/logout", (req, res) => {
  res.cookie("token", "", {
    httpOnly: true, // For making more secure
    expires: new Date(Date.now()),
  });
  res.redirect("/");
});

// app.get("/home", (req, res) => {
//   res.send("index");
// });

app.get("/success", (req, res) => {
  res.render("success");
});

// app.post("/contact", async (req, res) => {
//   const userData = { name: req.body.name, email: req.body.email };
//   await User.create(userData);
//   res.redirect("/success");
// });

// You can also do in this way most prefered way
app.post("/contact", async (req, res) => {
  const { name, email } = req.body;
  await User.create({ name, email });
  res.redirect("/success");
});

app.listen(8000, () => {
  console.log(`Port no 8000 is Running`);
});
