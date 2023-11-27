const express = require("express");
const app = express();
const PORT = 8000;
const users = require("./MOCK_DATA.json");
const userRouter = require("./routes/user");
const { logReqRes } = require("./middlewares/index");

//connection
const { connectMongoDb } = require("./conn");
connectMongoDb("mongodb://127.0.0.1:27017/testingPrac")
  .then(() => console.log("MongoDb Connected"))
  .catch((err) => console.log("Error: ", err));

// =========================================================================

//Middlewares
app.use(express.urlencoded({ extended: false }));

app.use("/api/user", userRouter);

app.use(logReqRes("log.txt"));

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
// app.get("/api/users", async (req, res) => {
//   // To check if what is Headers in request
//   // console.log(req.headers);
//   //Setting Headers
//   // res.setHeader("X-MyName", "Soumya Das"); // This is custom Header , Always add X to custom Headers.(Good Practice)
// });

//Getting user by ID
// app.get("/api/users/:id", async (req, res) => {});

// //POST
// app.post("/api/users", async (req, res) => {});

// //PATCH
// //TODO
// app.patch("/api/users/:id", async (req, res) => {});

// //Delete
// //TODO
// app.delete("/api/users/:id", async (req, res) => {});

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
