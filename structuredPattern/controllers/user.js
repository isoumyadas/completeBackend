import { User } from "../models/user.js";

export const getAllUsers = async (req, res) => {
  const users = await User.find({}); // we've given {}, becuase it contains all users which are in large amount

  // Params
  console.log(req.query);
  const keyword = req.query.access;
  console.log(keyword);

  res.json({
    success: true, // this is industry manner to do, mandotary
    users,
  });
}; // Best practice to pass the status code accordinly, You can also pass cookie

export const registerUser = async (req, res) => {
  const { name, email, password } = req.body;
  await User.create({ name, email, password }); // TIP: whenever you use aysnc await alwys use try catch block for good practice, also you can create error handler or custom error handler.
  //   await User.create({
  //     name: "Soumya",
  //     email: "soumyas@gmail.com",
  //     password: "sammy",
  //   });  // This is how we create maually and hard-coded

  res.status(201).cookie("test", "testing").json({
    success: true, // this is industry manner to do, mandotary
    message: "Registered Successfully",
  });
};

// Dynamic Routing => Always keep Dynamic Routing at last
export const getUserById = async (req, res) => {
  // const {id} = req.body // => we can access the id by using body, but if want id which we're using get req, so we can use post,
  // ===============================================================================

  // => But, if we don't want to use it then we can use query params
  //   const { id } = req.query;

  //=================================================================================
  // for dynamic id we have to use req.params

  const { id } = req.params;
  let userData = await User.findById(id); // so, we can use it like this
  console.log(req.params);

  // But if we want to pass id dynamicly => after userid/ the :id is dynamic like if we pass id then any query passed above will be treated as id, and its :name then any data from query will be name.

  res.json({
    success: true,
    userData,
  });
};

export const updateUserById = async (req, res) => {
  const { id } = req.params;
  let userData = await User.findById(id); // so, we can use it like this
  console.log(req.params);
  res.json({
    success: true,
    userData,
  });
};

export const deleteUserById = async (req, res) => {
  const { id } = req.params;
  let userData = await User.findById(id); // so, we can use it like this
  console.log(req.params);
  res.json({
    success: true,
    userData,
  });
};
//Note: Query Params Notes

// url?token=abhi  => after ? everything is query params, which can be access through our server or api, by using req.query,
// Query is object, and for adding more parmas use &
