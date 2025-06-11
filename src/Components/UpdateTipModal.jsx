import React, { useState } from 'react';
import { FaTimes, FaSeedling } from 'react-icons/fa';
import Swal from 'sweetalert2';

const UpdateTipModal = ({ tip, show, onClose, onSuccess }) => {
  const [formData, setFormData] = useState({
    title: tip.title,
    plantType: tip.plantType,
    category: tip.category,
    difficulty: tip.difficulty,
    description: tip.description,
    keyTips: tip.keyTips?.join('\n') || '',
    availability: tip.availability,
    imageUrl: tip.imageUrl
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const updatedTip = {
        ...formData,
        keyTips: formData.keyTips.split('\n').filter(tip => tip.trim() !== '')
      };

      const response = await fetch(`${import.meta.env.VITE_API_URL}/tips/${tip._id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(updatedTip)
      });

      if (!response.ok) {
        throw new Error('Failed to update tip');
      }
      const result = await response.json();
       onSuccess({
      ...result,
      ...updatedTip,  // Include the updated fields in the response
      _id: tip._id    // Ensure we keep the same ID
    });
    } catch (err) {
      Swal.fire(
        'Error!',
        err.message,
        'error'
      );
    } finally {
      setLoading(false);
    }
  };

  if (!show) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-[#0a2a32] rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto border border-[#1a3a42] shadow-xl">
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center">
              <FaSeedling className="text-2xl text-[#90CE48] mr-3" />
              <h2 className="text-2xl font-bold text-[#F5F0E6]">Update Garden Tip</h2>
            </div>
            <button
              onClick={onClose}
              className="text-[#E6F2EF] hover:text-[#90CE48] transition duration-200"
            >
              <FaTimes className="text-xl" />
            </button>
          </div>

          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-medium text-[#90CE48] mb-1">Title</label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleChange}
                  className="w-full bg-[#082026] border border-[#1a3a42] rounded-lg py-2 px-3 text-[#F5F0E6] focus:outline-none focus:ring-2 focus:ring-[#90CE48]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#90CE48] mb-1">Plant Type</label>
                <input
                  type="text"
                  name="plantType"
                  value={formData.plantType}
                  onChange={handleChange}
                  className="w-full bg-[#082026] border border-[#1a3a42] rounded-lg py-2 px-3 text-[#F5F0E6] focus:outline-none focus:ring-2 focus:ring-[#90CE48]"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-[#90CE48] mb-1">Category</label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleChange}
                  className="w-full bg-[#082026] border border-[#1a3a42] rounded-lg py-2 px-3 text-[#F5F0E6] focus:outline-none focus:ring-2 focus:ring-[#90CE48]"
                  required
                >
                  <option value="Plant Care">Plant Care</option>
                  <option value="Composting">Composting</option>
                  <option value="Vertical Gardening">Vertical Gardening</option>
                  <option value="Indoor Gardening">Indoor Gardening</option>
                  <option value="Organic Pest Control">Organic Pest Control</option>
                  <option value="Hydroponics">Hydroponics</option>
                  <option value="Seasonal Planting">Seasonal Planting</option>
                  <option value="Soil Health">Soil Health</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#90CE48] mb-1">Difficulty</label>
                <select
                  name="difficulty"
                  value={formData.difficulty}
                  onChange={handleChange}
                  className="w-full bg-[#082026] border border-[#1a3a42] rounded-lg py-2 px-3 text-[#F5F0E6] focus:outline-none focus:ring-2 focus:ring-[#90CE48]"
                  required
                >
                  <option value="Easy">Easy</option>
                  <option value="Medium">Medium</option>
                  <option value="Hard">Hard</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#90CE48] mb-1">Status</label>
                <select
                  name="availability"  
                  value={formData.availability}  
                  onChange={handleChange}
                  className="w-full bg-[#082026] border border-[#1a3a42] rounded-lg py-2 px-3 text-[#F5F0E6] focus:outline-none focus:ring-2 focus:ring-[#90CE48]"
                  required
                >
                  <option value="Public">Public</option>
                  <option value="Hidden">Hidden</option>

                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#90CE48] mb-1">Image URL</label>
                <input
                  type="url"
                  name="imageUrl"
                  value={formData.imageUrl}
                  onChange={handleChange}
                  className="w-full bg-[#082026] border border-[#1a3a42] rounded-lg py-2 px-3 text-[#F5F0E6] focus:outline-none focus:ring-2 focus:ring-[#90CE48]"
                />
              </div>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-[#90CE48] mb-1">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows="4"
                className="w-full bg-[#082026] border border-[#1a3a42] rounded-lg py-2 px-3 text-[#F5F0E6] focus:outline-none focus:ring-2 focus:ring-[#90CE48]"
                required
              ></textarea>
            </div>

            <div className="mb-6">
              <label className="block text-sm font-medium text-[#90CE48] mb-1">Key Tips (one per line)</label>
              <textarea
                name="keyTips"
                value={formData.keyTips}
                onChange={handleChange}
                rows="3"
                className="w-full bg-[#082026] border border-[#1a3a42] rounded-lg py-2 px-3 text-[#F5F0E6] focus:outline-none focus:ring-2 focus:ring-[#90CE48]"
              ></textarea>
            </div>

            <div className="flex justify-end space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="bg-transparent border border-[#1a3a42] text-[#F5F0E6] hover:bg-[#082026] font-medium py-2 px-6 rounded-lg transition duration-200"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={loading}
                className="bg-[#90CE48] hover:bg-[#7CB53B] text-[#082026] font-medium py-2 px-6 rounded-lg transition duration-200 flex items-center"
              >
                {loading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-[#082026]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Updating...
                  </>
                ) : 'Update Tip'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateTipModal;