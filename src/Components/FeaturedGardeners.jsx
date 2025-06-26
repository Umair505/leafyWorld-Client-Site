import React, { useEffect, useState } from 'react';
import { FaLeaf, FaSeedling, FaUser } from 'react-icons/fa';

const FeaturedGardeners = () => {
  const [gardeners, setGardeners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFeaturedGardeners = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/gardeners/featured`);
        if (!response.ok) throw new Error('Failed to fetch gardeners');
        const data = await response.json();
        setGardeners(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchFeaturedGardeners();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#90CE48]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 text-red-400">
        <p>Error: {error}</p>
      </div>
    );
  }

  return (
    <section className="bg-[#082026] py-16 px-4 sm:px-6 lg:px-12">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl sm:text-4xl font-bold text-center text-[#F5F0E6] mb-12">
          <FaSeedling className="inline text-[#90CE48] mr-2" />
          Featured Gardeners
          <FaLeaf className="inline text-[#90CE48] ml-2" />
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {gardeners.map((gardener) => (
            <div
              key={gardener.id}
              className="bg-[#0D2C33] rounded-2xl overflow-hidden shadow-lg transition-transform duration-300 hover:scale-105"
            >
              <div className="relative h-48">
                <img
                  src={gardener.image}
                  alt={gardener.name}
                  className="w-full h-full object-cover"
                  onError={(e) =>
                    (e.target.src = 'https://via.placeholder.com/300x200?text=Gardener+Image')
                  }
                />
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-4">
                  <h3 className="text-xl font-bold text-white">{gardener.name}</h3>
                </div>
              </div>

              <div className="p-6 text-[#E6F2EF]">
                <div className="flex items-center mb-2 text-sm">
                  <FaUser className="text-[#90CE48] mr-2" />
                  <span>{gardener.age} years • {gardener.gender}</span>
                </div>

                <div className="mb-4">
                  <span className="inline-block bg-[#90CE48]/20 text-[#90CE48] text-xs font-medium px-3 py-1 rounded-full mb-1">
                    {gardener.specialty}
                  </span>
                  <p className="text-sm text-gray-300">{gardener.location}</p>
                </div>

                <div className="flex justify-between items-center mt-4 text-sm">
                  <div>
                    <p className="text-gray-400">Experience</p>
                    <p className="font-semibold text-[#D4CF1D]">
                      {gardener.experience} {gardener.experience === 1 ? 'year' : 'years'}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="text-gray-400">Tips Shared</p>
                    <p className="font-semibold text-[#D4CF1D]">
                      {gardener.total_shared_tips}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default FeaturedGardeners;
