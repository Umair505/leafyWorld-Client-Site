import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";

const RootLayout = () => {
  return (
    <div>
      <div className="bg-[#082026]">
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
