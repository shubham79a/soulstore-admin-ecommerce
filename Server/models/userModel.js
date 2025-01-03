import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email:{
        type: String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    name:{
        type:String,
        required:true,
    },
    cartData:{
        type:Object,
        default:{},
    }

},{minimize:false})

// minimize false means to create a cartData as empty if not use 
// minimize mongo neglet the empty one 

const userModel = mongoose.models.user || mongoose.model("user", userSchema)

export default userModel
