import React, { useState, useEffect } from 'react';
import { FaLeaf, FaEye, FaSearch, FaFilter, FaSeedling } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';

const BrowseTips = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [selectedDifficulty, setSelectedDifficulty] = useState('All');
  const navigate = useNavigate();

  const categories = [
    'All',
    'Plant Care',
    'Composting',
    'Vertical Gardening',
    'Indoor Gardening',
    'Organic Pest Control',
    'Hydroponics',
    'Seasonal Planting',
    'Soil Health'
  ];

  const difficultyLevels = [
    'All',
    'Easy',
    'Medium',
    'Hard'
  ];

  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/garden-tips?status=Public`);
        if (!response.ok) {
          throw new Error('Failed to fetch tips');
        }
        const data = await response.json();
        setTips(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTips();
  }, []);

  const filteredTips = tips.filter(tip => {
    const matchesSearch = tip.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         tip.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || tip.category === selectedCategory;
    const matchesDifficulty = selectedDifficulty === 'All' || tip.difficulty === selectedDifficulty;
    return matchesSearch && matchesCategory && matchesDifficulty;
  });

  // Sort tips by difficulty level if a specific difficulty is selected
  const sortedTips = selectedDifficulty === 'All' 
    ? filteredTips 
    : [...filteredTips].sort((a, b) => {
        if (a.difficulty === selectedDifficulty) return -1;
        if (b.difficulty === selectedDifficulty) return 1;
        return 0;
      });

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-[#082026]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#90CE48]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-10 bg-[#082026]">
        <p className="text-red-400">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#082026] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header Section */}
        <div className="text-center mb-12">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-[#90CE48]/20 text-[#90CE48] mb-4">
            <FaSeedling className="mr-2" /> Gardening Community
          </span>
          <h1 className="text-4xl font-bold text-[#F5F0E6] mb-3">
            Browse <span className="text-[#D4CF1D]">Garden Tips</span>
          </h1>
          <p className="text-lg text-[#E6F2EF] max-w-2xl mx-auto">
            Discover wisdom from our community of passionate gardeners
          </p>
        </div>

        {/* Search and Filter Bar */}
        <div className="mb-8 bg-[#0a2a32] p-4 rounded-xl border border-[#1a3a42]">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="relative flex-grow">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <FaSearch className="text-[#90CE48]" />
              </div>
              <input
                type="text"
                placeholder="Search tips..."
                className="pl-10 w-full bg-[#082026] border border-[#1a3a42] rounded-lg py-3 px-4 text-[#F5F0E6] focus:outline-none focus:ring-2 focus:ring-[#90CE48]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-[#E6F2EF]">
                  <FaFilter className="mr-2 text-[#90CE48]" />
                  <span className="mr-2">Category:</span>
                </div>
                <select
                  value={selectedCategory}
                  onChange={(e) => setSelectedCategory(e.target.value)}
                  className="bg-[#082026] border border-[#1a3a42] rounded-lg py-3 px-4 text-[#F5F0E6] focus:outline-none focus:ring-2 focus:ring-[#90CE48]"
                >
                  {categories.map(category => (
                    <option key={category} value={category}>{category}</option>
                  ))}
                </select>
              </div>
              <div className="flex items-center space-x-4">
                <div className="flex items-center text-[#E6F2EF]">
                  <FaFilter className="mr-2 text-[#90CE48]" />
                  <span className="mr-2">Difficulty:</span>
                </div>
                <select
                  value={selectedDifficulty}
                  onChange={(e) => setSelectedDifficulty(e.target.value)}
                  className="bg-[#082026] border border-[#1a3a42] rounded-lg py-3 px-4 text-[#F5F0E6] focus:outline-none focus:ring-2 focus:ring-[#90CE48]"
                >
                  {difficultyLevels.map(level => (
                    <option key={level} value={level}>{level}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>
        </div>

        {/* Tips Table */}
<div className="bg-[#0a2a32] rounded-xl overflow-hidden border border-[#1a3a42] shadow-lg">
  {sortedTips.length > 0 ? (
    <div className="overflow-x-auto">
      <table className="min-w-full divide-y divide-[#1a3a42]">
        <thead className="bg-[#082026]">
          <tr>
            <th scope="col" className="px-3 py-3 sm:px-4 sm:py-4 text-left text-xs font-medium text-[#90CE48] uppercase tracking-wider">
              Tip
            </th>
            <th scope="col" className="px-2 py-3 sm:px-4 sm:py-4 text-left text-xs font-medium text-[#90CE48] uppercase tracking-wider hidden sm:table-cell">
              Category
            </th>
            <th scope="col" className="px-2 py-3 sm:px-4 sm:py-4 text-left text-xs font-medium text-[#90CE48] uppercase tracking-wider hidden md:table-cell">
              Difficulty
            </th>
            <th scope="col" className="px-2 py-3 sm:px-4 sm:py-4 text-left text-xs font-medium text-[#90CE48] uppercase tracking-wider hidden lg:table-cell">
              Preview
            </th>
            <th scope="col" className="px-2 py-3 sm:px-4 sm:py-4 text-left text-xs font-medium text-[#90CE48] uppercase tracking-wider">
              Actions
            </th>
          </tr>
        </thead>
        <tbody className="bg-[#0a2a32] divide-y divide-[#1a3a42]">
          {sortedTips.map((tip) => (
            <tr key={tip._id} className="hover:bg-[#082026]/50 transition-colors duration-150">
              {/* Tip Column */}
              <td className="px-3 py-3 sm:px-4 sm:py-4 whitespace-nowrap">
                <div className="flex items-center">
                  <div className="flex-shrink-0 h-8 w-8 sm:h-10 sm:w-10 flex items-center justify-center bg-[#90CE48]/10 rounded-lg text-[#90CE48]">
                    <FaLeaf className="text-sm sm:text-base" />
                  </div>
                  <div className="ml-2 sm:ml-4">
                    <div className="text-xs sm:text-sm font-medium text-[#F5F0E6] line-clamp-1">{tip.title}</div>
                    <div className="text-[10px] sm:text-xs text-[#E6F2EF]/70">{tip.plantType}</div>
                  </div>
                </div>
              </td>

              {/* Category Column (hidden on mobile) */}
              <td className="px-2 py-3 sm:px-4 sm:py-4 whitespace-nowrap hidden sm:table-cell">
                <span className="px-2 py-1 text-xs rounded-full font-medium bg-[#90CE48]/10 text-[#90CE48]">
                  {tip.category}
                </span>
              </td>

              {/* Difficulty Column (hidden on mobile and tablet) */}
              <td className="px-2 py-3 sm:px-4 sm:py-4 whitespace-nowrap hidden md:table-cell">
                <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                  tip.difficulty === 'Easy' ? 'bg-green-500/10 text-green-500' :
                  tip.difficulty === 'Medium' ? 'bg-yellow-500/10 text-yellow-500' :
                  'bg-red-500/10 text-red-500'
                }`}>
                  {tip.difficulty}
                </span>
              </td>

              {/* Preview Column (hidden on mobile, tablet, and small desktop) */}
              <td className="px-2 py-3 sm:px-4 sm:py-4 whitespace-nowrap hidden lg:table-cell">
                <div className="h-10 w-10 sm:h-12 sm:w-12 rounded-md overflow-hidden border border-[#1a3a42]">
                  <img 
                    src={tip.imageUrl} 
                    alt={tip.title} 
                    className="h-full w-full object-cover"
                    onError={(e) => {
                      e.target.src = 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=100&q=80';
                    }}
                  />
                </div>
              </td>

              {/* Actions Column */}
              <td className="px-2 py-3 sm:px-4 sm:py-4 whitespace-nowrap text-right text-xs sm:text-sm font-medium">
                <button
                  onClick={() => navigate(`/tips/${tip._id}`)}
                  className="text-[#90CE48] hover:text-[#D4CF1D] flex items-center justify-end w-full"
                  title="View Tip"
                >
                  <FaEye className="sm:mr-1" />
                  <span className="hidden sm:inline">View</span>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  ) : (
    <div className="text-center py-10 sm:py-12 md:py-16">
      <div className="mx-auto h-16 w-16 sm:h-20 sm:w-20 md:h-24 md:w-24 flex items-center justify-center bg-[#90CE48]/10 rounded-full text-[#90CE48] mb-3 sm:mb-4">
        <FaSeedling className="text-xl sm:text-2xl md:text-3xl" />
      </div>
      <h3 className="text-sm sm:text-base md:text-lg font-medium text-[#F5F0E6]">No tips found</h3>
      <p className="mt-1 text-xs sm:text-sm md:text-base text-[#E6F2EF]">Try adjusting your search or filter criteria</p>
    </div>
  )}
</div>

        {/* Stats Footer */}
        <div className="mt-8 text-center text-[#E6F2EF] text-sm">
          <p>Showing <span className="text-[#90CE48]">{sortedTips.length}</span> of <span className="text-[#90CE48]">{tips.length}</span> public gardening tips</p>
        </div>
      </div>
    </div>
  );
};

export default BrowseTips;