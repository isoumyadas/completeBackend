import ErrorHandler from "../middlewares/error.js";
import { Task } from "../models/task.js";

export const newTask = async (req, res, next) => {
  try {
    const { title, description } = req.body;

    const task = await Task.create({ title, description, user: req.user });

    res.status(201).json({
      success: true,
      message: "Task Created Successfully",
      task,
    });

    // we can create the task like this too
    //   const task = new Task({ title });
    //   await task.save();
  } catch (error) {
    next(error);
  }
};
// Note: so here we have not use isCompleted as this is boolean value and frontend part

export const getMyTask = async (req, res, next) => {
  try {
    const userId = req.user._id; // Fetching the id from req.user.id

    const tasks = await Task.find({ user: userId });

    res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    next(error);
  }
};

export const updateTask = async (req, res, next) => {
  try {
    // Accessing the id using params
    const task = await Task.findById(req.params.id); // this doesnt takes the _id as it passed in params
    // error
    if (!task) return next(new ErrorHandler("Invalid Task Id", 404));

    task.isCompleted = !task.isCompleted;
    await task.save();
    res.status(200).json({
      success: true,
      message: "Task Updated",
    });
  } catch (error) {
    next(error);
  }
};

export const deleteTask = async (req, res, next) => {
  try {
    const task = await Task.findById(req.params.id); // this doesnt takes the _id as it passed in params

    //   if (!task) {
    //     return res.status(404).json({   // Note: we can do it like this way
    //       success: false,
    //       message: "Invalid Id",
    //     });
    //   }

    // Or use it like this way
    if (!task) return next(new ErrorHandler("Invalid Task Id", 404));

    await task.deleteOne();
    res.status(200).json({
      success: true,
      message: "Task is successfully Deleted",
    });
  } catch (error) {
    next(error);
  }
};

//Notes:
// 1. Whenever you use async await, use try catch block this is the best practice, and TIP: never repeat the code, use helper functions to reuse the function.
// 2. We can make custom error handler, in middleware or utils
// 3. Always keep the error Handler middleware at last
// 4. We can also use another way instead of doing tryCatch, you can create an wrapper func for that.
