import jwt from "jsonwebtoken";

export const sendToken = (res, userData, message, status = 200) => {
  // Jwt sign
  const token = jwt.sign({ _id: userData._id }, process.env.SECRET_KEY);
  res
    .status(status)
    .cookie("token", token, {
      httpOnly: true,
      maxAge: 15 * 60 * 1000, // 15mins
      sameSite: process.env.NODE_ENV === "Development" ? "lax" : "none", // means, backend will be deploy on another URL and frontend URL, so keeping it strict will helps to not to pass the cookie to the frontend if the domains are not same.
      secure: process.env.NODE_ENV === "Development" ? false : true, // if the sameSite is none then the secure should be true
    })
    .json({
      success: true,
      message,
    });
};

// Notes:
// 1. SO here the problem for setting the sameSite is this will not set cookies with the help of postman or localhost, but if we want to set it,
// then we have you sameSite: lax and secure to true, => but this only for localhost not for deployment.
// 2. So, for that we've to create env variables
// 3. SO, you can add this in package.json file in scripts =>   "start": "set NODE_ENV=Production && node app.js", "dev": "set NODE_ENV=Development && nodemon app.js",
// 4. But it is better to not do while deployment
