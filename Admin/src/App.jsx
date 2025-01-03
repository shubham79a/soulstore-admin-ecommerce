import React, { useEffect, useState } from 'react'
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'
import { Route, Routes } from 'react-router-dom'
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import Login from './components/Login'
import {ToastContainer} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const backend_url = import.meta.env.VITE_BACKEND_URL
export const currency='$'

function App() {

  const [token, setToken] = useState(localStorage.getItem("token")?localStorage.getItem("token"): "")
  useEffect(()=>{
    localStorage.setItem("token",token)
  },[token])



  return (
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      {token === ""
        ? <Login setToken={setToken} />
        : <>
          <NavBar token={token} setToken={setToken} />
          <hr />
          <div className='flex w-full'>
            <SideBar />
            <div className='w-[70%] mx-auto ml-[max(5vw,25px)] text-gray-600 text-base '>
              <Routes>
                <Route element={<Add token={token} />} path='/add' />
                <Route element={<List token={token} />} path='/list' />
                <Route path='/orders' element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>
      }
    </div>
  )
}

export default App