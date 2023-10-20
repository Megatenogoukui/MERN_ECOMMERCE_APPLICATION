import express from "express";
import {
  registerUser,
  authUser,
  getUserById,
  getUserProfile,
  updateUser,
  updateUserProfile,
  getUsers,
  deleteUser,
  logoutUser,
} from "../controllers/userController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").post(registerUser).get(protect ,admin , getUsers);
router.post("/auth", authUser);
router.post("/logout",protect , logoutUser);
router.route("/profile").get( protect, getUserProfile).put( protect, updateUserProfile);
router.route("/:id").delete(protect ,admin ,deleteUser).get(protect ,admin ,getUserById).put(protect ,admin ,updateUser);


export default router;
