import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title'
import ProductItemCard from './ProductItemCard'

function LatestCollection() {
    const { products } = useContext(ShopContext)
    const [latestProducts12, setLatestProducts12] = useState([])
    // console.log(products)

    useEffect(() => {
        setLatestProducts12(products.slice(0, 12));
    }, [products])
    return (
        <div className='my-10'>
            <div>
            </div>
            <div className='text-center py-8 text-3xl'>
                <Title
                    text={"LATEST COLLECTION"}
                />
               
            </div>

            {/* rendering products */}

            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-y-6 gap-4 sm:gap-12 '>
                {
                    latestProducts12.map((item, index) => (
                        <ProductItemCard
                            key={index}
                            id={item._id}
                            image={item.image}
                            name={item.name}
                            price={item.price}
                        />
                    ))
                }

            </div>

        </div>
    )
}

export default LatestCollection