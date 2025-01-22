import orderModel from "../models/orderModel.js"
import userModel from "../models/userModel.js"
import Stripe from 'stripe'
import razopay from 'razorpay'

// global variables

const currency = 'usd'
const deliveryCharge = 10

// gateway initialized

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY)

const razorpayInstance = new razopay({
    key_id: process.env.RAZORPAY_KEY_ID,
    key_secret: process.env.RAZORPAY_KEY_SECRET
})


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
    const { userId, items, amount, address } = req.body
    try {

        const { origin } = req.headers

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Stripe",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()


        const line_items = items.map((item) => ({
            price_data: {
                currency: currency,
                product_data: {
                    name: item.name,
                },
                unit_amount: item.price * 100
            },
            quantity: item.quantity
        }))

        line_items.push({
            price_data: {
                currency: currency,
                product_data: {
                    name: 'Delivery Charges',

                },
                unit_amount: deliveryCharge
            },
            quantity: 1
        })

        const session = await stripe.checkout.sessions.create({
            success_url: `${origin}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url: `${origin}/verify?success=false&orderId=${newOrder._id}`,
            line_items,
            mode: 'payment',
        })

        res.json({ success: true, session_url: session.url })

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// verify stripe 

const verifyStripe = async (req, res) => {
    try {
        const { orderId, success, userId } = req.body
        if (success === 'true') {
            await orderModel.findByIdAndUpdate(orderId, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.json({ success: true });
        }
        else {
            await orderModel.findByIdAndDelete(orderId)
            res.json({ success: false });
        }
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}

// razorpay
const placeOrderRazorpay = async (req, res) => {
    try {
        const { userId, items, amount, address } = req.body

        const orderData = {
            userId,
            items,
            address,
            amount,
            paymentMethod: "Razorpay",
            payment: false,
            date: Date.now()
        }

        const newOrder = new orderModel(orderData)
        await newOrder.save()

        const options = {
            amount: amount * 100,
            currency: currency.toUpperCase(),
            receipt: newOrder._id.toString(),
        }

        await razorpayInstance.orders.create(options, (error, order) => {
            if (error) {
                console.log(error)
                return res.json({ success: false, message: error })
            }
            res.json({ success: true, order })
        })





    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


const verifyRazorpay = async (req, res) => {
    try {

        const { userId, razorpay_payment_id } = req.body

        const orderInfo = await razorpayInstance.orders.fetch(razorpay_payment_id)
        // console.log(orderInfo)

        if (orderInfo.status === 'paid') {
            await orderModel.findByIdAndUpdate(orderInfo.receipt, { payment: true })
            await userModel.findByIdAndUpdate(userId, { cartData: {} })
            res.json({ success: true, message: 'Payment successful' })
        }
        else {
            res.json({ success: false, message: 'Payment failed' })
        }


    } catch (error) {
        console.log(error)
        res.json({ success: false, message: error.message })
    }
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

export { placeOrder, verifyRazorpay, placeOrderRazorpay, placeOrderStripe, allOrders, userOrders, updateOrderStatus, verifyStripe }

