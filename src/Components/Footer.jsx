import React from 'react';
import { FaFacebook, FaInstagram, FaTwitter, FaYoutube, FaEnvelope, FaPhoneAlt, FaMapMarkerAlt } from 'react-icons/fa';
import logo from "../assets/logo.png";
const Footer = () => {
  return (
    <>
      {/* Footer Content */}
      <footer className="bg-[#082026] text-[#F5F0E6] pt-12 pb-8">
        <div className="w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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