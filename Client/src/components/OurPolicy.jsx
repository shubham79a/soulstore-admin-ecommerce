import React from 'react'
import { assets } from '../assets/assets'
const OurPolicy = () => {
    return (
        <div className='flex flex-col sm:flex-row justify-around gap-12 sm:gap-12 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700 '>
            <div>
                <img src={assets.exchange_icon} alt="exchange-icon" className='w-12 m-auto mb-5' />
                <p className='font-semibold'>Easy Exchange Policy</p>
                <p className='text-gray-400'>We Offer hassle free exchange policy</p>
            </div>
            <div>
                <img src={assets.exchange_icon} alt="exchange-icon" className='w-12 m-auto mb-5' />
                <p className='font-semibold'>Best Costumber Support</p>
                <p className='text-gray-400'>We Offer hassle free exchange policy</p>
            </div>
            <div>
                <img src={assets.exchange_icon} alt="exchange-icon" className='w-12 m-auto mb-5' />
                <p className='font-semibold'>7 Days Return Policy</p>
                <p className='text-gray-400'>We Offer hassle free exchange policy</p>
            </div>
        </div>
    )
}

export default OurPolicy
