import React, { useContext, useState, useEffect } from 'react'
import { assets } from '../assets/assets'
import ProductItemCard from '../components/ProductItemCard';
import { ShopContext } from '../context/ShopContext';

// behave as search page  


const Collection = () => {

  const { products, search, setSearch } = useContext(ShopContext);
  const [filterProducts, setFilterProducts] = useState([])
  const [showFilter, setShowFilter] = useState(false)
  const [categorySelect, setCategorySelect] = useState([])
  const [sizeSelect, setSizeSelect] = useState([])
  const [priceRange, setPriceRange] = useState([])
  const [ratingRange, setRatingRange] = useState([])
  const [sortType, setSortType] = useState('relevent')

  const userCategorySelection = (e) => {
    if (categorySelect.includes(e.target.value)) {
      setCategorySelect(prev => prev.filter(item => item != e.target.value))
    }
    else {
      setCategorySelect(prev => [...prev, e.target.value])
    }
  }


  const userSizeSelection = (e) => {
    if (sizeSelect.includes(e.target.value)) {
      setSizeSelect(prev => prev.filter(item => item != e.target.value))
    }
    else {
      setSizeSelect(prev => [...prev, e.target.value])
    }
  }

  const userPriceSelectionRange = (e) => {
    if (priceRange.includes(e.target.value)) {
      setPriceRange(prev => prev.filter(item => item != e.target.value))
    }
    else {
      setPriceRange(prev => [...prev, e.target.value])
    }
  }
  // console.log(priceRange)

  const userRatingSelectionRange = (e) => {
    if (ratingRange.includes(e.target.value)) {
      setRatingRange(prev => prev.filter(item => item != e.target.value));
    }
    else {
      setRatingRange(prev => [...prev, e.target.value]);
    }
  }

  console.log(ratingRange);

  const applyFilter = () => {
    let productCopy = products.slice();

    if (search) {
      productCopy = productCopy.filter((item) => item.name.toLowerCase().includes(search.toLowerCase()))
    }

    if (categorySelect.length > 0) {
      productCopy = productCopy.filter(item => categorySelect.includes(item.category))
    }
    if (sizeSelect.length > 0) {
      productCopy = productCopy.filter(item =>
        sizeSelect.some((size) =>
          item.sizes.includes(size)
        ))

    }
    if (priceRange.length > 0) {
      productCopy = productCopy.filter((product) => {
        return priceRange.some(range => {
          if (range === "0-1000") return product.price <= 1000;
          if (range === "1000-2000") return product.price > 1000 && product.price <= 2000;
          if (range === "2000-3000") return product.price > 2000 && product.price <= 3000;
          if (range === "3000+") return product.price > 3000;
        })
      })
      console.log(priceRange)


      // let i = 0;
      // let arr = []
      // while (i < priceRange.length) {
      //   arr = arr.concat(Number(priceRange[i]));
      //   i++;
      // }
      // console.log(arr);
      // const tempCopy = []
      // while (i--) {
      //   productCopy = productCopy.filter(item => item.price < priceRange && item.price > priceRange - 1000);
      //   console.log(tempCopy)
      // }
      // console.log(productCopy);
    }


    // we have to solve sorting issue

    setFilterProducts(productCopy);


  }
  // console.log(sizeSelect)

  const sortProduct = () => {
    let fpCopy = filterProducts.slice()

    switch (sortType) {
      case "low-high":
        setFilterProducts(fpCopy.sort((a, b) => a.price - b.price));
        break;
      case "high-low":
        setFilterProducts(fpCopy.sort((a, b) => (b.price - a.price)));
        break;
      default:
        applyFilter();
        break;
    }
  }

  useEffect(() => {
    sortProduct()
  }, [sortType])



  useEffect(() => {
    setFilterProducts(products)
  }, [])
  useEffect(() => {
    applyFilter();

  }, [categorySelect, sizeSelect, priceRange, search])



  return (

    <>
      <div className='flex items-center flex-row justify-between mt-4'>
        <div>
          <p className=' text-xl flex items-center cursor-pointer  gap-2 pl-6 sm:pl-16 md:pl-8 font-bold  '
            onClick={() => {
              setShowFilter(!showFilter);
            }}

          > Filters </p>
        </div>
        <div className='flex gap-2  py-1 mt-4  mr-6 w-fit mb-6 justify-self-end'>


          <select onChange={(e) => setSortType(e.target.value)} name="" className='border-gray-600 text-sm px-2 border-2 py-1'>
            <option value="relevent">Sort</option>
            <option value="low-high"  >Low to High</option>
            <option value="high-low">High to Low</option>
          </select>

        </div>
      </div>


      <div className='flex flex-col mt-4 sm:flex-row w-[100%] '>
        {/* filter options */}
        <div className={`w-full sm:w-3/5 md:w-[46%] lg:w-1/3 lg:max-w-[33%] md:max-w-[33%] "`}>
          <div className='pl-4 pr-6 mb-8  '>
            <div className={` border border-gray-300  ml-2 ${showFilter ? " " : "hidden"} sm:block`}>
              <div className='pt-4 pb-4 pl-5'>
                <p className='font-semibold'> CATEGORY</p>
                <div className='flex flex-row flex-wrap gap-4 sm:flex-col sm:gap-0 md:flex-col md:gap-0 lg:flex-col lg:gap-0 '>
                  <div className='flex  gap-2'>
                    <input type="checkbox" value={"Men"} onChange={userCategorySelection} />
                    <p >Men</p>
                  </div>
                  <div className='flex gap-2'>
                    <input type="checkbox" value={"Women"} onChange={userCategorySelection} />
                    <p >Women</p>
                  </div>
                  <div className='flex gap-2'>
                    <input type="checkbox" value={"Kids"} onChange={userCategorySelection} />
                    <p >Kids</p>
                  </div>
                </div>
              </div>
              <hr className='w-full' />

              <div className='pt-8 pb-4 pl-5'>
                <p className='font-semibold'> SIZE</p>
                <div className='flex flex-row flex-wrap gap-4 sm:flex-col sm:gap-0 md:flex-col md:gap-0 lg:flex-col lg:gap-0' >
                  <div className='flex gap-2'>
                    <input type="checkbox" value={"XXS"} onChange={userSizeSelection} />
                    <p >XXS</p>
                  </div>
                  <div className='flex gap-2'>
                    <input type="checkbox" value={"XS"} onChange={userSizeSelection} />
                    <p >XS</p>
                  </div>
                  <div className='flex gap-2'>
                    <input type="checkbox" value={"S"} onChange={userSizeSelection} />
                    <p >S</p>
                  </div>
                  <div className='flex gap-2'>
                    <input type="checkbox" value={"M"} onChange={userSizeSelection} />
                    <p >M</p>
                  </div>
                  <div className='flex gap-2'>
                    <input type="checkbox" value={"L"} onChange={userSizeSelection} />
                    <p >L</p>
                  </div>
                  <div className='flex gap-2'>
                    <input type="checkbox" value={"XL"} onChange={userSizeSelection} />
                    <p >XL</p>
                  </div>
                  <div className='flex gap-2'>
                    <input type="checkbox" value={"XXL"} onChange={userSizeSelection} />
                    <p >XXL</p>
                  </div>
                </div>
              </div>
              <hr />

              <div className='pt-8 pb-4 pl-5'>
                <p className='font-semibold'> PRICES</p>
                <div className='flex flex-row flex-wrap gap-4 sm:flex-col sm:gap-0 md:flex-col md:gap-0 lg:flex-col lg:gap-0'>
                  <div className='flex gap-2'>
                    <input type="checkbox"
                      value={"0-1000"}
                      onChange={userPriceSelectionRange}
                    />
                    <p >Below Rs. 1000  </p>
                  </div>
                  <div className='flex gap-2'>
                    <input type="checkbox"
                      value={"1000-2000"}
                      onChange={userPriceSelectionRange}
                    />
                    <p >Rs.1000 - 2000</p>
                  </div>
                  <div className='flex gap-2'>
                    <input type="checkbox"
                      value={"2000-3000"}
                      onChange={userPriceSelectionRange}
                    />
                    <p >Rs.2000 - 3000</p>
                  </div>
                  <div className='flex gap-2'>
                    <input type="checkbox"
                      value={"3000+"}
                      onChange={userPriceSelectionRange}
                    />
                    <p >Above Rs. 3000</p>
                  </div>

                </div>
              </div>
              <hr />

              <div className='pt-8 pb-10 pl-5'>
                <p className='font-semibold'>RATINGS</p>
                <div className='flex flex-row flex-wrap gap-4 sm:flex-col sm:gap-0 md:flex-col md:gap-0 lg:flex-col lg:gap-0'>
                  <div className='flex gap-2'>
                    <input type="checkbox" value={"4 Star+"} onChange={userRatingSelectionRange} />
                    <p >4⭐ & Above</p>

                  </div>
                  <div className='flex gap-2'>
                    <input type="checkbox" value={"3-4 Star"} onChange={userRatingSelectionRange} />
                    <p >3⭐ & Above</p>
                  </div>
                  <div className='flex gap-2'>
                    <input type="checkbox" value={"2-3 Star"} onChange={userRatingSelectionRange} />
                    <p >2⭐ & Above</p>
                  </div>
                  <div className='flex gap-2'>
                    <input type="checkbox" value={"1 Star+"} onChange={userRatingSelectionRange} />
                    <p >1⭐ & Above</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div>
            {
              filterProducts.length > 0 ?
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4 gap-y-6 pr-6 pl-6 justify-items-center '>
                  {
                    filterProducts.map((item, index) => (
                      <ProductItemCard
                        key={index}
                        image={item.image}
                        id={item._id}
                        price={item.price}
                        name={item.name}
                      />
                    ))
                  }
                </div>
                :
                <div className=''>
                  <div className='text-center'>
                    <p className='text-2xl pt-4 '>No Product Found</p>
                  </div>
                </div>
            }

          </div>
        </div>
      </div>


    </>
  )
}

export default Collection


