import React, { useState, useEffect, useContext } from 'react';
import { FaLeaf, FaSeedling, FaUpload, FaCheckCircle } from 'react-icons/fa';
import { AuthContext } from '../provider/AuthProvider';

const ShareGardenTips = () => {
    const {user} = useContext(AuthContext);
    const [formData, setFormData] = useState({
    title: '',
    plantType: '',
    difficulty: 'Easy',
    description: '',
    imageUrl: '',
    category: 'Plant Care',
    availability: 'Public',
    userEmail: user?.email || '',
    userName: user?.displayName || ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errors, setErrors] = useState({});
  console.log(user?.email)
  const categories = [
    'Plant Care',
    'Composting',
    'Vertical Gardening',
    'Indoor Gardening',
    'Organic Pest Control',
    'Hydroponics',
    'Seasonal Planting',
    'Soil Health'
  ];

  useEffect(() => {
    if (user) {
      setFormData(prev => ({
        ...prev,
        userEmail: user.email,
        userName: user.displayName || user.email.split('@')[0]
      }));
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error when field is edited
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.title.trim()) newErrors.title = 'Title is required';
    if (!formData.plantType.trim()) newErrors.plantType = 'Plant type is required';
    if (!formData.description.trim()) newErrors.description = 'Description is required';
    if (!formData.imageUrl.trim()) newErrors.imageUrl = 'Image URL is required';
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    try {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/garden-tips`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit tip');
      }

      setSuccess(true);
      // Reset form
      setFormData({
        title: '',
        plantType: '',
        difficulty: 'Easy',
        description: '',
        imageUrl: '',
        category: 'Plant Care',
        availability: 'Public',
        userEmail: user?.email || '',
        userName: user?.displayName || ''
      });
      
      setTimeout(() => setSuccess(false), 5000);
    } catch (error) {
      console.error('Error submitting tip:', error);
      setErrors(prev => ({ ...prev, form: 'Failed to submit tip. Please try again.' }));
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#082026] flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-[#0a2a32] rounded-xl p-8 text-center border border-[#90CE48]/30 shadow-lg">
          <FaCheckCircle className="text-[#90CE48] text-5xl mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-[#F5F0E6] mb-2">Tip Shared Successfully!</h2>
          <p className="text-[#E6F2EF] mb-6">Thank you for contributing to our gardening community.</p>
          <button
            onClick={() => setSuccess(false)}
            className="w-full bg-[#90CE48] hover:bg-[#7CB53B] text-[#082026] font-medium py-2 px-4 rounded-lg transition duration-200"
          >
            Share Another Tip
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#082026] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-10">
          <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-[#90CE48]/20 text-[#90CE48] mb-4">
            <FaSeedling className="mr-2" /> Share Your Wisdom
          </span>
          <h1 className="text-3xl font-bold text-[#F5F0E6] mb-3">
            Share a <span className="text-[#D4CF1D]">Garden Tip</span>
          </h1>
          <p className="text-lg text-[#E6F2EF] max-w-2xl mx-auto">
            Help fellow gardeners by sharing your knowledge and experiences. Your tip could help someone grow something beautiful!
          </p>
        </div>

        <div className="bg-[#0a2a32] rounded-xl shadow-lg overflow-hidden border border-[#1a3a42]">
          <form onSubmit={handleSubmit} className="p-6 sm:p-8">
            {errors.form && (
              <div className="mb-6 p-4 bg-red-500/10 text-red-400 rounded-lg">
                {errors.form}
              </div>
            )}

            <div className="grid grid-cols-1 gap-6">
              {/* Title */}
              <div>
                <label htmlFor="title" className="block text-sm font-medium text-[#E6F2EF] mb-2">
                  Tip Title *
                </label>
                <input
                  type="text"
                  id="title"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  placeholder="e.g., How I Grow Tomatoes Indoors"
                  className={`w-full bg-[#082026] border ${errors.title ? 'border-red-400' : 'border-[#1a3a42]'} rounded-lg py-3 px-4 text-[#F5F0E6] focus:outline-none focus:ring-2 focus:ring-[#90CE48]`}
                />
                {errors.title && <p className="mt-1 text-sm text-red-400">{errors.title}</p>}
              </div>

              {/* Plant Type */}
              <div>
                <label htmlFor="plantType" className="block text-sm font-medium text-[#E6F2EF] mb-2">
                  Plant Type / Topic *
                </label>
                <input
                  type="text"
                  id="plantType"
                  name="plantType"
                  value={formData.plantType}
                  onChange={handleChange}
                  placeholder="e.g., Tomatoes, Roses, Composting"
                  className={`w-full bg-[#082026] border ${errors.plantType ? 'border-red-400' : 'border-[#1a3a42]'} rounded-lg py-3 px-4 text-[#F5F0E6] focus:outline-none focus:ring-2 focus:ring-[#90CE48]`}
                />
                {errors.plantType && <p className="mt-1 text-sm text-red-400">{errors.plantType}</p>}
              </div>

              {/* Difficulty and Category */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="difficulty" className="block text-sm font-medium text-[#E6F2EF] mb-2">
                    Difficulty Level
                  </label>
                  <select
                    id="difficulty"
                    name="difficulty"
                    value={formData.difficulty}
                    onChange={handleChange}
                    className="w-full bg-[#082026] border border-[#1a3a42] rounded-lg py-3 px-4 text-[#F5F0E6] focus:outline-none focus:ring-2 focus:ring-[#90CE48]"
                  >
                    <option value="Easy">Easy</option>
                    <option value="Medium">Medium</option>
                    <option value="Hard">Hard</option>
                  </select>
                </div>

                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-[#E6F2EF] mb-2">
                    Category
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full bg-[#082026] border border-[#1a3a42] rounded-lg py-3 px-4 text-[#F5F0E6] focus:outline-none focus:ring-2 focus:ring-[#90CE48]"
                  >
                    {categories.map(category => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* Description */}
              <div>
                <label htmlFor="description" className="block text-sm font-medium text-[#E6F2EF] mb-2">
                  Description *
                </label>
                <textarea
                  id="description"
                  name="description"
                  rows="5"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Share your detailed tips and experiences..."
                  className={`w-full bg-[#082026] border ${errors.description ? 'border-red-400' : 'border-[#1a3a42]'} rounded-lg py-3 px-4 text-[#F5F0E6] focus:outline-none focus:ring-2 focus:ring-[#90CE48]`}
                ></textarea>
                {errors.description && <p className="mt-1 text-sm text-red-400">{errors.description}</p>}
              </div>

              {/* Image URL */}
              <div>
                <label htmlFor="imageUrl" className="block text-sm font-medium text-[#E6F2EF] mb-2">
                  Image URL *
                </label>
                <div className="flex items-center">
                  <input
                    type="text"
                    id="imageUrl"
                    name="imageUrl"
                    value={formData.imageUrl}
                    onChange={handleChange}
                    placeholder="Paste your image URL here"
                    className={`flex-grow bg-[#082026] border ${errors.imageUrl ? 'border-red-400' : 'border-[#1a3a42]'} rounded-lg py-3 px-4 text-[#F5F0E6] focus:outline-none focus:ring-2 focus:ring-[#90CE48]`}
                  />
                  <span className="ml-3 text-[#90CE48]">
                    <FaUpload className="text-xl" />
                  </span>
                </div>
                {errors.imageUrl && <p className="mt-1 text-sm text-red-400">{errors.imageUrl}</p>}
                <p className="mt-2 text-xs text-[#E6F2EF]/70">
                  Tip: Upload your image to a service like ImgBB and paste the URL here
                </p>
              </div>

              {/* Availability */}
              <div>
                <label htmlFor="availability" className="block text-sm font-medium text-[#E6F2EF] mb-2">
                  Visibility
                </label>
                <select
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  className="w-full bg-[#082026] border border-[#1a3a42] rounded-lg py-3 px-4 text-[#F5F0E6] focus:outline-none focus:ring-2 focus:ring-[#90CE48]"
                >
                  <option value="Public">Public (Visible to everyone)</option>
                  <option value="Hidden">Hidden (Only visible to you)</option>
                </select>
              </div>

              {/* User Info (read-only) */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-[#E6F2EF] mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    value={formData.userName}
                    readOnly
                    className="w-full bg-[#082026]/50 border border-[#1a3a42] rounded-lg py-3 px-4 text-[#E6F2EF] cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-[#E6F2EF] mb-2">
                    Your Email
                  </label>
                  <input
                    type="text"
                    value={formData.userEmail}
                    readOnly
                    className="w-full bg-[#082026]/50 border border-[#1a3a42] rounded-lg py-3 px-4 text-[#E6F2EF] cursor-not-allowed"
                  />
                </div>
              </div>

              {/* Preview Button */}
              {formData.imageUrl && (
                <div className="mt-2">
                  <p className="text-sm text-[#E6F2EF] mb-2">Image Preview:</p>
                  <img 
                    src={formData.imageUrl} 
                    alt="Preview" 
                    className="max-h-40 rounded-lg border border-[#1a3a42]"
                    onError={(e) => {
                      e.target.src = 'https://via.placeholder.com/300x200?text=Image+Not+Found';
                    }}
                  />
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-[#90CE48] hover:bg-[#7CB53B] text-[#082026] font-medium py-3 px-6 rounded-lg transition duration-200 flex items-center justify-center"
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-[#082026]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Submitting...
                    </>
                  ) : (
                    <>
                      <FaLeaf className="mr-2" />
                      Share Your Garden Tip
                    </>
                  )}
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShareGardenTips;