import express from "express";
import {
  createProduct,
  deleteProduct,
  getProductById,
  getProducts,
  getTopProduct,
  newReview,
  updateProduct,
} from "../controllers/productController.js";
import { protect, admin } from "../middleware/authMiddleware.js";

const router = express.Router();

router.route("/").get(getProducts).post(protect, admin, createProduct);
router.route("/top").get(getTopProduct);
router
  .route("/:id")
  .get(getProductById)
  .post(protect, admin, updateProduct)
  .delete(protect, admin, deleteProduct);
router.route("/:id/reviews").post(protect, newReview);


export default router;
