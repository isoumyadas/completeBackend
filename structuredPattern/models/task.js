import mongoose from "mongoose";

// Models and Schema's

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  isCompleted: {
    type: Boolean,
    default: false, // if ever set deafult false then there no required to put.
  },
  user: {
    type: mongoose.Schema.Types.ObjectId, // This new concept for you learn about it
    ref: "user", // ref means reference {and user is the one you have given the collection name for User model}
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

export const Task = mongoose.model("task", schema);
