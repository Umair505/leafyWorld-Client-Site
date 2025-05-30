import React from "react";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';
import img1 from '../assets/Slider/1.png';
import img2 from '../assets/Slider/2.jpeg';
import img3 from '../assets/Slider/3.jpeg';
import img4 from '../assets/Slider/4.jpeg';
import img5 from '../assets/Slider/5.jpeg';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const Slider = () => {
  return (
    <div className="relative w-full bg-[#082026] py-8 lg:py-12">
      {/* Header Text */}
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <h2 className="text-3xl font-bold text-[#F5F0E6] sm:text-4xl">
          Discover Our Gardening Community
        </h2>
        <p className="mt-4 text-lg text-[#F5F0E6]/80 max-w-3xl mx-auto">
          Explore beautiful gardens, get expert tips, and connect with fellow plant lovers
        </p>
      </div>

      {/* Slider Container */}
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8">
        <Swiper
          spaceBetween={20}
          centeredSlides={true}
          autoplay={{
            delay: 5000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          effect={'fade'}
          loop={true}
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          className="rounded-lg shadow-xl"
        >
          {[img1, img2, img3, img4, img5].map((img, index) => (
            <SwiperSlide key={index}>
              <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh]">
                <img
                  src={img}
                  alt={`Slide ${index + 1}`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#082026]/90 to-[#082026]/30 flex items-end pb-8 sm:pb-12 lg:pb-16 px-4 sm:px-8">
                  <div className="text-left animate-fadeIn">
                    <h3 className="text-xl sm:text-2xl lg:text-3xl font-bold text-white mb-2">
                      {[
                        "Welcome to Our Garden",
                        "Premium Quality Plants",
                        "Expert Gardening Tips",
                        "Community Events",
                        "Shop Now"
                      ][index]}
                    </h3>
                    <p className="text-sm sm:text-base text-white/90 max-w-lg">
                      {[
                        "Discover the beauty of nature with our premium gardening solutions",
                        "Grow your collection with our carefully selected varieties",
                        "Learn from our professional gardeners and enthusiasts",
                        "Join our workshops and meet fellow gardening lovers",
                        "Everything you need for your gardening journey"
                      ][index]}
                    </p>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      {/* Custom Styles */}
      <style jsx global>{`
        .swiper {
          --swiper-navigation-size: 24px;
          --swiper-pagination-bullet-size: 10px;
          --swiper-pagination-bullet-horizontal-gap: 6px;
        }
        .swiper-pagination-bullet {
          background: white;
          opacity: 0.6;
        }
        .swiper-pagination-bullet-active {
          background: #90CE48;
          opacity: 1;
        }
        .swiper-button-next, 
        .swiper-button-prev {
          color: #90CE48;
          background: rgba(255,255,255,0.3);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        .swiper-button-next:hover, 
        .swiper-button-prev:hover {
          background: rgba(255,255,255,0.5);
        }
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fadeIn {
          animation: fadeIn 1s ease-out forwards;
        }
      `}</style>
    </div>
  );
};

export default Slider;