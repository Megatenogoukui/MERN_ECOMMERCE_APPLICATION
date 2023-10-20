import asyncHandler from "../middleware/asyncHandler.js";
import Order from "../models/orderModel.js";



// @des Create an order
// @route  POST /api/orders
// @access Private
const addOrderItems = asyncHandler(async (req, res) => {
   
 const {
    orderItems,
    shippingAddress,
    paymentMethod,
    shippingPrice,
    taxPrice,
    itemsPrice,
    totalPrice,

 } = req.body
 
 if(orderItems && orderItems.length === 0){
    res.status(400).json({messgae : 'No Order Items'})
 }

 const order = new Order({
    orderItems : orderItems.map((x) => ({
       ...x,
       product : x._id,
       _id : undefined
    })),
    user : req.user._id,
    shippingAddress,
    paymentMethod,
    shippingPrice,
    taxPrice,
    itemsPrice,
    totalPrice,
 })
 
 const createdOrder = await order.save()
 
 res.status(200).json(createdOrder)
});

// @des get logged in users order
// @route  GET /api/orders/myOrders
// @access Private
const getMyOrder = asyncHandler(async (req, res) => {
   const myOrders = await Order.find({user : req.user._id})
    res.status(200).json(myOrders)
   });

// @des get order by id
// @route  GET /api/orders/:id
// @access Private
const getOrderById = asyncHandler(async (req, res) => {
    const orderById = await Order.findById(req.params.id).populate('user','name email')
    if(orderById){
        res.status(200).json(orderById)
    }else{
        res.status(404)
        throw new Error('order not found')
    }
   });

// @des update order Is Paid 
// @route  PUT /api/orders/:id/pay
// @access Private
const updateOrderIsPaid = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)
    
    if(order){
      
      order.isPaid = true
      order.paidAt = Date.now()
      order.paymentResult = {
         id : req.body._id,
         status :req.body.status,
         updateTime : req.body.updateTime,
         emailAddress : req.body.payer.emailAddress
      }
      const updatedOrder = await order.save()

    res.status(200).json(updatedOrder)
    }else{
      const error = new Error("Order not found");
      error.statusCode = 400; // Set the status code on the error object
      next(error); // Call next with the error to trigger the error handler middlewar
    }
    
   });

// @des update order Is Delivered 
// @route  PUT /api/orders/:id/deliver
// @access Private/Admin
const updateOrderIsDelivered = asyncHandler(async (req, res) => {
    const order = await Order.findById(req.params.id)

    if(order){
      order.isDelivered = true
      order.deliveredAt = Date.now()
      console.log('helooo')
      const updatedOrder = order.save()
      res.status(200).json(updatedOrder)
    }else{
      res.status(400)
      throw new Error("Order not Fount")
    }
   });


// @des get all orders
// @route  GET /api/orders

// @access Private/Admin
const getAllOrders = asyncHandler(async (req, res) => {
    const orders = await Order.find({}).populate('user' ,'id name')
    res.status(200).json(orders)
   });


export {
    addOrderItems,
    getAllOrders,
    getMyOrder,
    getOrderById,
    updateOrderIsDelivered,
    updateOrderIsPaid,

}