import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import logo from "../assets/logo.png";
import { AuthContext } from "../provider/AuthProvider";
import toast from "react-hot-toast";
import userLogo from "../assets/userLogo.png";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout } = useContext(AuthContext);
  
  const handleLogout = () => {
    logout()
      .then(() => {
        toast.success("Logged out successfully");
      })
      .catch((error) => {
        toast.error(error.message || "Logout failed");
      });
  };

  // Active link style function
  const navLinkStyle = ({ isActive }) => 
    isActive 
      ? "text-[#90CE48] font-medium" 
      : "text-[#F5F0E6] hover:text-[#90CE48] transition-colors";

  return (
    <header className="bg-[#082026]/50 backdrop-blur-lg sticky top-0 z-50 shadow-sm pt-5">
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <NavLink
              to="/"
              className={({ isActive }) =>
                `flex items-center gap-2 transition-opacity hover:opacity-90 ${
                  isActive ? "text-[#90CE48]" : "text-[#F5F0E6]"
                }`
              }
              aria-label="LeafyWorld Home"
            >
              <img
                src={logo}
                alt="LeafyWorld Logo"
                className="h-9 w-auto"
              />
              <span className="text-xl font-bold hidden sm:block tracking-tight">
                LeafyWorld
              </span>
            </NavLink>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <NavLink to="/" className={navLinkStyle}>
              Home
            </NavLink>
            <NavLink to="/gardener" className={navLinkStyle}>
              Explore Gardeners
            </NavLink>
            <NavLink to="/tips" className={navLinkStyle}>
              Browse Tips
            </NavLink>
            <NavLink to="/garden-tip" className={navLinkStyle}>
              Share a Garden Tip
            </NavLink>
            <NavLink to="/my-tips" className={navLinkStyle}>
              My Tips
            </NavLink>
          </nav>

          {/* Auth Buttons / Profile */}
          <div className="flex items-center gap-4">
            {user ? (
              <div className="relative">
                <div className="group relative">
                  <button 
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                    className="overflow-hidden rounded-full border-2 border-[#90CE48] focus:outline-none focus:ring-2 focus:ring-[#D4CF1D]"
                  >
                    <img
                      src={user?.photoURL || userLogo}
                      alt="Profile"
                      className="h-10 w-10 object-cover hover:opacity-90 transition-opacity"
                      onError={(e) => {
                        e.currentTarget.src = userLogo;
                        e.currentTarget.onerror = null; 
                      }}
                    />
                  </button>
                  {/* Tooltip */}
                  <div className="absolute right-0 bottom-full mb-2 hidden group-hover:block bg-[#082026] text-white text-xs px-2 py-1 rounded whitespace-nowrap">
                    {user?.displayName || 'Profile'}
                    <div className="absolute top-full right-2 w-0 h-0 border-l-4 border-r-4 border-b-8 border-l-transparent border-r-transparent border-b-[#082026]"></div>
                  </div>
                </div>

                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 rounded-md bg-white shadow-lg py-1 z-50">
                    <div
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-[#90CE48] hover:text-white"
                      onClick={() => setIsProfileOpen(false)}
                    >
                      {user?.displayName}
                    </div>
                    <NavLink
                      to="/profile"
                      className={({ isActive }) => 
                        `block px-4 py-2 text-sm hover:bg-[#90CE48] hover:text-white ${
                          isActive ? "bg-[#90CE48] text-white" : "text-gray-700"
                        }`
                      }
                      onClick={() => setIsProfileOpen(false)}
                    >
                      My Profile
                    </NavLink>
                    <NavLink
                      to="/my-garden"
                      className={({ isActive }) => 
                        `block px-4 py-2 text-sm hover:bg-[#90CE48] hover:text-white ${
                          isActive ? "bg-[#90CE48] text-white" : "text-gray-700"
                        }`
                      }
                      onClick={() => setIsProfileOpen(false)}
                    >
                      My Garden
                    </NavLink>
                    
                    <div className="border-t border-gray-200 my-1"></div>
                    <button
                      onClick={() => {
                        handleLogout();
                        setIsProfileOpen(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-red-500 hover:text-white"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <>
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `hidden md:inline-flex items-center rounded-md border px-4 py-2 text-sm font-medium transition-colors ${
                      isActive 
                        ? "border-[#90CE48] bg-[#082026]/50 text-[#90CE48]"
                        : "border-[#D4CF1D] text-[#D4CF1D] hover:bg-[#082026]/50 hover:text-[#F5F0E6]"
                    }`
                  }
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `hidden md:inline-flex items-center rounded-md px-4 py-2 text-sm font-medium transition-colors ${
                      isActive 
                        ? "bg-[#7CB53B] text-[#082026]"
                        : "bg-[#90CE48] text-[#082026] hover:bg-[#7CB53B]"
                    }`
                  }
                >
                  Join Now
                </NavLink>
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
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="space-y-1 px-2 pt-2">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-base font-medium ${
                    isActive 
                      ? "text-[#90CE48] bg-[#082026]/70"
                      : "text-[#F5F0E6] hover:bg-[#082026]/50"
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
              <NavLink
                to="/gardener"
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-base font-medium ${
                    isActive 
                      ? "text-[#90CE48] bg-[#082026]/70"
                      : "text-[#F5F0E6] hover:bg-[#082026]/50"
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Explore Gardeners
              </NavLink>
              <NavLink
                to="/tips"
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-base font-medium ${
                    isActive 
                      ? "text-[#90CE48] bg-[#082026]/70"
                      : "text-[#F5F0E6] hover:bg-[#082026]/50"
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Browse Tips
              </NavLink>
              <NavLink
                to="/garden-tip"
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-base font-medium ${
                    isActive 
                      ? "text-[#90CE48] bg-[#082026]/70"
                      : "text-[#F5F0E6] hover:bg-[#082026]/50"
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                Share a Garden Tip
              </NavLink>
              <NavLink
                to="/my-tips"
                className={({ isActive }) =>
                  `block rounded-md px-3 py-2 text-base font-medium ${
                    isActive 
                      ? "text-[#90CE48] bg-[#082026]/70"
                      : "text-[#F5F0E6] hover:bg-[#082026]/50"
                  }`
                }
                onClick={() => setIsMenuOpen(false)}
              >
                My Tips
              </NavLink>
            </div>
            {!user && (
              <div className="mt-4 space-y-2 px-2">
                <NavLink
                  to="/login"
                  className={({ isActive }) =>
                    `block w-full rounded-md px-3 py-2 text-center text-base font-medium ${
                      isActive 
                        ? "bg-[#082026]/70 text-[#90CE48]"
                        : "bg-[#082026]/50 text-[#D4CF1D] hover:bg-[#082026]/70"
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Login
                </NavLink>
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `block w-full rounded-md px-3 py-2 text-center text-base font-medium ${
                      isActive 
                        ? "bg-[#7CB53B] text-[#082026]"
                        : "bg-[#90CE48] text-[#082026] hover:bg-[#7CB53B]"
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  Join Now
                </NavLink>
              </div>
            )}
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;