import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { backend_url, currency } from '../App'
import { toast } from 'react-toastify'

function List({ token }) {

  const [list, setList] = useState([])

  const fetchList = async () => {
    try {

      const response = await axios.get(backend_url + "/api/product/list")
      console.log(response.data);
      if (response.data.success) {
        setList(response.data.allProducts)
        // console.log(list);
      }
      else {
        toast.error(response.data.message)
      }
      



    } catch (error) {
      console.log(error);
      toast.error(error.message)
    }
  }

  const removeProduct = async (id) => {
    try {

      const response = await axios.post(backend_url + "/api/product/remove", { id }, { headers: { token } })
      if (response.data.success) {
        toast.success(response.data.message)
        await fetchList()
      }
      else {
        toast.error(response.data.message)
      }

    } catch (error) {
      console.log(error);
      toast.error(error.message)

    }
  }

  useEffect(() => {
    fetchList()
  }, [])



  return (
    <>
      <p className='mb-2'>All Product List</p>
      <div className='flex flex-col gap-2'>

        {/* table  */}

        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center px-2 py-1 border bg-gray-100 text-sm '>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Subcategory</b>
          <b className='text-center' >Action</b>
        </div>

        {
          // listing
        }

        {
          list.map((item, index) => (
            <div className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-1 px-2 border text-sm ' key={index}>
              <img className='w-12' src={item.image[0]} alt="" />
              <b>{item.name}</b>
              <b>{item.category}</b>
              {/* <b>{item.subcategory} </b> */}
              <b>{currency}{item.price}</b>
              <p className='text-right md:text-center text-lg cursor-pointer'
                onClick={()=>removeProduct(item._id)}
              >X</p>

            </div>
          ))
        }


      </div>

    </>

  )
}

export default List