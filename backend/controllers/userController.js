import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import generateToken from "../utils/generateToken.js";

// @des Authenticate a user and get token
// @route Post api/users/login
// access public
const authUser = asyncHandler(async (req, res, next) => {
  //Destructuring an storing the eamil and password
  const { email, password } = req.body;
  //Searching for the user in the database
  const user = await User.findOne({ email });
  console.log("founded");
  //If the user is present then sending the name , id, email ,isAdmin to the frontend
  if (user && (await user.matchedPassword(password))) {
    //Funtion for creating a token and saving it ina cookie(location : ../utils/genrateToken.js)
    generateToken(res, user._id);


    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    const error = new Error("Invalid Email or Password");
    error.statusCode = 401; // Set the status code on the error object
    next(error); // Call next with the error to trigger the error handler middleware
  }
});

// @des Register a user
// @route POST api/users/
// @access Public
const registerUser = asyncHandler(async (req, res, next) => {
  const { email, name, password } = req.body;

  // Checking if the user already exists or not
  const existUser = await User.findOne({ email });
  if (existUser) {
    const error = new Error("User already exists");
    error.statusCode = 400;
    next(error);
  }
  
  // Creating a new user
  const user = await User.create({
    name,
    email,
    password,
  });
  await user.save();

  if (user) {
    generateToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    const error = new Error("Invalid User data");
    error.statusCode = 400;
    next(error);
  }
});

// @des Logout user
// @route POST api/users/logout
// @access Private
const logoutUser = asyncHandler(async (req, res) => {
  // Clear the JWT cookie to log out the user
  res.cookie("jwt", "", {
    httpOnly: true,
    expiresIn: new Date(0),
  });
  res.status(200).json({
    message: "Logged Out Successfully",
  });
});

// @des Get user Profile
// @route GET api/users/profile
// @access Private
const getUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    });
  } else {
    const error = new Error("Invalid User data");
    error.statusCode = 400;
    next(error);
  }
});

// @des Update a user Profile
// @route PUT api/users/profile
// @access Private
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;

    if (req.body.password) {
      user.password = req.body.password;
    }
    
    const updatedUser = await user.save();
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    const error = new Error("User not found");
    error.statusCode = 400;
    next(error);
  }
});


// @des Get all users
// @route Get api/users
// access admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  if (users) {
    res.status(200).json(users);
  } else {
    const error = new Error("Users not found");
    error.statusCode = 400; // Set the status code on the error object
    next(error); // Call next with the error to trigger the error handler middleware
  }
});

// @des Delete users
// @route Delete api/users/:id
// access admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (!user) {
    const error = new Error("User not found");
    error.statusCode = 400; // Set the status code on the error object
    next(error); // Call next with the error to trigger the error handler middleware
  }
  if (user.isAdmin) {
    const error = new Error("Cannot delete admin");
    error.statusCode = 400; // Set the status code on the error object
    next(error); // Call next with the error to trigger the error handler middleware
  } else {
    await User.deleteOne({ _id: user._id });
    res.status(200).json({
      message: "User successfully deleted",
    });
  }
});

// @des Get user by id
// @route Get api/users/:id
// access admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");
  if (user) {
    res.status(200).json(user);
  } else {
    const error = new Error("User not found");
    error.statusCode = 400; // Set the status code on the error object
    next(error); // Call next with the error to trigger the error handler middleware
  }
});

// @des Update Admin
// @route PUT api/users/:id
// access admin
const updateUser = asyncHandler(async (req, res) => {
  if (req.params.id === "652ff538f8b4dd3d49062824") {
    res.status(400).json("Cannot make changes in this Admin");
  } else {
    const user = await User.findById(req.params.id);

    if (user) {
      user.isAdmin = !user.isAdmin;
      const updatedUser = user.save();
      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
      });
    }
  }
});

export {
  registerUser,
  authUser,
  getUserById,
  getUserProfile,
  updateUserProfile,
  getUsers,
  deleteUser,
  updateUser,
  logoutUser,
};
