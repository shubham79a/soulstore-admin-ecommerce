import React from 'react'
import { Link } from "react-router-dom"


const GenderCard = ({ image, title, gender }) => {

    return (
        <div className='mb-2  '>
            <div className=''>
                <Link to={`/${gender}`} className='relative flex flex-col items-center  '>
                    <div className=''>
                        <img src={image} alt="h" className='rounded-sm h-[16rem] w-[24rem]' />
                    </div>
                    <p className='font-extrabold border-2 border-slate-800 absolute bg-white text-black bottom-[-1rem] w-[80%] rounded-lg text-center pt-1 '>{title}</p>

                </Link>
            </div>
        </div>
    )
}

export default GenderCard
