import React, { createContext, useEffect, useState } from "react"

import { toast } from "react-toastify";
import { menCategory } from "../assets/assets";
import { womenCategory } from "../assets/assets";
import { heroSectionImages } from "../assets/assets"

import { useNavigate } from 'react-router-dom';
import axios from "axios"

export const ShopContext = createContext();


const ShopContextProvider = (props) => {
    const currency = "$";
    const delivery_fee = 10;
    const backend_URL = import.meta.env.VITE_BACKEND_URL
    const [search, setSearch] = useState('')
    const [token, setToken] = useState('')
    const navigate = useNavigate()
    const [products, setProducts] = useState([])

    const [cartItems, setCartItems] = useState({});

    const getProducts = async () => {
        try {
            const response = await axios.get(backend_URL + '/api/product/list')
            if (response.data.success) {
                setProducts(response.data.allProducts)
            }
            else {
                toast.error(response.data.message)

            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }

    }

    useEffect(() => {
        getProducts()
    }, [])


    const addToCart = async (itemId, size) => {
        if (!size) {
            toast.error("Select Product Size")
            return;
        }
        let cartData = structuredClone(cartItems);
        if (cartData[itemId]) {
            if (cartData[itemId][size]) {
                cartData[itemId][size] += 1;
            }
            else {
                cartData[itemId][size] = 1;
            }
        }
        else {
            cartData[itemId] = {};
            cartData[itemId][size] = 1;
        }
        setCartItems(cartData);

        if (token) {
            try {

                await axios.post(backend_URL + '/api/cart/add', { itemId, size }, { headers: { token } })

            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }

    }
    const getCartCount = () => {
        let totalCount = 0;
        for (const items in cartItems) {
            for (const item in cartItems[items]) {
                try {
                    if (cartItems[items][item] > 0) {
                        totalCount += cartItems[items][item]
                    }
                }
                catch (error) {
                    console.error();
                }

            }
        }
        return totalCount
    }
    const updateQuantity = async (itemId, size, quantity) => {
        let cartData = structuredClone(cartItems);
        cartData[itemId][size] = Number(quantity);
        setCartItems(cartData)

        if (token) {
            try {
                await axios.post(backend_URL + '/api/cart/update', { itemId, size, quantity }, { headers: { token } })
            } catch (error) {
                console.log(error);
                toast.error(error.message)
            }
        }
    }

    const getUserCart = async (token) => {
        try {

            const response = await axios.post(backend_URL + '/api/cart/get', {}, { headers: { token } })
            if(response.data.success){
                setCartItems(response.data.cartData)
            }

        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }


    useEffect(() => {
        if (!token && localStorage.getItem("token")) {
            setToken(localStorage.getItem("token"))
            getUserCart(localStorage.getItem('token'))
        }

    }, [])



    const value = {
        heroSectionImages,

        products,
        menCategory,
        womenCategory,
        currency,
        delivery_fee,
        search,
        setSearch,
        cartItems,
        setCartItems,
        addToCart,
        getCartCount,
        updateQuantity,
        token,
        setToken,
        backend_URL,
        navigate


    }
    useEffect(() => {
        console.log(cartItems)
    }, [cartItems])

    return (
        <ShopContext.Provider value={value}>
            {props.children}
        </ShopContext.Provider>
    )
}

export default ShopContextProvider;