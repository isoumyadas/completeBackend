import express from "express";
const app = express();
// import userRouter from "./routes/users.js";
import userRouter from "./routes/userssPf.js";
import taskRouter from "./routes/task.js";
import { connectDB } from "./data/database.js";
import { config } from "dotenv";
import cookieParser from "cookie-parser";
import { errorMiddleware } from "./middlewares/error.js";
import cors from "cors";

config({
  path: "./config.env",
});
//==================================================================
//connectDB
connectDB();

//Using Middleware's

// app.use(express.urlencoded()) // this is for web server for form data
app.use(express.json()); // This is for json data to accpet the data from form data using postman or to accept the json data
app.use(cookieParser());
app.use(
  cors({
    origin: [process.env.FRONTEND_URL], // we have put array, because, we can pass as many origins.
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true, // credentials means headers, which are set in headers that will never reach the frontend if you keep this as flase or not used it.
  })
);

// Always use express.json() first before use any routes

//router / routes
app.use("/api/v1/users", userRouter); // => this way we can keep prefix and same endpoint which is used again and again
app.use("/api/v1/tasks", taskRouter);

//==================================================================
app.get("/", (req, res) => {
  res.send("This is working fine...");
});

// Error Middleware
//Always keep the error Handler middleware at last
app.use(errorMiddleware);

app.listen(process.env.PORT, () => {
  console.log(
    `Server is working on port no : ${process.env.PORT} in ${process.env.NODE_ENV} Mode`
  );
});
