import React from "react";
import Hero from "../Components/Hero";
import Navbar from "../Components/Navbar";
import Slider from "../Components/Slider";

const Home = () => {
  return (
    <div className="bg-[#082026]">
      <Navbar></Navbar>
      <Hero></Hero>
      <Slider/>
    </div>
  );
};

export default Home;
