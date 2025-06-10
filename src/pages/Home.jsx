import React from "react";
import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";
import Slider from "../Components/Slider";
import FeaturedGardeners from "../Components/FeaturedGardeners";

const Home = () => {
  return (
    <div className="bg-[#082026]">
      <Hero></Hero>
      <FeaturedGardeners/>
      <Slider/>
    </div>
  );
};

export default Home;
