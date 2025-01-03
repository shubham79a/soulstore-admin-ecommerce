import React, { useContext, useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import RelatedProductCollection from '../components/RelatedProductCollection';


const Product = () => {

  // get id from url 

  const { productId } = useParams();
  console.log(productId);
  const { products, currency, addToCart } = useContext(ShopContext);
  const [productData, setProductData] = useState(false)
  const [imageData, setImageData] = useState(" ")
  const [size, setSize] = useState("")

  const fetchProductData = async () => {
    products.map((item) => {
      if (item._id === productId) {
        setProductData(item);
        setImageData(item.image[0]);
        return null;
      }
    })
  }
  console.log(imageData)

  useEffect(() => {
    fetchProductData();
  }, [productId, products])

  return productData ? (
    <div className='pt-10 transition-opacity ease-in duration-500 opacity-100 mx-4 md:mx-16'>
      {/* product data  */}
      <div className='flex gap-12 sm:gap-12 flex-col sm:flex-row'>
        {/* images */}
        <div className='flex-1 flex flex-col-reverse gap-3 sm:flex-row'>
          <div className='flex sm:flex-col overflow-x-auto sm:overflow-y-scroll  justify-between sm:justify-normal sm:w-[18%] w-full '>
            {
              productData.image.map((item, index) => (
                <img onClick={() => setImageData(item)} src={item} alt="product-image" key={index} className='w-[24%] sm:w-full sm:mb-3 flex-shrink-0 cursor-pointer' />
              ))
            }
          </div>
          <div className='w-full sm:w-80%'>
            <img src={imageData} className='w-full h-auto' />
          </div>
        </div>
        {/* info */}
        <div className='flex-1'>
          <h1 className='font-medium text-2xl mt-2'>
            {productData.name}
          </h1>
          <div className='flex items-center gap-1 mt-2'>
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_icon} alt="" className="w-3.5" />
            <img src={assets.star_dull_icon} alt="" className="w-3.5" />
            <p className='pl-2'>{122}</p>
          </div>
          <p className='mt-5 text-3xl font-medium'>{currency}{productData.price} </p>
          <p className='mt-5 text-gray-500 md:w-4/5'>{productData.description}</p>
          <div className='flex flex-col gap-4 my-8 '>
            <p className=''>Select Size</p>
            <div className='flex gap-2'>
              {
                productData.sizes.map((item, index) => (
                  <button onClick={() => setSize(item)} key={index} className={`border py-2 px-4 bg-gray-100 ${item === size ? "border-orange-500" : " "}`}>{item}</button>
                ))
              }
            </div>
          </div>
          <button className='bg-black text-white px-8 py-3 active:bg-gray-700'
            onClick={() => addToCart(productData._id, size)}
          >ADD TO CART </button>
          <hr className='mt-8 sm:w-4/5' />
          <div className='text-sm text-gray-500 mt-5 flex flex-col gap-1'>
            <p>Lorem, ipsum.</p>
            <p>Lorem, ipsum dolor.</p>
            <p>Lorem ipsum dolor sit.</p>
          </div>
        </div>

      </div>

      {/* review */}

      {/* related */}

      <div>
        <RelatedProductCollection
          category={productData.category}
        />
      </div>



    </div>
  ) : <div className='opacity-0'></div>
}

export default Product
