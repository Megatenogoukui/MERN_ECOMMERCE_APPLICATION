import jwt from "jsonwebtoken";
import User from "../models/userModel.js";
import asyncHandler from "./asyncHandler.js";

//Protecting private routes
const protect = asyncHandler(async (req, res, next) => {
  let token;

  token = req.cookies.jwt;

  if (token) {
    try {
      const decoded =  jwt.verify(token, process.env.JWT_SECRET);
      req.user = await User.findById(decoded.userId).select("-password");
      next();
    } catch {
      const error = new Error("Not Authorized , token failed");
      error.statusCode = 401; // Set the status code on the error object
      next(error.message); // Call next with the error to trigger the error handler middleware
    }
  } else {
    const error = new Error("Not Authorized ,No token");
    error.statusCode = 401; // Set the status code on the error object
    next(error); // Call next with the error to trigger the error handler middleware
  }
});

//Checking if the user is admin or not
const admin = (req, res, next) => {
  if (req.user && req.user.isAdmin) {
    next();
  } else {
    const error = new Error("Not authorized as admin");
    error.statusCode = 401; // Set the status code on the error object
    next(error); // Call next with the error to trigger the error handler middleware
  }
};


export {admin , protect} 