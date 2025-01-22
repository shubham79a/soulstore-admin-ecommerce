import React, { useContext, useState } from 'react'
import Title from '../components/Title'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'


function PlaceOrder() {

  const { navigate, backend_URL, token, cartItems, currency, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext)
  const [method, setMethod] = useState('cod')
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: '',
    email: '',
    street: "",
    city: "",
    state: "",
    zipcode: "",
    country: "",
    phone: "",
  })

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prevData) => ({ ...prevData, [name]: value }))
  }

  // for razorpay

  const initPay = (order) => {
    const options = {
      key: import.meta.env.VITE_RAZORPAY_KEY_ID,
      amount: order.amount,
      currency: order.currency,
      name: 'Order Payment',
      description: 'Order Payment',
      order_id: order._id,
      receipt: order.receipt,
      handler: async (response) => {
        try {
          // console.log(response);
          


          const { data } = await axios.post(backend_URL + '/api/order/verify-razorpay', response, { headers: { token } })

          if (data.success) {
            setCartItems({})
            navigate('/orders')
            toast.success(data.message)
          }
          else{
            toast.error(data.message)
          }

        } catch (error) {
          console.log(error)
          toast.error(error.message)
        }
      }
    }
    const rzp = new window.Razorpay(options)
    rzp.open()

  }

  const onSubmitHandler = async (e) => {
    e.preventDefault()
    try {

      let orderItems = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items))
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }

      // console.log(orderItems)

      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee,
      }

      switch (method) {
        // api call for cod
        case 'cod':
          const response = await axios.post(backend_URL + '/api/order/place', orderData, { headers: { token } })
          if (response.data.success) {
            setCartItems({})
            navigate('/orders')
          }
          else {
            toast.error(response.data.message)
          }
          break;
        case 'Stripe':
          // api call for stripe
          const responseStripe = await axios.post(backend_URL + '/api/order/stripe', orderData, { headers: { token } })

          if (responseStripe.data.success) {
            const { session_url } = responseStripe.data;
            window.location.replace(session_url)
          }
          else {
            toast.error(responseStripe.data.message)
          }
          break;
        case 'Razorpay':

          const responseRazorpay = await axios.post(backend_URL + '/api/order/razorpay', orderData, { headers: { token } })
          if (responseRazorpay.data.success) {
            // console.log(responseRazorpay.data.order);
            initPay(responseRazorpay.data.order)
            setCartItems({})
            navigate('/orders')
          }

          break;
        default:
          break
      }

    } catch (error) {
      console.log(error);

    }
  }




  return (
    <form onSubmit={onSubmitHandler} className='mt-16'>
      <div className='grid grid-flow-dense sm:grid-cols-2 mx-8 gap-10 sm:mx-16'>
        <div className=''>
          <h1 className='text-xl font-bold mb-4'>DELIVERY INFORMATION</h1>
          <div action="" className='flex flex-col gap-4'>
            <div className='w-full flex gap-4 '>
              <input className='w-full border rounded px-2 py-1' type="text" name='firstName' value={formData.firstName} onChange={handleInputChange} placeholder='First Name' required />
              <input className='w-full border rounded px-2 py-1' type="text" name='lastName' value={formData.lastName} onChange={handleInputChange} placeholder='Last Name' required />

            </div>
            <input className='w-full border rounded px-2 py-1' type="email" name='email' value={formData.email} onChange={handleInputChange} placeholder='Email address' required />
            <input required className='w-full border rounded px-2 py-1' type="text" name='street' value={formData.street} onChange={handleInputChange} placeholder='Street' />
            <div className=' flex gap-4 '>
              <input required className='w-full border rounded px-2 py-1' type="text" name='city' value={formData.city} onChange={handleInputChange} placeholder='City' />
              <input required className='w-full border rounded px-2 py-1' type="text" name='state' value={formData.state} onChange={handleInputChange} placeholder='State' />
            </div>
            <div className='w-full flex gap-4 '>
              <input required className='w-full border rounded px-2 py-1' type="text" name='zipcode' value={formData.zipcode} onChange={handleInputChange} placeholder='Zipcode' />
              <input required className='w-full border rounded px-2 py-1' type="text" name='country' value={formData.country} onChange={handleInputChange} placeholder='Country' />
            </div>
            <input required className='w-full border rounded px-2 py-1' type="text" name='phone' value={formData.phone} onChange={handleInputChange} placeholder='Phone' />

          </div>
        </div>
        <div>
          <h1 className=' mt-8 mb-4 text-xl font-bold'>DELIVERY INFORMATION</h1>
          <div className='flex flex-col gap-2'>
            <div className='flex justify-between'>
              <p>Subtotal</p>
              <p>{currency}{getCartAmount()}</p>
            </div>
            <hr />
            <div className='flex justify-between'>
              <p>Shipping Fee</p>
              <p>{currency}{delivery_fee}</p>
            </div>
            <hr />
            <div className='flex justify-between'>
              <p>Total</p>
              <p>{currency}{getCartAmount() + delivery_fee}</p>
            </div>

          </div>
          <div className='flex justify-between gap-1 items-center mt-8'>
            <div onClick={() => setMethod('Razorpay')} className='px-4 py-2 cursor-pointer border rounded-sm text-white text-center'>
              {/* <p>Razorpay</p> */}
              <img className='h-5 ' src={assets.razorpay_logo} alt="" />
            </div>
            <div onClick={() => setMethod('Stripe')} className='px-4 py-2 cursor-pointer border rounded-sm text-white text-center'>
              {/* <p>Stripe</p> */}
              <img className='h-5 ' src={assets.stripe_logo} alt="" />
            </div>
            <div onClick={() => setMethod('cod')} className=" bg-slate-200 text-blue-700 px-4 py-2 cursor-pointer border rounded-sm  text-center">
              <p required className='text-gray-500 text-sm font-medium'>COD</p>
            </div>
          </div>
          <div className='flex justify-end'>
            <button type='submit' className='bg-black mt-4 text-white px-3 py-2 w-40 '>PLACE ORDER</button>
          </div>

        </div>
      </div>
    </form>
  )
}

export default PlaceOrder