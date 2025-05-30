import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../provider/AuthProvider';
import { toast } from 'react-hot-toast';
import { FiMail, FiArrowLeft } from 'react-icons/fi';

const ForgotPassword = () => {
  const { resetPassword } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      await resetPassword(email);
      toast.success('Password reset link sent! Check your email.', {
        duration: 5000,
      });
      setEmail('');
    } catch (error) {
      toast.error(error.message || 'Failed to send reset link. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#082026] px-4 py-12">
      <div className="w-full max-w-md">
        {/* Back Button */}
        <Link 
          to="/login" 
          className="flex items-center text-[#90CE48] hover:text-[#D4CF1D] mb-6 transition-colors"
        >
          <FiArrowLeft className="mr-2" />
          Back to Login
        </Link>

        {/* Card */}
        <div className="bg-[#082026]/90 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-[#90CE48]/30">
          {/* Header */}
          <div className="text-center mb-8">
            <div className="w-20 h-20 mx-auto bg-[#90CE48]/10 rounded-full flex items-center justify-center mb-4">
              <FiMail className="w-10 h-10 text-[#90CE48]" />
            </div>
            <h1 className="text-3xl font-bold text-[#F5F0E6]">Forgot Password?</h1>
            <p className="text-[#F5F0E6]/80 mt-2">
              Enter your email to receive a reset link
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-[#F5F0E6] mb-1">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiMail className="h-5 w-5 text-[#90CE48]" />
                </div>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-3 bg-[#082026]/50 border border-[#90CE48]/30 rounded-lg text-[#F5F0E6] placeholder-[#F5F0E6]/50 focus:outline-none focus:ring-1 focus:ring-[#90CE48] focus:border-[#90CE48] transition"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-[#082026] bg-[#90CE48] hover:bg-[#D4CF1D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#90CE48] transition-colors duration-300 ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Sending...' : 'Send Reset Link'}
            </button>
          </form>

          {/* Bottom Links */}
          <div className="mt-6 text-center">
            <p className="text-sm text-[#F5F0E6]">
              Don't have an account?{' '}
              <Link to="/register" className="font-medium text-[#90CE48] hover:text-[#D4CF1D] transition">
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;