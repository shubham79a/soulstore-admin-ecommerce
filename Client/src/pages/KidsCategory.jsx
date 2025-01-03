import React, { useContext } from 'react'
import Title from '../components/Title';
import GenderCard from '../components/GenderCard';
import { ShopContext } from '../context/ShopContext';



const KidsCategory = () => {
    const { menCategory } = useContext(ShopContext);
    return (
        <div className='pt-8 mx-4 md:mx-20 '>
            <div className='text-3xl text-center py-8'  >
                <Title text="CATEGORIES" />
            </div>
            <div className='grid grid-cols-1  sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-3 gap-12 gap-y-6 '>
                {
                    menCategory.map((item, index) => (
                        <GenderCard
                            key={index}
                            title={item.name}
                            gender={"kids" + "/" + item.name.toLocaleLowerCase()}
                            image={item.image}
                        />
                    ))
                }

            </div>

        </div>
    )
}

export default KidsCategory
