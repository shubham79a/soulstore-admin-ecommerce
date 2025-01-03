import GenderCard from "./GenderCard"
import { assets } from "../assets/assets"
import React from 'react'
import Title from "./Title"


const Cateogary = () => {
    return (
        <div className="mt-8 mb-8">
            <div className='text-center text-3xl pb-8'>
                <Title
                    text={"LET YOU STYLE SPEAK"}
                />
            </div>
            <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-y-6 gap-12 place-items-center'>
                <div>
                    <GenderCard
                        title={"MEN"}
                        image={assets.mens_category}
                        gender={"men"}
                    />
                </div>
                <div><GenderCard
                    title={"WOMEN"}
                    image={assets.womens_category}
                    gender={"women"}
                /></div>
                <div><GenderCard
                    title={"KIDS"}
                    image={assets.kids_category}
                    gender={"kids"}
                /></div>
            </div>
        </div>
    )
}

export default Cateogary
