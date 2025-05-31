import React, { useContext } from "react";
import heroImg from "../assets/hero.png";
import { Link } from "react-router-dom";
import { AuthContext } from "../provider/AuthProvider";

const Hero = () => {
  const {user} = useContext(AuthContext);
  return (
    <div className="relative overflow-hidden">
      <section className=" lg:min-h-screen ">
       <div className="relative mx-auto w-full max-w-screen-xl px-4 sm:px-6 py-12 md:grid md:grid-cols-2 md:items-center md:gap-12 lg:px-8">
          
          {/* Background image for small devices */}
          <div
            className="block md:hidden absolute inset-0 bg-cover bg-center opacity-10"
            style={{ backgroundImage: `url(${heroImg})` }}
          ></div>

          {/* Left Content */}
          <div className="relative z-10 max-w-prose text-left">
            <span className="text-[#90CE48] font-semibold mb-3 block text-sm sm:text-base">
              Welcome to LeafyWorld
            </span>

            <h1 className="text-3xl font-bold sm:text-4xl lg:text-5xl leading-tight text-[#F5F0E6]">
              Grow your <span className="text-[#D4CF1D]">gardening </span>
              <span className="text-[#90CE48]">community</span>
            </h1>

            <p className="mt-5 text-gray-300 text-base sm:text-lg leading-relaxed">
              Connect with fellow gardeners, share your harvest stories, get expert advice, and find local gardening events. Whether you're into composting, hydroponics, or balcony gardening, LeafyWorld helps you grow your passion.
            </p>

            <div className="mt-8 flex flex-col sm:flex-row flex-wrap gap-4">
              {
                user?"":<Link
                className="inline-flex items-center justify-center rounded-full border border-[#90CE48] bg-[#90CE48] px-6 py-3 font-medium text-[#082026] shadow-sm transition-all hover:bg-[#7CB53B] hover:border-[#7CB53B] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#90CE48] focus:ring-offset-2 focus:ring-offset-[#082026]"
                to="/register"
              >
                Join Our Community
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                </svg>
              </Link>
              }

              <Link
                className="inline-flex items-center justify-center rounded-full border border-[#D4CF1D] px-6 py-3 font-medium text-[#D4CF1D] shadow-sm transition-all hover:bg-[#082026]/50 hover:text-[#F5F0E6] hover:scale-105 focus:outline-none focus:ring-2 focus:ring-[#D4CF1D] focus:ring-offset-2 focus:ring-offset-[#082026]"
                to="/about"
              >
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" className="ml-2 h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </Link>
            </div>

            <div className="mt-10 flex items-center gap-4 text-gray-400">
              <div className="flex -space-x-2">
                <img className="h-10 w-10 rounded-full border-2 border-[#082026]" src="https://randomuser.me/api/portraits/women/44.jpg" alt="User" />
                <img className="h-10 w-10 rounded-full border-2 border-[#082026]" src="https://randomuser.me/api/portraits/men/32.jpg" alt="User" />
                <img className="h-10 w-10 rounded-full border-2 border-[#082026]" src="https://randomuser.me/api/portraits/women/68.jpg" alt="User" />
              </div>
              <p className="text-sm">
                Join <span className="font-semibold text-[#90CE48]">5,000+</span> gardeners in our community
              </p>
            </div>
          </div>

          {/* Right image for medium and larger devices */}
          <div className="relative hidden md:block">
            <img
              className="ml-auto w-full max-w-sm lg:max-w-md"

              src={heroImg}
              alt="Gardening community"
            />
            {/* Decorative elements */}
            <div className="absolute -bottom-6 -left-6 bg-[#D4CF1D]/20 w-32 h-32 rounded-full -z-10"></div>
            <div className="absolute -top-6 -right-6 bg-[#90CE48]/20 w-40 h-40 rounded-full -z-10"></div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hero;
