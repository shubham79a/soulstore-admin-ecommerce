import { useState } from "react";
import { useContext } from "react";
import { assets } from "../assets/assets"
import { ShopContext } from "../context/ShopContext";


function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const { heroSectionImages } = useContext(ShopContext);


    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0;
        const newIndex = isFirstSlide ? heroSectionImages.length - 1 : currentIndex - 1;
        setCurrentIndex(newIndex);
    };

    const nextSlide = () => {
        const isLastSlide = currentIndex === heroSectionImages.length - 1;
        const newIndex = isLastSlide ? 0 : currentIndex + 1;
        setCurrentIndex(newIndex);
    };

    return (

        // <div className="mt-1 w-full">
        //     <div >
        //         <img src={assets.hero_small} srcSet={assets.hero_section_1} alt="" className="rounded-md cursor-pointer" />
        //     </div>
        // </div>



        <div className="relative w-full pt-4 mx-auto">
            {/* Slider Images */}
            <div className="overflow-hidden relative">
                {heroSectionImages.map((image, index) => (
                    <img
                        key={index}
                        src={image}
                        alt={`Slide ${index}`}
                        className={`w-full object-cover transition duration-700 ease-in-out transform rounded-lg cursor-pointer ${index === currentIndex ? 'block' : 'hidden'
                            }`}
                    />
                ))}
            </div>

            {/* Left Arrow */}
            <button
                onClick={prevSlide}
                className="absolute top-1/2 left-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
            >
                ❮
            </button>

            {/* Right Arrow */}
            <button
                onClick={nextSlide}
                className="absolute top-1/2 right-2 transform -translate-y-1/2 bg-gray-800 text-white p-2 rounded-full hover:bg-gray-600"
            >
                ❯
            </button>
        </div>
    );
};



export default Hero