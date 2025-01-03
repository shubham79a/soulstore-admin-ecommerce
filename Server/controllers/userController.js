import userModel from "../models/userModel.js"
import validator from "validator"
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

// // Example: Decoding in Node.js
// const jwt = require('jsonwebtoken');

// const token = "eyJ0cGxfaW52YWxpZF91cm"; // Replace with the full token
// const decoded = Buffer.from(token.split('.')[1], 'base64').toString('utf-8');
// console.log(decoded);


const createToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET)
}


// user register 
const registerUser = async (req, res) => {
    try {

        const { name, email, password } = req.body

        // check user already exist or not
        const exists = await userModel.findOne({ email })
        if (exists) {
            return res.json({ success: false, message: "User already exist" })
        }

        // validating email 
        if (!validator.isEmail(email)) {
            return res.json({ success: false, message: "Please enter a valid email" })
        }
        if (password.length < 8) {
            return res.json({ success: false, message: "Please enter a strong password" })
        }

        // hashing
        const salt = await bcrypt.genSalt(10)
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new userModel({
            name,
            email,
            password: hashedPassword
        })

        const user = await newUser.save();

        // token
        const token = createToken(user._id)
        res.json({ success: true, token, message: "Account Created"  })
        console.log(token);



    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })

    }
}


// user login 
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body

        const user = await userModel.findOne({ email })
        if (!user) {
            res.json({ success: false, message: "Create an account first" })
        }

        // compare password
        const isMatch = await bcrypt.compare(password, user.password)

        if (isMatch) {
            const token = createToken(user._id)
            res.json({ success: true, token })
        }
        else {
            res.json({ success: false, message: "Invalid Crendentials" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })
    }
}


// admin login 
const adminLogin = async (req, res) => {
    try {

        const { email, password } = req.body
        if (email === process.env.ADMIN_EMAIL && password === process.env.ADMIN_PASSWORD) {
            const token = jwt.sign(email + password, process.env.JWT_SECRET)
            res.json({ success: true, token })
        }
        else {

            res.json({ success: false, message: "Invalid Admin Credentials" })
        }

    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message })


    }
}

export { loginUser, registerUser, adminLogin }