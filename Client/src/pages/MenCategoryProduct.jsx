import React, { useContext, useEffect, useState } from 'react'

import { useParams } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';
import ProductItemCard from '../components/ProductItemCard';
import Title from "../components/Title"


const MenCategoryProduct = () => {
    const { category, productType } = useParams();
    console.log(productType)
    console.log(category)

    const { products } = useContext(ShopContext);
    const [filProducts, setFilProducts] = useState([]);

    useEffect(() => {
        let tempProducts = products.slice()

        if (products.length > 0) {
            tempProducts = tempProducts.filter((item) => category === item.category.toLowerCase())
            tempProducts = tempProducts.filter((item) => productType === item.subCategory)
        }

        setFilProducts(tempProducts);
    }, [products])

    return (

        <div className='pt-8 mx-4 md:mx-20 '>

            <div className='text-3xl text-center pb-8'  >
                <Title text={category.toUpperCase() + "'S " + productType.toUpperCase()} />
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-y-6 gap-4 sm:gap-12 place-items-center'>

                {
                    filProducts.map((item, index) =>
                        <ProductItemCard
                            key={index}
                            image={item.image}
                            name={item.name}
                            price={item.price}
                            id={item._id}
                        />
                    )
                }
            </div >
        </div>
    )
}

export default MenCategoryProduct
