import React, { useEffect, useState } from 'react';
import { FaLeaf, FaSeedling, FaUser, FaMapMarkerAlt, FaFilter, FaSearch, FaStar } from 'react-icons/fa';

const ExploreGardeners = () => {
  const [gardeners, setGardeners] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [activeFilter, setActiveFilter] = useState('all');
  const [fetchAttempted, setFetchAttempted] = useState(false);

  useEffect(() => {
    const fetchGardeners = async () => {
      setFetchAttempted(true);
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/gardeners`);
        if (!response.ok) {
          throw new Error('Failed to fetch gardeners');
        }
        const data = await response.json();
        setGardeners(data);
        setError(null); 
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    // Only show loading state for the first fetch attempt
    if (!fetchAttempted) {
      const timer = setTimeout(() => {
        fetchGardeners();
      }, 300); // Small delay to prevent flash of loading state for quick fetches

      return () => clearTimeout(timer);
    }
  }, [fetchAttempted]);

  const filteredGardeners = gardeners.filter(gardener => {
    const matchesSearch = gardener.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         gardener.specialty.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesFilter = activeFilter === 'all' || 
                         (activeFilter === 'active' && gardener.status.toLowerCase() === 'active') || 
                         (activeFilter === 'inactive' && gardener.status.toLowerCase() === 'inactive');
    return matchesSearch && matchesFilter;
  });

  if (loading && !error) {
    return (
      <div className="flex justify-center items-center h-64 bg-[#082026]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#90CE48]"></div>
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
    <section className="py-16 px-4 sm:px-6 lg:px-8 bg-[#082026] min-h-screen">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#90CE48]/20 text-[#90CE48] mb-4">
            <FaSeedling className="mr-2" /> Gardening Community
          </span>
          <h1 className="text-4xl font-bold text-[#F5F0E6] mb-4">
            Explore <span className="text-[#D4CF1D]">Gardeners</span>
          </h1>
          <p className="text-lg text-[#E6F2EF] max-w-2xl mx-auto">
            Connect with gardening enthusiasts from around the world
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-12 bg-[#0a2a32] p-4 rounded-xl border border-[#1a3a42]">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-[#90CE48]" />
              </div>
              <input
                type="text"
                placeholder="Search by name or specialty..."
                className="pl-10 w-full bg-[#082026] border border-[#1a3a42] rounded-lg py-3 px-4 text-[#F5F0E6] focus:outline-none focus:ring-2 focus:ring-[#90CE48]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-[#E6F2EF]">
                <FaFilter className="mr-2 text-[#90CE48]" />
                <span className="mr-2">Filter:</span>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setActiveFilter('all')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${activeFilter === 'all' ? 'bg-[#90CE48] text-[#082026]' : 'bg-[#082026] text-[#E6F2EF] border border-[#1a3a42]'}`}
                >
                  All
                </button>
                <button
                  onClick={() => setActiveFilter('active')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${activeFilter === 'active' ? 'bg-[#90CE48] text-[#082026]' : 'bg-[#082026] text-[#E6F2EF] border border-[#1a3a42]'}`}
                >
                  Active
                </button>
                <button
                  onClick={() => setActiveFilter('inactive')}
                  className={`px-4 py-2 rounded-lg text-sm font-medium ${activeFilter === 'inactive' ? 'bg-[#90CE48] text-[#082026]' : 'bg-[#082026] text-[#E6F2EF] border border-[#1a3a42]'}`}
                >
                  Inactive
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Gardeners Grid */}
        {filteredGardeners.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredGardeners.map((gardener) => (
              <div
                key={gardener.id}
                className="group relative bg-[#0a2a32] rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl hover:shadow-[#90CE48]/10 hover:-translate-y-1 border border-[#1a3a42]"
              >
                <div className="relative h-56 overflow-hidden">
                  <img
                    src={gardener.image}
                    alt={gardener.name}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80';
                    }}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#082026] via-transparent to-transparent opacity-90"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <h3 className="text-xl font-bold text-[#F5F0E6]">{gardener.name}</h3>
                    <div className="flex items-center mt-1">
                      {[...Array(5)].map((_, i) => (
                        <FaStar
                          key={i}
                          className={`text-xs ${i < Math.floor(gardener.experience / 3) ? 'text-[#D4CF1D]' : 'text-gray-500'}`}
                        />
                      ))}
                    </div>
                  </div>
                </div>

                <div className="p-5">
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#90CE48]/10 text-[#90CE48]">
                      {gardener.specialty}
                    </span>
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-[#D4CF1D]/10 text-[#D4CF1D]">
                      {gardener.experience} yrs
                    </span>
                  </div>

                  <div className="flex items-center text-[#E6F2EF] text-sm mb-3">
                    <FaMapMarkerAlt className="text-[#90CE48] mr-2" />
                    <span>{gardener.location}</span>
                  </div>

                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center text-[#E6F2EF]">
                      <FaUser className="text-[#D4CF1D] mr-2" />
                      <span>{gardener.age} • {gardener.gender}</span>
                    </div>
                    <div className={`flex items-center px-2 py-1 rounded-full text-xs font-medium ${gardener.status === 'Active' ? 'bg-[#90CE48]/20 text-[#90CE48]' : 'bg-gray-500/20 text-gray-400'}`}>
                      {gardener.status}
                    </div>
                  </div>
                </div>

                <div className="absolute top-3 right-3 flex items-center bg-[#082026]/90 px-2 py-1 rounded-full">
                  <FaLeaf className="text-[#90CE48] mr-1 text-xs" />
                  <span className="text-xs font-medium text-[#F5F0E6]">{gardener.total_shared_tips} tips</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-[#0a2a32] rounded-xl border border-[#1a3a42]">
            <h3 className="text-xl font-medium text-[#F5F0E6] mb-2">No gardeners found</h3>
            <p className="text-[#E6F2EF]">Try adjusting your search or filter criteria</p>
          </div>
        )}
      </div>
    </section>
  );
};

export default ExploreGardeners;