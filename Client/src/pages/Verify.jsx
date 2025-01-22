import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import axios from 'axios'

const Verify = () => {
    const { navigate, token, setCartItems, backend_URL, } = useContext(ShopContext)
    const [searchparama, setsearchparamas] = useSearchParams()

    const success = searchparama.get('success')
    const orderId = searchparama.get('orderId')


    const verifypayment = async () => {
        try {

            if (!token) {
                return null
            }
            const response = await axios.post(backend_URL + '/api/order/verify-stripe', { success, orderId }, { headers: { token } })
            if (response.data.success) {
                setCartItems({})
                navigate('/orders')
            }
            else {
                navigate('/cart')
            }

        } catch (error) {
            toast.error(error.message)
        }
    }
    useEffect(() => {
        verifypayment()
    }, [token])
    return (
        <div>

        </div>
    )
}

export default Verify
