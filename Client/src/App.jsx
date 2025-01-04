// import React from "react"
import { Route, Routes } from "react-router-dom"
import Home from "./pages/Home"
import Product from './pages/Product'
import Cart from "./pages/Cart"
import Login from "./pages/Login"
import PlaceOrder from "./pages/PlaceOrder"
import Orders from "./pages/Orders"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import Collection from "./pages/Collection"
import { ToastContainer, toast } from "react-toastify"
import 'react-toastify/dist/ReactToastify.css'
import MenCategory from "./pages/MenCategory"
import MenCategoryProduct from "./pages/MenCategoryProduct"
import WomenCategory from "./pages/WomenCategory"
import KidsCategory from "./pages/KidsCategory"
import AuthForm from "./components/AuthForm"

import ScrollToTop from "./components/ScrollToTop"

const App = () => {
  return (
    <>
      <div className="">
        <ToastContainer />
        <Navbar />
        <ScrollToTop />
        <Routes>          
          <Route path="/" element={<Home />} />
          <Route path="/product/:productId" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          {/* <Route path="/login" element={<Login />} /> */}
          <Route path="/place-order" element={<PlaceOrder />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/collection" element={<Collection />} />
          <Route path="/men" element={<MenCategory />} />
          <Route path="/women" element={<WomenCategory />} />
          <Route path="/kids" element={<KidsCategory />} />
          <Route path="/:category/:productType" element={<MenCategoryProduct />} />
          <Route path="/login" element={<Login />} />
        </Routes>
        <Footer />
      </div>
    </>
  )
}

export default App
