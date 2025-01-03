import React, { useContext, useEffect } from 'react'
import ShopContext from "../context/ShopContext"
import { useLocation } from 'react-router-dom'
const SearchBar = () => {

    const { search, setSearch, products } = useContext(ShopContext)
    const location= useLocation()
    console.log(location)
    // useEffect(()=>{
    //     if()
    // })

    return (
        <div>
        </div>
    )
}

export default SearchBar
