const express = require("express");
const app = express();
const fs = require("fs");
const PORT = 8000;
const users = require("./MOCK_DATA.json");
const mongoose = require("mongoose");

//connection
mongoose
  .connect("mongodb://127.0.0.1:27017/testingPrac")
  .then(() => console.log("mongoDB connected"))
  .catch((err) => console.log(`Mongo Err`, err));

//Schema
const userSchema = new mongoose.Schema(
  {
    first_name: {
      type: String,
      required: false,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      required: false,
      unique: true,
    },
    gender: {
      type: String,
      enum: ["male", "female", "others"],
    },
    job_title: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
// =========================================================================

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
app.get("/api/users", async (req, res) => {
  // To check if what is Headers in request
  // console.log(req.headers);

  //Setting Headers
  // res.setHeader("X-MyName", "Soumya Das"); // This is custom Header , Always add X to custom Headers.(Good Practice)

  const allUsers = await User.find({});
  return res.status(200).json(allUsers);
});

//Getting user by ID
app.get("/api/users/:id", async (req, res) => {
  const user = await User.findById(req.params.id);
  if (!user) {
    return res.status(404).json({ error: "User not found!" });
  }
  return res.json(user);
});

//POST
app.post("/api/users", async (req, res) => {
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

  const result = await User.create({
    first_name: req.body.first_name,
    last_name: req.body.last_name,
    email: req.body.email,
    gender: req.body.gender,
    job_title: req.body.job_title,
  });

  console.log(result);

  return res.status(201).json({ msg: "Success" });
});

//PATCH
//TODO
app.patch("/api/users/:id", async (req, res) => {
  await User.findByIdAndUpdate(req.params.id, { last_name: "Das" });
  return res.json({ msg: "Success" });
});

//Delete
//TODO
app.delete("/api/users/:id", async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
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
