// Express js is used for make it easy for creating api's.
// Express js is node.js Framework

import express from "express";
import path from "path";
const app = express();

// const staticPath = path.join(__dirname, "./index.html"); // By the help of this we can send res of static file it is possible in cjs not in module
//so better we can use render method which is dynamic and easy to use

//setting up view engine
app.set("view engine", "ejs");

//Bulit in middleware => use is middleware
const staticPath = path.join(path.resolve(), "public"); // This is static so this will be staticly default page
app.use(express.static(staticPath));
//to get data from req.body we'll use express.urlencoded
app.use(express.urlencoded({ extended: true }));

// Tempo array for saving the data
const users = [];

//learn about sendFile and send in express and also about path and fs if required
app.get("/", (req, res) => {
  //   console.log(req.headers);
  res.render("index", { name: "SoumyA", surname: "DaS" });
});

app.get("/home", (req, res) => {
  //   console.log(req.headers);
  res.send("index");
});

app.get("/success", (req, res) => {
  res.render("success");
});

app.post("/contact", (req, res) => {
  //   console.log(req.body);
  users.push({ username: req.body.name, email: req.body.email });
  //   res.render("success");
  res.redirect("/success");
  console.log(users);
});

app.listen(8000, () => {
  console.log(`Port no 8000 is Running`);
});

// Why the public Folder is used ?
// The public folder in a JavaScript project is commonly used for serving static files like images, stylesheets, and scripts. It acts as the main source of files for the frontend part of a web application.
// The main reason for having a separate public folder is to keep the static files organized and to separate them from the source code and other configurations.

//Note
// Render is used for rendering the file & Redirect is used for after doing some action it should redirect to some endpoint.
