const express = require("express");
const app = express();
const fs = require("fs");
const PORT = 8000;
const users = require("./MOCK_DATA.json");

//Middlewares
app.use(express.urlencoded({ extended: false }));

app.use((req, res, next) => {
  fs.appendFile(
    "./log.txt",
    `${Date.now()} : ${req.method} : ${req.path}\n`,
    (err, data) => {
      return next();
    }
  );
});

//Routes

//GET
// For making hibreed server you can make to different named routes => like for HTML rendering you can use /users,
// and for other devices or like mobile you can send /api/users

//HTML rendering
app.get("/users", (req, res) => {
  const html = `
        <ul>
            ${users.map((user) => `<li>${user.first_name}</li>`).join()}
        </ul>
    `;
  res.send(html);
  d;
});

//Rest API's
// Getting all users
app.get("/api/users", (req, res) => {
  // To check if what is Headers in request
  console.log(req.headers);

  //Setting Headers
  res.setHeader("X-MyName", "Soumya Das"); // This is custom Header , Always add X to custom Headers.(Good Practice)

  return res.json(users);
});

//Getting user by ID
app.get("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);
  if (!user) {
    return res.status(404).json({ error: "User not found!" });
  }
  return res.json(user);
});

//POST
app.post("/api/users", (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  ) {
    return res.status(400).json({ msg: "All fields are required" });
  }
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.status(201).json({ status: "Success", id: users.length });
  });
});

//PATCH
//TODO
app.patch("/api/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);

  if (id === user.id) {
    const userData = req.body;
    users.push({ ...userData });
    fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
      return res.json({ status: "Success", userData });
    });
  }
});

//Delete
//TODO
app.delete("/api/users/:id", (req, res) => {
  return res.json({ status: "Okay Delete" });
});

//==================================================================
//You can do like this too, for the same routes.. or same endpoints...
/**
 * app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    return res.json({ status: "Okay Patch" });
  })
  .delete((req, res) => {
    return res.json({ status: "Okay Delete" });
  });
*/
//=====================================================
app.listen(PORT, () => {
  console.log(`Server is running on port no ${PORT}`);
});

// MIDDLEWARES
/**
 * Middleware is just a func, which runs on every req,res
 *
 */
