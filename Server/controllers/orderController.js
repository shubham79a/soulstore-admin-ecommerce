import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"


// place order cod

const placeOrder = async (req, res) => {

    try {

        const { userId, items, amount, address } = req.body
        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "cod",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        await userModel.findByIdAndUpdate(userId, { cartData: {} })

        res.json({ success: true, message: "Order Placed" })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }

}
// stripe
const placeOrderStripe = async (req, res) => {

}


// razorpay
const placeOrderRazorpay = async (req, res) => {

}

// admin panel all orders

const allOrders = async (req, res) => {

    try {
        const allOrderData = await orderModel.find({})
        res.json({ success: true, message: "All order found", allOrderData })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// user order data particular
const userOrders = async (req, res) => {
    try {

        const { userId } = req.body
        const orders = await orderModel.find({ userId })
        res.json({ success: true, message: "Orders found", orders })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}
// updateOrderStatus only admin

const updateOrderStatus = async (req, res) => {
    try {
        const { orderId, status } = req.body
        await orderModel.findByIdAndUpdate(orderId, { status })
        res.json({ success: true, message: "Status Updated" })
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


// cancel order

export { placeOrder, placeOrderRazorpay, placeOrderStripe, allOrders, userOrders, updateOrderStatus }

