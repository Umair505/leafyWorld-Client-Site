import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaLeaf, FaHeart, FaRegHeart, FaArrowLeft, FaShareAlt, FaUser } from 'react-icons/fa';
import { AuthContext } from '../provider/AuthProvider';

const TipDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const [tip, setTip] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  useEffect(() => {
    const fetchTip = async () => {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tip/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch tip');
        }
        const data = await response.json();
        console.log(data)
        setTip(data);
        setLikeCount(data.likes || 0);
        
        // In a real app, you would check if current user has liked
        setIsLiked(false);
        
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTip();
  }, [id]);

  const handleLike = async () => {
    if (!user) {
      // In a real app, you might redirect to login
      return;
    }
    
    try {
      // In a real app, you would make an API call to update likes
      setIsLiked(!isLiked);
      setLikeCount(isLiked ? likeCount - 1 : likeCount + 1);
    } catch (err) {
      console.error('Error updating like:', err);
    }
  };

  const handleShare = () => {
    // In a real app, implement share functionality
    navigator.clipboard.writeText(window.location.href);
    alert('Link copied to clipboard!');
  };

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
        <button 
          onClick={() => navigate(-1)}
          className="mt-4 bg-[#90CE48] hover:bg-[#7CB53B] text-[#082026] font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          Go Back
        </button>
      </div>
    );
  }

  if (!tip) {
    return (
      <div className="text-center py-10 bg-[#082026]">
        <p className="text-[#F5F0E6]">Tip not found</p>
        <button 
          onClick={() => navigate(-1)}
          className="mt-4 bg-[#90CE48] hover:bg-[#7CB53B] text-[#082026] font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          Go Back
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#082026] py-16 px-6 sm:px-8 lg:px-10">
      <div className="max-w-5xl mx-auto">
        {/* Back Button */}
        <button 
          onClick={() => navigate(-1)}
          className="flex items-center text-[#90CE48] hover:text-[#D4CF1D] mb-8 transition duration-200 text-lg"
        >
          <FaArrowLeft className="mr-2" /> Back to Tips
        </button>

        {/* Main Content */}
        <div className="bg-[#0a2a32] rounded-xl overflow-hidden shadow-lg border border-[#1a3a42]">
          {/* Tip Image */}
          <div className="relative h-72 sm:h-96 lg:h-[28rem] overflow-hidden">
            <img
              src={tip.imageUrl}
              alt={tip.title}
              className="w-full h-full object-cover"
              onError={(e) => {
                e.target.src = 'https://images.unsplash.com/photo-1605000797499-95a51c5269ae?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80';
              }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#082026] to-transparent opacity-80"></div>
            <div className="absolute bottom-0 left-0 right-0 p-8">
              <div className="flex flex-wrap gap-2 mb-3">
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#90CE48]/20 text-[#90CE48]">
                  {tip.category}
                </span>
                <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-[#D4CF1D]/20 text-[#D4CF1D]">
                  {tip.difficulty}
                </span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-[#F5F0E6]">{tip.title}</h1>
            </div>
          </div>

          {/* Tip Body */}
          <div className="p-8 sm:p-10">
            {/* Author and Actions */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 pb-6 border-b border-[#1a3a42]">
              <div className="flex items-center mb-4 sm:mb-0">
                <div className="h-12 w-12 rounded-full bg-[#90CE48]/10 flex items-center justify-center text-[#90CE48] mr-4">
                  <FaUser size={18} />
                </div>
                <div>
                  <p className="text-base font-medium text-[#F5F0E6]">{tip.userName}</p>
                </div>
              </div>
              
              <div className="flex space-x-4">
                <button 
                  onClick={handleLike}
                  className="flex items-center text-base px-4 py-2 rounded-lg bg-[#082026] text-[#F5F0E6] hover:bg-[#90CE48]/10 transition duration-200"
                >
                  {isLiked ? (
                    <FaHeart className="text-red-500 mr-2" size={18} />
                  ) : (
                    <FaRegHeart className="text-[#F5F0E6] mr-2" size={18} />
                  )}
                  <span>{likeCount}</span>
                </button>
                
                <button 
                  onClick={handleShare}
                  className="p-3 rounded-lg bg-[#082026] text-[#F5F0E6] hover:bg-[#90CE48]/10 transition duration-200"
                >
                  <FaShareAlt size={18} />
                </button>
              </div>
            </div>

            {/* Plant Type */}
            <div className="mb-8">
              <h3 className="text-base font-medium text-[#90CE48] mb-3">ABOUT THIS TIP</h3>
              <p className="text-[#F5F0E6] text-lg">
                <span className="font-medium">Plant Type:</span> {tip.plantType}
              </p>
            </div>

            {/* Description */}
            <div className="mb-10">
              <h3 className="text-base font-medium text-[#90CE48] mb-3">DESCRIPTION</h3>
              <div className="prose text-[#E6F2EF] text-lg">
                {tip.description.split('\n').map((paragraph, i) => (
                  <p key={i} className="mb-5">{paragraph}</p>
                ))}
              </div>
            </div>

            {/* Tips Section */}
            <div className="bg-[#082026]/50 rounded-lg p-6 mb-10 border border-[#1a3a42]">
              <h3 className="text-base font-medium text-[#D4CF1D] mb-3 flex items-center">
                <FaLeaf className="mr-2" size={18} /> GARDENER'S TIPS
              </h3>
              <ul className="list-disc list-inside text-[#E6F2EF] space-y-3 text-lg">
                {tip.keyTips?.map((tipPoint, i) => (
                  <li key={i}>{tipPoint}</li>
                )) || <li>No specific tips provided</li>}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TipDetails;