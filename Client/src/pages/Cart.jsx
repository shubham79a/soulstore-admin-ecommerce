import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from "../components/Title"
import { assets } from '../assets/assets'

function Cart() {
  const { products, currency, cartItems, updateQuantity, navigate, getCartAmount, delivery_fee } = useContext(ShopContext)
  const [cartData, setCartData] = useState([])


  useEffect(() => {
    const tempData = [];
    if (products.length > 0) {
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            tempData.push({
              _id: items,
              size: item,
              quantity: cartItems[items][item],
            })
          }
        }

      }
      setCartData(tempData);
    }


  }, [cartItems, products])


  return (
    <div className='border-t pt-14 mx-6 sm:mx-16 '>
      <div className='text-2xl sm:text-3xl mb-3 '>
        <Title text={"YOUR CART"} />
      </div>
      <div className='' >
        <div>
          {/* <img src={cartData.image[0]} alt="" /> */}
        </div>
        {cartData.length > 0 ?
          <div>
            {
              cartData.map((item, index) => {
                const productData = products.find((product) => product._id === item._id);
                return (
                  <div key={index} className='border p-1 sm:p-4 grid grid-cols-[14fr_2fr_2fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center '>
                    <div className='flex items-start gap-5'>
                      <img src={productData.image[0]} alt="" className='w-16 sm:w-20' />
                      <div>
                        <p className='text-sm sm:text-lg font-medium'>{productData.name}</p>
                        <div className='flex items-center gap-5 mt-2'>
                          <p>{currency}{productData.price} </p>
                          <p>{item.size}</p>
                        </div>
                      </div>

                    </div>

                    <input type="number" className='border max-w-10 sm:max-w-20 px-1 py-1' min={1} defaultValue={item.quantity}
                      onChange={(e) => (e.target.value === '' || e.target.value === '0' ? null : updateQuantity(item._id, item.size, (e.target.value)))}
                    />
                    <img className='w-4 ml-1 mr-1 sm:mr-4 cursor-pointer' src={assets.bin_icon} alt=""
                      onClick={() => updateQuantity(item._id, item.size, 0)}
                    />


                  </div>
                )
              })
            }
          </div> :
          <div>
            <p className='text-center text-2xl pt-4 '>Your Cart Is Empty</p>
          </div>
        }

      </div>

      <div className='mt-10 flex sm:justify-end mr-10'>
        <div></div>
        <div>
          <p className='text-2xl font-bold mb-4'>Order Summary</p>
          <div className='flex flex-col gap-2'>
            <div className='flex justify-between gap-52'>
              <p>Subtotal</p>
              <p>{currency}{getCartAmount()}</p>
            </div>
            <hr />
            <div className='flex justify-between gap-52'>
              <p>Shipping Fee</p>
              <p>{currency}{delivery_fee}</p>
            </div>
            <hr />
            <div className='flex justify-between gap-52'>
              <p>Total</p>

              <p>{currency}{getCartAmount() + delivery_fee} </p>
            </div>
            <div className=' flex justify-end'>

              <button onClick={() => navigate('/place-order')} className='bg-black text-white px-3 py-1 rounded-sm mt-4'>PROCEED TO CHECKOUT</button>
            </div>


          </div>

        </div>
      </div>

    </div>
  )
}

export default Cart