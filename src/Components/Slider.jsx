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
  const events = [
    {
      id: 1,
      title: "Spring Gardening Workshop",
      date: "May 15, 2025",
      time: "10:00 AM - 2:00 PM",
      location: "Central Park Garden",
      description: "Learn seasonal planting techniques from our expert gardeners and get hands-on experience.",
      image: img1,
      buttonText: "Register Now",
      buttonLink: "/events/spring-workshop"
    },
    {
      id: 2,
      title: "Annual Plant Swap",
      date: "June 3, 2025",
      time: "9:00 AM - 12:00 PM",
      location: "Community Center",
      description: "Bring your extra plants and cuttings to trade with fellow gardening enthusiasts.",
      image: img2,
      buttonText: "Learn More",
      buttonLink: "/events/plant-swap"
    },
    {
      id: 3,
      title: "Urban Gardening Seminar",
      date: "June 18, 2025",
      time: "1:00 PM - 4:00 PM",
      location: "Downtown Library",
      description: "Discover how to maximize small spaces for beautiful and productive gardens.",
      image: img3,
      buttonText: "Save Your Spot",
      buttonLink: "/events/urban-gardening"
    },
    {
      id: 4,
      title: "Kids Gardening Day",
      date: "July 8, 2025",
      time: "11:00 AM - 3:00 PM",
      location: "Botanical Gardens",
      description: "Fun activities to introduce children to the joys of gardening and nature.",
      image: img4,
      buttonText: "View Details",
      buttonLink: "/events/kids-day"
    },
    {
      id: 5,
      title: "Organic Pest Control Workshop",
      date: "July 22, 2025",
      time: "10:30 AM - 12:30 PM",
      location: "Green Thumb Nursery",
      description: "Learn natural methods to protect your plants without harmful chemicals.",
      image: img5,
      buttonText: "Join Workshop",
      buttonLink: "/events/pest-control"
    }
  ];

  return (
    <div className="relative w-full bg-[#082026] py-8 lg:py-12">
      {/* Header Text */}
      <div className="mx-auto max-w-screen-xl px-4 sm:px-6 lg:px-8 mb-8 text-center">
        <h2 className="text-3xl font-bold text-[#F5F0E6] sm:text-4xl">
          Upcoming Gardening Events
        </h2>
        <p className="mt-4 text-lg text-[#F5F0E6]/80 max-w-3xl mx-auto">
          Join our community events to learn, share, and grow together
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
          {events.map((event) => (
            <SwiperSlide key={event.id}>
              <div className="relative w-full h-[50vh] sm:h-[60vh] lg:h-[70vh]">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#082026]/90 to-[#082026]/30 flex items-end pb-8 sm:pb-12 lg:pb-16 px-4 sm:px-8">
                  <div className="text-left animate-fadeIn max-w-2xl">
                    <div className="mb-4">
                      <span className="inline-block bg-[#90CE48] text-[#082026] text-sm font-semibold px-3 py-1 rounded-full mb-2">
                        Upcoming Event
                      </span>
                      <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-2">
                        {event.title}
                      </h3>
                      <div className="flex flex-wrap gap-4 text-white/90 mb-3">
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                          </svg>
                          {event.date}
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          {event.time}
                        </div>
                        <div className="flex items-center">
                          <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {event.location}
                        </div>
                      </div>
                      <p className="text-sm sm:text-base text-white/90 mb-4">
                        {event.description}
                      </p>
                    </div>
                    <a
                      href={event.buttonLink}
                      className="inline-flex items-center px-6 py-3 bg-[#90CE48] text-[#082026] font-medium rounded-md hover:bg-[#7CB53B] transition-colors"
                    >
                      {event.buttonText}
                      <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                      </svg>
                    </a>
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