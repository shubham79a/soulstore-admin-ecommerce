import React, { useContext, useEffect, useState } from 'react'
import Title from './Title';
import { ShopContext } from '../context/ShopContext';
import ProductItemCard from './ProductItemCard';

const BestSellerItems = () => {
    const { products } = useContext(ShopContext)
    const [bestSellerItem, setBestSellerItem] = useState([]);

    useEffect(() => {
        const bestproduct = products.filter((item) => { return item.bestseller });
        setBestSellerItem(bestproduct.slice(0, 5))
    }, [products])
    // console.log(bestSellerItem)

    return (
        <>
            <div className='my-10 '>
                <div className='text-center text-3xl py-8'>
                    <Title
                        text={"BEST SELLERS"}
                    />

                </div>
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-12 gap-y-6 place-items-center">
                    {
                        bestSellerItem.map((item, index) => (
                            <ProductItemCard
                                key={index}
                                id={item._id}
                                name={item.name}
                                image={item.image}
                                price={item.price}

                            />
                        ))
                    }
                </div>
            </div>
        </>
    )
}

export default BestSellerItems
