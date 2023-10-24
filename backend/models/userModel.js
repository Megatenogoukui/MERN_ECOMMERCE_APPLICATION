import mongoose from "mongoose";
import bcrypt from "bcryptjs";

//Creating a schema for users
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  isAdmin: {
    type: Boolean,
    required: true,
    default: false,
  },
});

userSchema.methods.matchedPassword = async function (enteredPassword) {
  const verified = await bcrypt.compare(enteredPassword, this.password);
  console.log(verified);
  return verified;
};

userSchema.pre("save", async function (next) {
  //If the password is not modified then go to the next
  if (!this.isModified("password")) {
    next();
  }
  //Hashing the password
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});
//Create a model for the above schema
const User = mongoose.model("User", userSchema);

export default User;
