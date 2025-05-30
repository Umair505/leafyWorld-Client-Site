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
    <div className="relative w-full h-full py-12">
      <Swiper
        spaceBetween={30}
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
        className="mySwiper"
      >
        <SwiperSlide>
          <div className="relative w-full h-[70vh]">
            <img
              src={img1}
              alt="Welcome to Our Garden" // More descriptive alt text
              className="w-full h-full object-cover"
            />
            
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative w-full h-[70vh]">
            <img
              src={img2}
              alt="Premium Quality Plants"
              className="w-full h-full object-cover"
            />
            
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative w-full h-[70vh]">
            <img
              src={img3}
              alt="Expert Gardening Tips"
              className="w-full h-full object-cover"
            />
           
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative w-full h-[70vh]">
            <img
              src={img4}
              alt="Community Events"
              className="w-full h-full object-cover"
            />
          </div>
        </SwiperSlide>

        <SwiperSlide>
          <div className="relative w-full h-[70vh]">
            <img
              src={img5}
              alt="Shop Now"
              className="w-full h-full object-cover"
            />
            
          </div>
        </SwiperSlide>
      </Swiper>

      {/* Add this to your global CSS file */}
      <style jsx>{`
        .swiper-pagination-bullet {
          background: white;
          opacity: 0.6;
          width: 12px;
          height: 12px;
        }
        .swiper-pagination-bullet-active {
          background: #90CE48;
          opacity: 1;
        }
        .swiper-button-next, .swiper-button-prev {
          color: #90CE48;
          background: rgba(255,255,255,0.3);
          width: 40px;
          height: 40px;
          border-radius: 50%;
          transition: all 0.3s ease;
        }
        .swiper-button-next:hover, .swiper-button-prev:hover {
          background: rgba(255,255,255,0.5);
        }
        .swiper-button-next:after, .swiper-button-prev:after {
          font-size: 20px;
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