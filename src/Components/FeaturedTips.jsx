import React, { useEffect, useState } from 'react';
import { FaSeedling, FaLightbulb, FaLeaf, FaSpinner } from 'react-icons/fa';

const FeaturedTips = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [fetchAttempted, setFetchAttempted] = useState(false);

  useEffect(() => {
    const fetchTips = async () => {
      setFetchAttempted(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/gardeners/tips`);
        if (!response.ok) throw new Error('Failed to fetch tips');
        const data = await response.json();
        setTips(data);
        setError(null);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    if (!fetchAttempted) {
      const timer = setTimeout(() => {
        fetchTips();
      }, 300);

      return () => clearTimeout(timer);
    }
  }, [fetchAttempted]);

  if (loading && !error) {
    return (
      <div className="flex justify-center items-center h-64 bg-[#082026]">
        <FaSpinner className="animate-spin text-4xl text-[#90CE48]" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 bg-[#082026]">
        <p className="text-red-400">Error: {error}</p>
        <button 
          onClick={() => {
            setLoading(true);
            setFetchAttempted(false);
          }}
          className="mt-4 px-4 py-2 bg-[#90CE48] text-[#082026] rounded-lg hover:bg-[#90CE48]/80 transition"
        >
          Retry
        </button>
      </div>
    );
  }
  return (
    <section className="bg-[#082026] py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#F5F0E6] mb-4">
          <FaLightbulb className="inline text-[#90CE48] mr-2" />
          Gardening Wisdom from the Community
          <FaLeaf className="inline text-[#90CE48] ml-2" />
        </h2>
        <p className="text-center text-gray-400 max-w-2xl mx-auto mb-12">
          Explore top-rated gardening tips shared by our expert community members—whether you're into indoor succulents or large-scale composting, there's a tip here for every green thumb.
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {tips.map((tip) => (
            <div
              key={tip._id}
              className="bg-[#0D2C33] rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
            >
              <div className="relative h-48">
                <img
                  src={tip.imageUrl}
                  alt={tip.title}
                  className="w-full h-full object-cover"
                  onError={(e) =>
                    (e.target.src = 'https://via.placeholder.com/300x200?text=Garden+Tip')
                  }
                />
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-xl font-bold text-white">{tip.title}</h3>
                </div>
              </div>

              <div className="p-6 text-[#E6F2EF]">
                <div className="flex flex-wrap gap-2 text-sm mb-3">
                  <span className="bg-[#90CE48]/20 text-[#90CE48] px-3 py-1 rounded-full">
                    {tip.category}
                  </span>
                  <span className="bg-[#90CE48]/10 text-[#90CE48] px-3 py-1 rounded-full">
                    {tip.difficulty}
                  </span>
                  <span className="bg-[#D4CF1D]/10 text-[#D4CF1D] px-3 py-1 rounded-full">
                    {tip.plantType}
                  </span>
                </div>

                <p className="text-sm text-gray-300 line-clamp-3 mb-4">
                  {tip.description}
                </p>

                <div className="flex justify-between items-center text-sm">
                  <p className="text-gray-400">Shared by</p>
                  <p className="text-[#D4CF1D] font-semibold">
                    {tip.userName || 'Unknown'}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedTips;
