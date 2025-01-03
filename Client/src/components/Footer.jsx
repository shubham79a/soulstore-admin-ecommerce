import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div className='bg-orange-700 px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] relative bottom-0 left-0 right-0'>
            <div className='flex flex-col sm:grid grid-cols-[1fr_1fr_1fr] gap-14 my-10 mt-40 text-sm pt-10 pb-8'>
                <div className='flex flex-col gap-4 text-white font-bold' >
                    <p className='cursor-pointer'>HELP</p>
                    <p className='cursor-pointer'>ABOUT US</p>
                    <p className='cursor-pointer'>CONTACT US</p>
                    <p className='cursor-pointer'>PRIVACY POLICY</p>
                    <p className='cursor-pointer'>FAQs</p>
                </div>
                <div className=''>
                    <p className=' text-white font-bold'>MAIL US:</p>
                    <p className='text-white font-bold text-xs'>ROOM 403, BLOCK-2</p>
                    <p className='text-white font-bold text-xs'>KHELGAON HOUSING COMPLEX</p>
                    <p className='text-white font-bold text-xs'>KHELGAON,</p>
                    <p className='text-white font-bold text-xs'>RANCHI</p>
                    <p className='text-white font-bold text-xs'>JHARKHAND</p>
                </div>
                <div>
                    <div>
                        <div><p>DOWNLOAD NOW: </p>
                            <div className='flex mt-4 gap-4'>
                                <img src={assets.icons_play} alt="play-store-icon" className="cursor-pointer" />
                                <img src={assets.icons_app} alt="app-store-icon" className="cursor-pointer" />
                            </div></div>

                        <div className='pt-10'>
                            <p>FOLLOW US:</p>
                            <div className=' flex mt-4 gap-4'>
                                <img src={assets.icon_insta} alt="insta-icon" className='cursor-pointer'/>
                                <img src={assets.icon_facebook} alt="facebook-icon" className='cursor-pointer'/>
                                <img src={assets.icon_x} alt="x-icon" className='cursor-pointer'/>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
            <hr className='h-0.5 text-red-400 pb-6'/>

            <p className='text-white text-center pb-4'>Copyright 2024©️ </p>

        </div>
    )
}

export default Footer
