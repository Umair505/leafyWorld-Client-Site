import React, { useContext } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../provider/AuthProvider';

const Register = () => {
  const { register, handleSubmit, formState: { errors }, watch } = useForm();
  const password = watch('password');
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/';
  
  const onSubmit = async (data) => {
    const { name, email, password, confirmPassword, photoURL } = data;
    
    if (password !== confirmPassword) {
      toast.error("Passwords don't match!");
      return;
    }

    try {
      // 1. Create user account
      const userCredential = await createUser(email, password);
      
      toast.success("Account created successfully!");
      navigate(`${location.state? location.state :"/login"}`);
      
    } catch (error) {
      toast.error(error.message || 'Registration failed');
      console.error("Registration error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#082026] px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="w-20 h-20 mx-auto bg-[#90CE48]/10 rounded-full flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-[#90CE48]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
            </svg>
          </div>
          <h1 className="text-3xl font-bold text-[#F5F0E6]">Create Account</h1>
          <p className="text-[#F5F0E6]/80 mt-2">Join our green community today</p>
        </div>
        

        {/* Registration Form */}
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name Field */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-[#F5F0E6] mb-1">Full Name</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-[#90CE48]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
             
              <input
                id="name"
                name="name"
                type="text"
                {...register('name', { required: 'Name is required' })}
                className="block w-full pl-10 pr-3 py-3 bg-[#082026]/50 border border-[#90CE48]/30 rounded-lg text-[#F5F0E6] placeholder-[#F5F0E6]/50 focus:outline-none focus:ring-1 focus:ring-[#90CE48] focus:border-[#90CE48] transition"
                placeholder="John Doe"
              />
            </div>
            {errors.name && <p className="mt-1 text-sm text-[#ff6b6b]">{errors.name.message}</p>}
          </div>

          {/* Photo URL Field */}
          <div>
            <label htmlFor="photoURL" className="block text-sm font-medium text-[#F5F0E6] mb-1">Profile Photo URL (Optional)</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-[#90CE48]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                id="photoURL"
                name="photoURL"
                type="url"
                {...register('photoURL', {
                  pattern: {
                    value: /^(https?:\/\/)?([\da-z.-]+)\.([a-z.]{2,6})([/\w .-]*)*\/?$/,
                    message: 'Please enter a valid URL'
                  }
                })}
                className="block w-full pl-10 pr-3 py-3 bg-[#082026]/50 border border-[#90CE48]/30 rounded-lg text-[#F5F0E6] placeholder-[#F5F0E6]/50 focus:outline-none focus:ring-1 focus:ring-[#90CE48] focus:border-[#90CE48] transition"
                placeholder="https://example.com/photo.jpg"
              />
            </div>
            {errors.photoURL && <p className="mt-1 text-sm text-[#ff6b6b]">{errors.photoURL.message}</p>}
          </div>

          {/* Email Field */}
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-[#F5F0E6] mb-1">Email Address</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-[#90CE48]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <input
                id="email"
                name="email"
                type="email"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className="block w-full pl-10 pr-3 py-3 bg-[#082026]/50 border border-[#90CE48]/30 rounded-lg text-[#F5F0E6] placeholder-[#F5F0E6]/50 focus:outline-none focus:ring-1 focus:ring-[#90CE48] focus:border-[#90CE48] transition"
                placeholder="you@example.com"
              />
            </div>
            {errors.email && <p className="mt-1 text-sm text-[#ff6b6b]">{errors.email.message}</p>}
          </div>

          {/* Password Field */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-[#F5F0E6] mb-1">Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-[#90CE48]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
              </div>
              <input
                id="password"
                name="password"
                type="password"
                {...register('password', { 
                  required: 'Password is required',
                  minLength: {
                    value: 8,
                    message: 'Password must be at least 8 characters'
                  },
                  pattern: {
                    value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/,
                    message: 'Password must contain uppercase, lowercase, and number'
                  }
                })}
                className="block w-full pl-10 pr-3 py-3 bg-[#082026]/50 border border-[#90CE48]/30 rounded-lg text-[#F5F0E6] placeholder-[#F5F0E6]/50 focus:outline-none focus:ring-1 focus:ring-[#90CE48] focus:border-[#90CE48] transition"
                placeholder="••••••••"
              />
            </div>
            {errors.password && <p className="mt-1 text-sm text-[#ff6b6b]">{errors.password.message}</p>}
          </div>

          {/* Confirm Password Field */}
          <div>
            <label htmlFor="confirmPassword" className="block text-sm font-medium text-[#F5F0E6] mb-1">Confirm Password</label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg className="h-5 w-5 text-[#90CE48]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                {...register('confirmPassword', { 
                  required: 'Please confirm your password',
                  validate: value => 
                    value === password || 'Passwords do not match'
                })}
                className="block w-full pl-10 pr-3 py-3 bg-[#082026]/50 border border-[#90CE48]/30 rounded-lg text-[#F5F0E6] placeholder-[#F5F0E6]/50 focus:outline-none focus:ring-1 focus:ring-[#90CE48] focus:border-[#90CE48] transition"
                placeholder="••••••••"
              />
            </div>
            {errors.confirmPassword && <p className="mt-1 text-sm text-[#ff6b6b]">{errors.confirmPassword.message}</p>}
          </div>

          {/* Terms Checkbox */}
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <input
                id="terms"
                name="terms"
                type="checkbox"
                {...register('terms', { required: 'You must accept the terms' })}
                className="focus:ring-[#90CE48] h-4 w-4 text-[#90CE48] border-[#90CE48]/30 rounded"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="font-medium text-[#F5F0E6]">
                I agree to the <Link to="#" className="text-[#90CE48] hover:underline">Terms</Link> and <Link to="#" className="text-[#90CE48] hover:underline">Privacy Policy</Link>
              </label>
              {errors.terms && <p className="mt-1 text-sm text-[#ff6b6b]">{errors.terms.message}</p>}
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-[#082026] bg-[#90CE48] hover:bg-[#D4CF1D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#90CE48] transition-colors duration-300"
          >
            Create Account
          </button>
        </form>

        {/* Login Link */}
        <div className="mt-6 text-center">
          <p className="text-sm text-[#F5F0E6]">
            Already have an account?{' '}
            <Link to="/login" className="font-medium text-[#90CE48] hover:text-[#D4CF1D] transition">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;