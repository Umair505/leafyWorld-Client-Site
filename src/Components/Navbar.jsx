import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/logo.png";
const Navbar = ({ isAuthenticated = false }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  return (
    <header className="bg-[#082026] sticky top-0 z-50 shadow-md">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to="/"
              className="flex items-center gap-2 hover:opacity-90 transition-opacity"
              aria-label="LeafyWorld Home"
            >
              {/* Custom Logo Image */}
              <img
                src={logo}
                alt="LeafyWorld Logo"
                className="h-9 w-auto" // Adjust height as needed
              />

              {/* Text - Hidden on mobile, visible from sm breakpoint */}
              <span className="text-xl font-bold text-[#F5F0E6] hidden sm:block tracking-tight">
                LeafyWorld
              </span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link
              to="/about"
              className="text-[#F5F0E6] hover:text-[#90CE48] transition-colors"
            >
              About
            </Link>
            <Link
              to="/community"
              className="text-[#F5F0E6] hover:text-[#90CE48] transition-colors"
            >
              Community
            </Link>
            <Link
              to="/events"
              className="text-[#F5F0E6] hover:text-[#90CE48] transition-colors"
            >
              Events
            </Link>
            <Link
              to="/blog"
              className="text-[#F5F0E6] hover:text-[#90CE48] transition-colors"
            >
              Blog
            </Link>
            <Link
              to="/resources"
              className="text-[#F5F0E6] hover:text-[#90CE48] transition-colors"
            >
              Resources
            </Link>
          </nav>

          {/* Auth Buttons / Profile */}
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <div className="relative">
                <button
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="overflow-hidden rounded-full border-2 border-[#90CE48] focus:outline-none focus:ring-2 focus:ring-[#D4CF1D]"
                >
                  <img
                    src="https://images.unsplash.com/photo-1531123897727-8f129e1688ce?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="Profile"
                    className="h-10 w-10 object-cover"
                  />
                </button>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg py-1 z-50">
                    <Link
                      to="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#90CE48] hover:text-white"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      My Profile
                    </Link>
                    <Link
                      to="/my-garden"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#90CE48] hover:text-white"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      My Garden
                    </Link>
                    <Link
                      to="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#90CE48] hover:text-white"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Settings
                    </Link>
                    <div className="border-t border-gray-200 my-1"></div>
                    <Link
                      to="/logout"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      Logout
                    </Link>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hidden md:inline-flex items-center rounded-md border border-[#D4CF1D] px-4 py-2 text-sm font-medium text-[#D4CF1D] hover:bg-[#082026]/50 hover:text-[#F5F0E6] transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="hidden md:inline-flex items-center rounded-md bg-[#90CE48] px-4 py-2 text-sm font-medium text-[#082026] hover:bg-[#7CB53B] transition-colors"
                >
                  Join Now
                </Link>
              </>
            )}

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="rounded-md p-2 text-[#F5F0E6] hover:bg-[#082026]/50 md:hidden focus:outline-none focus:ring-2 focus:ring-[#D4CF1D]"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMenuOpen ? (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                ) : (
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M4 6h16M4 12h16M4 18h16"
                  />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="space-y-1 px-2 pt-2">
              <Link
                to="/about"
                className="block rounded-md px-3 py-2 text-base font-medium text-[#F5F0E6] hover:bg-[#082026]/50"
                onClick={() => setIsMenuOpen(false)}
              >
                About
              </Link>
              <Link
                to="/community"
                className="block rounded-md px-3 py-2 text-base font-medium text-[#F5F0E6] hover:bg-[#082026]/50"
                onClick={() => setIsMenuOpen(false)}
              >
                Community
              </Link>
              <Link
                to="/events"
                className="block rounded-md px-3 py-2 text-base font-medium text-[#F5F0E6] hover:bg-[#082026]/50"
                onClick={() => setIsMenuOpen(false)}
              >
                Events
              </Link>
              <Link
                to="/blog"
                className="block rounded-md px-3 py-2 text-base font-medium text-[#F5F0E6] hover:bg-[#082026]/50"
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                to="/resources"
                className="block rounded-md px-3 py-2 text-base font-medium text-[#F5F0E6] hover:bg-[#082026]/50"
                onClick={() => setIsMenuOpen(false)}
              >
                Resources
              </Link>
            </div>
            {!isAuthenticated && (
              <div className="mt-4 space-y-2 px-2">
                <Link
                  to="/login"
                  className="block w-full rounded-md bg-[#082026]/50 px-3 py-2 text-center text-base font-medium text-[#D4CF1D] hover:bg-[#082026]/70"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="block w-full rounded-md bg-[#90CE48] px-3 py-2 text-center text-base font-medium text-[#082026] hover:bg-[#7CB53B]"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Join Now
                </Link>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;
