import BestSellerItems from "../components/BestSellerItems";

import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import Category from "../components/Category";

function Home() {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">

      <Hero />
      <Category />
      <BestSellerItems />
      <LatestCollection />

    </div>
  )
}

export default Home;
