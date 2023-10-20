import express from "express";
import {
    addOrderItems,
    getAllOrders,
    getMyOrder,
    getOrderById,                  
    updateOrderIsDelivered,
    updateOrderIsPaid,
} from "../controllers/orderController.js";
import { admin, protect } from "../middleware/authMiddleware.js";

const router = express.Router();


router.route('/').post( protect ,addOrderItems).get(protect ,admin ,getAllOrders)
router.route('/myOrders').get(protect , getMyOrder)
router.route('/:id').get(protect , getOrderById)

router.route('/:id/pay').put(protect, updateOrderIsPaid)
router.route('/:id/deliver').put(protect,admin ,updateOrderIsDelivered)


export default router