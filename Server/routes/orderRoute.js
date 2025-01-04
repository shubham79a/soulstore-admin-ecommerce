
import express from "express"
import { placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, userOrders, updateOrderStatus } from "../controllers/orderController.js"
import adminAuth from '../middleware/adminAuth.js'
import authUser from "../middleware/auth.js"

const orderRouter = express.Router()

// admin 
orderRouter.post('/list', adminAuth, allOrders)
orderRouter.post('/status', adminAuth, updateOrderStatus)

// user paymnet
orderRouter.post('/place', authUser, placeOrder)
orderRouter.post('/stripe', authUser, placeOrderStripe)
orderRouter.post('/razorpay', authUser, placeOrderRazorpay)


// user order
orderRouter.post('/userorders', authUser, userOrders)


export default orderRouter

