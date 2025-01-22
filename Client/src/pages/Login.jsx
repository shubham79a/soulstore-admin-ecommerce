import React, { useContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify';
import axios from 'axios'
import { ShopContext } from '../context/ShopContext';
import { useNavigate } from 'react-router-dom';


function Login() {
  const [currentState, setCurrentState] = useState('Login');
  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");


  const { token, setToken, backend_URL,getUserDetails, } = useContext(ShopContext)
  const navigate = useNavigate()

  const submitHandler = async (e) => {
    try {
      e.preventDefault();
      if (currentState === 'Sign Up') {
        const response = await axios.post(backend_URL + "/api/user/register", { name, email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem("token", response.data.token)
          // console.log(response.data)
          toast.success(response.data.message)
          getUserDetails()
        }
        else {
          toast.error(response.data.message)
        }
      } else {
        const response = await axios.post(backend_URL + '/api/user/login', { email, password })
        if (response.data.success) {
          setToken(response.data.token)
          localStorage.setItem("token", response.data.token)
          getUserDetails()
        }
        else {
          toast.error(response.data.message)
        }


      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)

    }

  }


  useEffect(() => {
    if (token) {
      navigate('/')

    }
  }, [token])

  return (
    <form onSubmit={submitHandler} action="" className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-gray-800 '>
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        <p className='prata-regular text-3xl' >{currentState} </p>
        <hr className='border-none h-[1.5px] w-8 bg-gray-800 ' />
      </div>

      {currentState === 'Login' ? '' : <input type="text" value={name} onChange={(e) => setName(e.target.value)} className='w-full px-3 py-2 border border-gray-900' placeholder='Name' required />}
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className='w-full px-3 py-2 border border-gray-900' placeholder='Email' required />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className='w-full px-3 py-2 border border-gray-900' placeholder='Password' required />
      <div className='w-full flex justify-between text-sm mt-[-8px]'>
        <p className='cursor-pointer'>Forger your password?</p>
        {
          currentState === 'Login'
            ? <p onClick={() => setCurrentState('Sign Up')} className='cursor-pointer'>Create Account</p>
            : <p onClick={() => setCurrentState('Login')} className='cursor-pointer'>Login Here</p>
        }
      </div>
      <button type='submit' className='bg-black text-white px-3 py-1 w-full'>{currentState}</button>

      {/* {
        currentState === 'Login' ? '' :
        <input type="text" placeholder='email' />
        <input type="text" placeholder='password' />
        <input type="text" />
        <div>

        </div>
      } */}
    </form>
  )
}

export default Login