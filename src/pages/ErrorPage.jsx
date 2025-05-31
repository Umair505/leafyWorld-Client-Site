import React from "react";
import { Link } from "react-router";
import errorImg from "../assets/error.jpeg";

const ErrorPage = () => {
  return (
    <div
      className="min-h-screen bg-cover bg-center flex flex-col items-center justify-center text-center px-4 py-10 sm:py-20 relative overflow-hidden"
      style={{
        backgroundImage: `url(${errorImg})`,
        backgroundColor: "#082026",
      }}
    >
      {/* Floating Leaves Animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(12)].map((_, i) => (
          <div
            key={i}
            className="absolute leaf-animation"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${10 + Math.random() * 20}s`,
            }}
          >
            <svg
              width="48"
              height="48"
              viewBox="0 0 24 24"
              fill="none"
              className="text-[#90CE48] opacity-60"
            >
              <path
                d="M12 3c1.5 1.5 3 4 3 6s-1.5 4.5-3 6c-1.5-1.5-3-4-3-6s1.5-4.5 3-6z"
                fill="currentColor"
              />
            </svg>
          </div>
        ))}
      </div>

      {/* Main Content */}
      <div className="z-10 max-w-2xl px-4 sm:px-6">
        <h1 className="text-6xl sm:text-7xl font-extrabold text-white mb-3 drop-shadow-lg">404</h1>
        <h2 className="text-2xl sm:text-3xl font-semibold text-[#F0F4E6] mb-4">
          Oops! The page went on a garden adventure.
        </h2>
        <p className="text-base sm:text-lg text-[#F5F0E6]/90 leading-relaxed mb-6">
          It seems our green friends have hidden this page among the leaves. While we search for it,
          how about you enjoy some fresh air back at our homepage?
        </p>

        {/* Down Arrow Animation */}
        <div className="mb-6">
          <svg
            className="w-12 h-12 sm:w-16 sm:h-16 mx-auto text-[#90CE48] animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>

        {/* Button to Go Back */}
        <Link
          to="/"
          className="inline-flex items-center bg-[#90CE48] hover:bg-[#c7ea46] text-[#082026] font-medium px-6 py-3 rounded-full transition-all duration-300 transform hover:scale-105 shadow-md hover:shadow-[#90CE48]/30"
        >
          Take me back to the garden
          <svg
            className="w-5 h-5 ml-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 5l7 7-7 7M5 5l7 7-7 7"
            />
          </svg>
        </Link>
      </div>

      {/* Animation CSS */}
      <style jsx>{`
        .leaf-animation {
          animation: float linear infinite;
          transform-origin: 50% 50%;
        }

        @keyframes float {
          0% {
            transform: translateY(0) rotate(0deg) scale(1);
          }
          50% {
            transform: translateY(-100px) rotate(180deg) scale(1.1);
          }
          100% {
            transform: translateY(-200px) rotate(360deg) scale(1);
          }
        }

        @media (max-width: 640px) {
          .leaf-animation svg {
            width: 36px;
            height: 36px;
          }
        }
      `}</style>
    </div>
  );
};

export default ErrorPage;
