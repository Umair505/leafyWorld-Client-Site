import React, { useState, useEffect, useContext } from 'react';
import { FaEdit, FaTrash, FaSeedling, FaSpinner, FaExclamationTriangle } from 'react-icons/fa';
import { useNavigate } from 'react-router';
import Swal from 'sweetalert2';

import { AuthContext } from '../provider/AuthProvider';
import UpdateTipModal from '../Components/UpdateTipModal';

const MyTips = () => {
  const [tips, setTips] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedTip, setSelectedTip] = useState(null);
  const [showUpdateModal, setShowUpdateModal] = useState(false);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMyTips = async () => {
      try {
        if (!user?.email) return;
        
        setLoading(true);
        const response = await fetch(`${import.meta.env.VITE_API_URL}/my-tips/${user.email}`);
        
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

    fetchMyTips();
  }, [user?.email]);

  const handleDelete = async (tipId) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#90CE48',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, delete it!'
    });

    if (result.isConfirmed) {
      try {
        const response = await fetch(`${import.meta.env.VITE_API_URL}/tips/${tipId}`, {
          method: 'DELETE',
        });

        if (!response.ok) {
          throw new Error('Failed to delete tip');
        }

        setTips(tips.filter(tip => tip._id !== tipId));
        Swal.fire(
          'Deleted!',
          'Your tip has been deleted.',
          'success'
        );
      } catch (err) {
        Swal.fire(
          'Error!',
          err.message,
          'error'
        );
      }
    }
  };

  const handleUpdate = (tip) => {
    setSelectedTip(tip);
    setShowUpdateModal(true);
  };

  const handleUpdateSuccess = (updatedTip) => {
    setTips(tips.map(tip => tip._id === updatedTip._id ? { ...tip, ...updatedTip } : tip));
    setShowUpdateModal(false);
    Swal.fire(
      'Success!',
      'Your tip has been updated.',
      'success'
    );
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#082026] to-[#0a2a32] p-4">
        <FaSpinner className="animate-spin text-4xl text-[#90CE48] mb-4" />
        <p className="text-[#F5F0E6] text-lg">Loading your gardening tips...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-b from-[#082026] to-[#0a2a32] p-4">
        <FaExclamationTriangle className="text-4xl text-red-500 mb-4" />
        <p className="text-[#F5F0E6] text-lg mb-4">Error: {error}</p>
        <button 
          onClick={() => window.location.reload()}
          className="bg-[#90CE48] hover:bg-[#7CB53B] text-[#082026] font-medium py-2 px-4 rounded-lg transition duration-200"
        >
          Try Again
        </button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#082026] to-[#0a2a32] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium bg-[#90CE48]/20 text-[#90CE48] mb-4">
            <FaSeedling className="mr-2" /> My Gardening Wisdom
          </div>
          <h1 className="text-4xl font-bold text-[#F5F0E6] mb-3">My <span className="text-[#D4CF1D]">Garden Tips</span></h1>
          <p className="text-lg text-[#E6F2EF] max-w-2xl mx-auto">
            Manage and update your shared gardening knowledge
          </p>
        </div>

        {/* Tips Table */}
        <div className="bg-[#0a2a32] rounded-xl overflow-hidden shadow-lg border border-[#1a3a42]">
          {tips.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-[#1a3a42]">
                <thead className="bg-[#082026]">
                  <tr>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-[#90CE48] uppercase tracking-wider">
                      Title
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-[#90CE48] uppercase tracking-wider">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-[#90CE48] uppercase tracking-wider">
                      Category
                    </th>
                    <th scope="col" className="px-6 py-4 text-left text-sm font-medium text-[#90CE48] uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-[#0a2a32] divide-y divide-[#1a3a42]">
                  {tips.map((tip) => (
                    <tr key={tip._id} className="hover:bg-[#082026]/50 transition-colors duration-150">
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="flex items-center">
                          <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-[#90CE48]/10 rounded-lg text-[#90CE48]">
                            <FaSeedling />
                          </div>
                          <div className="ml-4">
                            <div className="text-sm font-medium text-[#F5F0E6]">{tip.title}</div>
                            <div className="text-xs text-[#E6F2EF]/70">{tip.plantType}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`px-2 py-1 text-xs rounded-full font-medium ${
                          tip.availability === 'Public' ? 'bg-green-500/10 text-green-500' : 'bg-purple-500/10 text-purple-500'
                        }`}>
                          {tip.availability}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className="px-2 py-1 text-xs rounded-full font-medium bg-[#90CE48]/10 text-[#90CE48]">
                          {tip.category}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <div className="flex space-x-3">
                          <button
                            onClick={() => handleUpdate(tip)}
                            className="text-[#D4CF1D] hover:text-[#F5F0E6] flex items-center"
                            title="Edit"
                          >
                            <FaEdit className="mr-1" /> Edit
                          </button>
                          <button
                            onClick={() => handleDelete(tip._id)}
                            className="text-red-400 hover:text-red-300 flex items-center"
                            title="Delete"
                          >
                            <FaTrash className="mr-1" /> Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="mx-auto h-24 w-24 flex items-center justify-center bg-[#90CE48]/10 rounded-full text-[#90CE48] mb-4">
                <FaSeedling className="text-3xl" />
              </div>
              <h3 className="text-lg font-medium text-[#F5F0E6]">No tips found</h3>
              <p className="mt-2 text-[#E6F2EF]">You haven't shared any gardening tips yet</p>
              <button
                onClick={() => navigate('/share-tip')}
                className="mt-4 bg-[#90CE48] hover:bg-[#7CB53B] text-[#082026] font-medium py-2 px-4 rounded-lg transition duration-200"
              >
                Share Your First Tip
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Update Tip Modal */}
      {selectedTip && (
        <UpdateTipModal
          tip={selectedTip}
          show={showUpdateModal}
          onClose={() => {
            setShowUpdateModal(false)
            setSelectedTip(null)
          }}
          onSuccess={handleUpdateSuccess}
        />
      )}
    </div>
  );
};

export default MyTips;