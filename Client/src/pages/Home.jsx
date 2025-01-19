import BestSellerItems from "../components/BestSellerItems";

import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";


function Home() {
  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">

      <Hero />

      <BestSellerItems />
      <LatestCollection />

    </div>
  )
}

export default Home;
