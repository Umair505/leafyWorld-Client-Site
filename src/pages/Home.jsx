import React from "react";
import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";
import Slider from "../Components/Slider";
import FeaturedGardeners from "../Components/FeaturedGardeners";
import FeaturedTips from "../Components/FeaturedTips";

const Home = () => {
  return (
    <div className="bg-[rgb(8,32,38)]">
      <Hero></Hero>
      <FeaturedGardeners/>
      <Slider/>
      <FeaturedTips/>
    </div>
  );
};

export default Home;
