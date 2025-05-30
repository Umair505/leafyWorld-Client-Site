import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import logo from "../assets/logo.png";
const Footer = () => {
  return (
    <>
      {/* Elegant Curved Top Divider */}
      <div className="relative -mt-24 h-24 overflow-hidden">
        <svg 
          viewBox="0 0 1200 120" 
          preserveAspectRatio="none" 
          className="absolute top-0 left-0 w-full h-full"
        >
          <path 
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z" 
            className="fill-[#082026] opacity-25"
          ></path>
          <path 
            d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z" 
            className="fill-[#082026] opacity-50"
          ></path>
          <path 
            d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z" 
            className="fill-[#082026]"
          ></path>
        </svg>
      </div>

      {/* Footer Content */}
      <footer className="bg-[#082026] text-[#F5F0E6] pt-12 pb-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="flex items-center gap-3">
                <img
                                src={logo}
                                alt="LeafyWorld Logo"
                                className="h-9 w-auto" // Adjust height as needed
                              />
                <h3 className="text-2xl font-bold text-[#90CE48]">LeafyWorld</h3>
              </div>
              <p className="text-[#F5F0E6]/80 max-w-md">
                Connecting gardeners worldwide with premium resources, community events, and expert advice.
              </p>
              <ul className="space-y-4">
                <li className="flex items-start gap-4">
                  <FaMapMarkerAlt className="text-[#D4CF1D] mt-1 flex-shrink-0" />
                  <span>123 Garden Lane, Greenville, CA 90210</span>
                </li>
                <li className="flex items-center gap-4">
                  <FaPhoneAlt className="text-[#D4CF1D] flex-shrink-0" />
                  <span>(123) 456-7890</span>
                </li>
                <li className="flex items-center gap-4">
                  <FaEnvelope className="text-[#D4CF1D] flex-shrink-0" />
                  <span>hello@leafyworld.com</span>
                </li>
              </ul>
            </div>

            {/* Quick Links */}
            <div className="grid grid-cols-2 gap-8">
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-[#90CE48]">Explore</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="hover:text-[#D4CF1D] transition-colors">About Us</a></li>
                  <li><a href="#" className="hover:text-[#D4CF1D] transition-colors">Gardening Tips</a></li>
                  <li><a href="#" className="hover:text-[#D4CF1D] transition-colors">Plant Care</a></li>
                  <li><a href="#" className="hover:text-[#D4CF1D] transition-colors">Community</a></li>
                </ul>
              </div>
              <div className="space-y-4">
                <h4 className="text-lg font-semibold text-[#90CE48]">Legal</h4>
                <ul className="space-y-3">
                  <li><a href="#" className="hover:text-[#D4CF1D] transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-[#D4CF1D] transition-colors">Terms of Service</a></li>
                  <li><a href="#" className="hover:text-[#D4CF1D] transition-colors">Cookie Policy</a></li>
                  <li><a href="#" className="hover:text-[#D4CF1D] transition-colors">Contact</a></li>
                </ul>
              </div>
            </div>
          </div>

          {/* Social Links & Copyright */}
          <div className="border-t border-[#90CE48]/20 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="flex space-x-6">
              <a href="#" aria-label="Facebook" className="text-[#F5F0E6] hover:text-[#90CE48] transition-colors">
                <FaFacebook size={20} />
              </a>
              <a href="#" aria-label="Instagram" className="text-[#F5F0E6] hover:text-[#90CE48] transition-colors">
                <FaInstagram size={20} />
              </a>
              <a href="#" aria-label="Twitter" className="text-[#F5F0E6] hover:text-[#90CE48] transition-colors">
                <FaTwitter size={20} />
              </a>
              <a href="#" aria-label="YouTube" className="text-[#F5F0E6] hover:text-[#90CE48] transition-colors">
                <FaYoutube size={20} />
              </a>
            </div>

            <p className="text-sm text-[#F5F0E6]/80 text-center md:text-right">
              &copy; {new Date().getFullYear()} LeafyWorld. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;