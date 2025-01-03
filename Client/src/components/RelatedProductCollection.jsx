import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItemCard from './ProductItemCard';
import Title from './Title';

const RelatedProductCollection = ({ category }) => {

    const { products, currency } = useContext(ShopContext);
    const [relatedProduct, setRelatedProduct] = useState([])

    useEffect(() => {
        let productCopy = products.slice()

        if (products.length > 0) {
            productCopy = productCopy.filter((item) => category === item.category);

        }
        console.log(productCopy.slice(0, 3))

        setRelatedProduct(productCopy.slice(0, 7))
    }, [products])

    return (
        <div className='my-20 '>
            <div className='text-center text-3xl my-8'>
                <Title text={"RELATED PRODUCTS"} />
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 sm:gap-12 '>
                {
                    relatedProduct.map((item, index) => (
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
    )
}

export default RelatedProductCollection
