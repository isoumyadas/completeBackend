// To install any packages => npm i package_name & for uninstall => npm uninstall package_name

// For creating the package.json => npm init

// nodemon for auto-running => npm i nodemon, for installing it globally use npm i -g package_name

// Basic server

// const http = require("http");

const server = http.createServer((req, res) => {
  if (req.url === "/about") {
    res.end("<h1>About Page</h1>");
  } else if (req.url === "/contact") {
    res.end("<h1>Contact Us</h1>");
  } else if (req.url === "/") {
    res.end("<h1>Home Page</h1>");
  } else {
    res.end("Page not Found");
  }
});

// server.listen(4000, () => {
//   console.log("Server is running");
// });

// Module => Everythng in node.js is module, module is also known as function
// 3 Types of module => Built-in like http, 3rd party which we can install, File based modules

// Upper one is basic way of importing and exporting
// Recommended way => for using import and export you've to define type in package.json

import http from "http";
//We can use some modules in fs => This is used for read, write the file. async and sync both manner
import fs from "fs";
// Path Module is used for showing the path

//If we want same file in an object to destrcture
// import * as allAnimals from "./features.js";
import {
  animal1,
  animal2,
  animal,
  animal3,
  generateRandomNumber,
} from "./features.js";

console.log(animal, animal1, animal2, animal3);
// console.log(allAnimals.animal1); //Here you can access the particular key with the help of "."

const server1 = http.createServer((req, res) => {
  if (req.url === "/about") {
    res.end(`<h1>Your Random Number is ${generateRandomNumber()}</h1>`);
  } else if (req.url === "/contact") {
    res.end("<h1>Contact Us</h1>");
  } else if (req.url === "/") {
    fs.readFile("./index.html", (err, home) => {
      // This is how we can use fs [File System]
      res.end(home);
    });
  } else {
    res.end("Page not Found");
  }
});

server1.listen(8000, () => {
  console.log("Server is running");
});

// We Have some Methods : GET , POST , PUT , DELETE , PATCH
