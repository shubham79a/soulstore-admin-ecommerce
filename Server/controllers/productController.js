import {v2 as cloudinary} from "cloudinary"
import productModel from "../models/productModel.js"

// add product
const addProduct=async(req,res)=>{
    try {
        
        const {name,description,price,category,subcategory,sizes,bestseller}=req.body
        const image1=req.files.image1 && req.files.image1[0]
        const image2=req.files.image2 && req.files.image2[0]
        const image3=req.files.image3 && req.files.image3[0]
        const image4=req.files.image4 && req.files.image4[0]

        const images=[image1,image2,image3,image4].filter((item)=>item!==undefined) 
        
        let imagesUrl= await Promise.all(
            images.map(async (item)=>{
                let result=await cloudinary.uploader.upload(item.path,{resource_type:'image'});
                return result.secure_url
            })
        )

        console.log(name,description,category,price,subcategory,sizes,bestseller);
        console.log(imagesUrl);

        const productData={
            name,
            description,
            category,
            subcategory,
            sizes:JSON.parse(sizes),
            price:Number(price),
            bestseller:bestseller==="true" ? true : false,
            image: imagesUrl,
            date: Date.now()
        }

        console.log(productData);

        const product=new productModel(productData)
        await product.save()
        res.json({success:true,message:"Product Added",product})
        

    } catch (error) {
        console.log(error);        
        res.json({success:false,message:error.message})
    }
}

// list product
// listing all products
const listProducts=async(req,res)=>{
    try {

        const allProducts=await productModel.find({});
        console.log(allProducts);

        res.json({success:true,message:"all prouct found",allProducts})
        
    } catch (error) {
        console.log(error);
        res.json({success:false,message:error.message})
        
    }
}


// remove product
const removeProduct=async(req,res)=>{
    try {
        
        await productModel.findByIdAndDelete(req.body.id);
        res.json({success:true,message:"Product Removed"})
    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}


// product information 
const singleProductInfo=async(req,res)=>{
    try {
        
        const productInfo=await productModel.findById(req.body.id)
        if(productInfo){
            res.json({success:true,productInfo})
        }
        else{   
            res.json({success:false,message:"Product Not Found"})
        }

    } catch (error) {
        console.log(error)
        res.json({success:false,message:error.message})
    }
}

export {listProducts,addProduct,removeProduct,singleProductInfo}




