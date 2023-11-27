// It is a good practice to give your main file as index.js
const http = require("http");
const fs = require("fs");
const url = require("url");

const myServer = http.createServer((req, res) => {
  //   console.log(req.headers); // extra info about information
  const log = `${Date.now()} : ${req.url} New Request\n`;
  const myUrl = url.parse(req.url);
  console.log(myUrl);
  //=====================================================
  fs.appendFile("./log.txt", log, (err, data) => {
    // if (err) {
    //   console.log(`Error::`, err);
    // } else {
    //   res.end("Hello");
    // }

    // switch (req.url) {
    //   case "/":
    //     res.end("Hey There");
    //     break;
    //   case "/about":
    //     res.end("I am Soumya");
    //     break;
    //   default:
    //     res.end("404 Page not found");
    // }
    switch (myUrl.pathname) {
      case "/":
        res.end("Hey There");
        break;
      case "/about":
        const username = myUrl.query.myname;
        res.end(`Hey `, username);
        break;
      case "/details":
        const details = myUrl.query.details; // now myUrl.quey is default this comes from package, but after query it is Search_query is given, where they can find the qurey
        res.end("Here are your serach details " + details);
        break;
      default:
        res.end("404 Page not found");
    }
  });
});

myServer.listen(8000, () => {
  console.log("Server is running");
});

// URL's

/**
 * So, HTTPS : Hypertext Transfer Protocol Secure,
 * www.soumya.dev :  Domain => A user-friendly Name of Ip Address of my server.
 * / : Path
 * /project/1 : Nested Path
 * /users?userId=1&a=2 : Query Params => Extra Information to pass with URL (Uniform Resource Locator)
 *
 *
 */

// HTTP Methods

/**
 * GET: When you want to get some data frm the server. Read the data.
 * POST: When you want to send and mutate some data in server.
 * PUT: PUT, is use to upload some file or image, it's like you have to PUT something.
 * PATCH: PATCH, is used to update or change something, it's like updating existing user.
 * DELETE: TO DELETE
 */
