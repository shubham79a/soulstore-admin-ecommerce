import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backend_url } from '../App'
import { toast } from 'react-toastify'

function Add({token}) {

    const [image1, setImage1] = useState(false)
    const [image2, setImage2] = useState(false)
    const [image3, setImage3] = useState(false)
    const [image4, setImage4] = useState(false)

    const [name, setName] = useState("")
    const [price, setPrice] = useState("")
    const [description, setDescription] = useState("")
    const [category, setCategory] = useState("Men")
    const [subcategory, setSubcategory] = useState("Topwear")
    const [bestseller, setBestseller] = useState(false)
    const [sizes, setSizes] = useState([])

    const onSubmitHandler = async (e) => {
        e.preventDefault();
        try {

            const formData = new FormData()
            formData.append("name", name)
            formData.append("price", price)
            formData.append("description", description)
            formData.append("category", category)
            formData.append("subcategory", subcategory)
            formData.append("bestseller", bestseller)
            formData.append("sizes", JSON.stringify(sizes))

            image1 && formData.append("image1", image1)
            image2 && formData.append("image2", image2)
            image3 && formData.append("image3", image3)
            image4 && formData.append("image4", image4)

            const response = await axios.post(backend_url + "/api/product/add",formData,{headers:{token}})
            if(response.data.success){
                toast.success(response.data.message)
                setName("")
                setDescription("")
                setImage1(false)
                setImage2(false)
                setImage3(false)
                setImage4(false)
                setPrice("")
                setCategory("Men")
                setSubcategory("Topwear")
                setBestseller(false)
                setSizes([])

            }
            else{
                toast.error(response.data.message)

            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }


    return (
        <form action="" onSubmit={onSubmitHandler} className='flex flex-col w-full items-start gap-3 '>
            <div>
                <p className='mb-2 '>Upload Image</p>
                <div className='flex gap-3'>
                    <label htmlFor="image1">
                        <img className='w-20' src={!image1 ? assets.upload_area : URL.createObjectURL(image1)} alt="" />
                        <input onChange={(e) => setImage1(e.target.files[0])} type="file" id='image1' hidden />
                    </label>
                    <label htmlFor="image2">
                        <img className='w-20' src={!image2 ? assets.upload_area : URL.createObjectURL(image2)} alt="" />
                        <input onChange={(e) => setImage2(e.target.files[0])} type="file" id='image2' hidden />
                    </label>
                    <label htmlFor="image3">
                        <img className='w-20' src={!image3 ? assets.upload_area : URL.createObjectURL(image3)} alt="" />
                        <input onChange={(e) => setImage3(e.target.files[0])} type="file" id='image3' hidden />
                    </label>
                    <label htmlFor="image4">
                        <img className='w-20' src={!image4 ? assets.upload_area : URL.createObjectURL(image4)} alt="" />
                        <input onChange={(e) => setImage4(e.target.files[0])} type="file" id='image4' hidden />
                    </label>
                </div>
            </div>
            <div className='w-full'>
                <p className='mb-2'>Product Name</p>
                <input onChange={(e) => setName(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2 ' type="text" placeholder='Type here' required />
            </div>
            <div className='w-full'>
                <p className='mb-2'>Product Description </p>
                <textarea onChange={(e) => setDescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2 ' type="text" placeholder='Write content here' required />
            </div>
            <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                <div className=''>
                    <p className='mb-2'>Poduct Category</p>
                    <select onChange={(e) => setCategory(e.target.value)} value={category} className='px-3 py-1 w-full' >
                        <option value="Men">Men</option>
                        <option value="Women">Women</option>
                        <option value="Kids">Kids</option>
                    </select>
                </div>
                <div>
                    <p className='mb-2'>Poduct Sub Category</p>
                    <select onChange={(e) => setSubcategory(e.target.value)} value={subcategory} className='px-3 py-1 w-full' >
                        <option value="Topwear">Topwear</option>
                        <option value="Bottomwear">Bottomwear</option>
                        <option value="Winterwear">Winterwear</option>
                    </select>
                </div>

                <div>
                    <p className='mb-2'>Product Price</p>
                    <input value={price} onChange={(e) => setPrice(e.target.value)} className='px-3 py-1 w-full sm:w-[120px]' type="number" placeholder='25' />

                </div>
            </div>

            <div>
                <p className='mb-2'>Product Sizes</p>
                <div className='flex gap-3 '>
                    <div onClick={() => setSizes(prev => prev.includes("S") ? prev.filter(item => item !== "S") : [...prev, "S"])}>
                        <p  className={ `${sizes.includes('S')? "bg-pink-200": "bg-slate-200" } py-1 px-3 rounded-md cursor-pointer`}>S</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("M") ? prev.filter(item => item !== "M") : [...prev, "M"])}>
                        <p className={ `${sizes.includes('M')? "bg-pink-200": "bg-slate-200" } py-1 px-3 rounded-md cursor-pointer`}>M</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("L") ? prev.filter(item => item !== "L") : [...prev, "L"])}>
                        <p className={ `${sizes.includes('L')? "bg-pink-200": "bg-slate-200" } py-1 px-3 rounded-md cursor-pointer`}>L</p>
                    </div>
                    <div onClick={() => setSizes(prev => prev.includes("XL") ? prev.filter(item => item !== "XL") : [...prev, "XL"])}>
                        <p className={ `${sizes.includes('XL')? "bg-pink-200": "bg-slate-200" } py-1 px-3 rounded-md cursor-pointer`}>XL</p>
                    </div>
                </div>
            </div>

            <div className='flex gap-2 mt-2'>
                <input onChange={() => setBestseller(prev => !prev)} checked={bestseller} className='' type="checkbox" id="bestseller" />
                <label className='cursor-pointer' htmlFor="bestseller">Bestseller</label>
            </div>

            <button type="submit" className='bg-black text-white px-3 py-2 w-28 rounded-md'>ADD</button>
        </form>
    )
}

export default Add


