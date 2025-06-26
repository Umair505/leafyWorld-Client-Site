import React from "react";
import Navbar from "../Components/Navbar";
import { Outlet } from "react-router";
import Footer from "../Components/Footer";
import { Toaster } from "react-hot-toast";

const RootLayout = () => {
  return (
    <div>
      <Toaster/>
      <div className="bg-[#082026]">
        <Navbar />
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default RootLayout;
