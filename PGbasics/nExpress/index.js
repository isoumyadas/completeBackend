const express = require("express");
const app = express();

app.get("/", (req, res) => {
  return res.send("Home Page");
});

app.get("/about", (req, res) => {
  //   return res.send("Hey " + req.query.name).send("About Page\n"); // we have to not do like this.
  return res.send(`Hey ${req.query.name}, welcome to about page`);
});

app.listen(8000, () => {
  console.log(`Server is listening`);
});

// versioning in node.js

/**
 *  version name: 14.18.4
 *
 * 1st part = 14,
 * 2nd part = 18,
 * 3rd part = 4
 *
 * 3rd part (last part) - Minor Fixes {optional to update} => 14.18.5
 * 2nd part (middle part) -> Recommended Bug Fix (Security Fix ) => 14.19.0
 * 1st part (first part) => Major update and breaking update => 15.19.0 {If it's major update, then always go to docs and see what's the change.}
 *
 * To, install the particular version then  => npm i express@14.17.0,
 *  ^ => means ^4.16.0 => don't change the Major version, change any other version after 4
 *  ~ => means ~4.16.0 => only change minor fixes. {Visit Express docs, for more understanding}
 */

/**
 * Restfull API's
 * Always follow Server-Client Architecture => server and client is not dependent on each other, and with the help of JSON file, we can send that JSON file to client to render it.
 * Always Respect all HTTP METHODS => GET,PUT,POST,PATCH,DELETE
 * CSR(Client Side Rendering) => It is slow, bcz data get's first fetched then render.
 * SSR(Server Side Rendering) => It is fast.
 */
