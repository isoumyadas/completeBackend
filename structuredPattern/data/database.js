import mongoose from "mongoose";

// DB Conn
export const connectDB = () => {
  mongoose
    .connect(process.env.MONGO_URI, {
      dbName: "backendApi",
    })
    .then(() => console.log("DB connected"))
    .catch((e) => console.log(e));
};
