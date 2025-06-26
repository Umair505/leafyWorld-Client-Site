import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router';
import { AuthContext } from '../provider/AuthProvider';
import toast from 'react-hot-toast';

const Login = () => {
    const {login,signInWithGoogle} = useContext(AuthContext);
    const navigate = useNavigate();
    const location = useLocation();
    const handleLogin = (e) =>{
        e.preventDefault();
        const form = e.target;
        const email = form.email.value;
        const password = form.password.value;
        login(email,password)
        .then(() =>{
            toast.success('Logged in successfully!');
            navigate(`${location.state? location.state :"/"}`);
        })
        .catch((error) => {
        toast.error(error.message || 'Login failed');
      });
    }

    const handleGoogleSignIn = () => {
    signInWithGoogle()
      .then(() => {
        toast.success('Google sign-in successful');
        navigate(`${location.state? location.state :"/"}`);
      })
      .catch((error) => {
        toast.error(error.message || 'Google sign-in failed');
      });
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-[#082026] px-4 py-12">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-10">
          <svg className="w-16 h-16 mx-auto text-[#90CE48]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
          <h1 className="text-3xl font-bold text-[#F5F0E6] mt-4">Welcome Back</h1>
          <p className="text-[#F5F0E6]/80 mt-2">Sign in to your LeafyWorld account</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
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
                autoComplete="email"
                required
                className="block w-full pl-10 pr-3 py-3 bg-[#082026]/50 border border-[#90CE48]/30 rounded-lg text-[#F5F0E6] placeholder-[#F5F0E6]/50 focus:outline-none focus:ring-1 focus:ring-[#90CE48] focus:border-[#90CE48] transition"
                placeholder="you@example.com"
              />
            </div>
          </div>

          {/* Password Field */}
          <div>
            <div className="flex justify-between items-center mb-1">
              <label htmlFor="password" className="block text-sm font-medium text-[#F5F0E6]">Password</label>
              <Link to="/forgot-password" className="text-xs font-medium text-[#90CE48] hover:text-[#D4CF1D] transition">
                Forgot password?
              </Link>
            </div>
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
                autoComplete="current-password"
                required
                className="block w-full pl-10 pr-3 py-3 bg-[#082026]/50 border border-[#90CE48]/30 rounded-lg text-[#F5F0E6] placeholder-[#F5F0E6]/50 focus:outline-none focus:ring-1 focus:ring-[#90CE48] focus:border-[#90CE48] transition"
                placeholder="••••••••"
              />
            </div>
          </div>

          {/* Remember Me */}
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-[#90CE48] focus:ring-[#90CE48] border-[#90CE48]/30 rounded"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-[#F5F0E6]">
              Remember me
            </label>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-[#082026] bg-[#90CE48] hover:bg-[#D4CF1D] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#90CE48] transition"
          >
            Sign in
          </button>
        </form>

        {/* Social Login */}
        <div className="mt-8">
          <div className="relative py-2">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-[#90CE48]/30"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-[#082026] text-[#F5F0E6]">
                Or continue with
              </span>
            </div>
          </div>

          <div className="mt-6 flex flex-col gap-3">
            {/* Google */}
            <button
                onClick={handleGoogleSignIn}
              type="button"
              className="w-full inline-flex justify-center py-3 px-4 border border-[#90CE48]/30 rounded-lg shadow-sm bg-[#082026]/50 text-sm font-medium text-[#F5F0E6] hover:bg-[#90CE48]/10 transition"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 24 24" fill="currentColor">
                <path d="M12.545 10.239v3.821h5.445c-0.712 2.315-2.647 3.972-5.445 3.972-3.332 0-6.033-2.701-6.033-6.032s2.701-6.032 6.033-6.032c1.498 0 2.866 0.549 3.921 1.453l2.814-2.814c-1.784-1.664-4.152-2.675-6.735-2.675-5.522 0-10 4.479-10 10s4.478 10 10 10c8.396 0 10-7.524 10-10 0-0.67-0.069-1.325-0.189-1.955h-9.811z"/>
              </svg>
              Continue with Google
            </button>
          </div>
        </div>

        {/* Sign Up Link */}
        <div className="my-8 text-center">
          <p className="text-sm text-[#F5F0E6]">
            Don't have an account?{' '}
            <Link to="/register" className="font-medium text-[#90CE48] hover:text-[#D4CF1D] transition">
              Sign up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
