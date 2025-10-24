import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    remember: false
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const res = await axios.post(
  "http://localhost:8000/api/accounts/token/",
  {
    email: formData.email,
    password: formData.password,
  },
  { withCredentials: true }
);

      console.log("Login successful:", res.data);
      navigate("/"); // redirect wherever you want
    } catch (err) {
      console.error("Login failed:", err);
      setError("Invalid credentials");
    }
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-purple-50 flex items-center justify-center py-12 px-6">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center">
       
        {/* Right Side - Sign In Form */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Sign In</h1>
            <p className="text-gray-600">Enter your credentials to access your account</p>
          </div>

          <div onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div>
              <label htmlFor="email" className="block text-sm font-semibold text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-none"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Password Input */}
            <div>
              <label htmlFor="password" className="block text-sm font-semibold text-gray-700 mb-2">
                Password
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type={showPassword ? 'text' : 'password'}
                  id="password"
                  name="password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-12 pr-12 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition-all outline-none"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-4 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                </button>
              </div>
            </div>

            {/* Remember Me & Forgot Password */}
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  name="remember"
                  checked={formData.remember}
                  onChange={handleChange}
                  className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-600"
                />
                <span className="text-sm text-gray-700">Remember me</span>
              </label>
              <button
                type="button"
                className="text-sm font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                Forgot password?
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              onClick={handleSubmit}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-6 py-4 rounded-lg shadow-md hover:shadow-xl hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              Sign In
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>

            {/* Divider */}
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-300"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500">Or continue with</span>
              </div>
            </div>

            {/* Social Sign In */}
            <div className="grid grid-cols-2 gap-4">
              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
              >
                <svg className="w-5 h-5" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span className="text-sm font-medium text-gray-700">Google</span>
              </button>

              <button
                type="button"
                className="flex items-center justify-center gap-2 px-4 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-all duration-200"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M16.365 1.43c0 1.14-.493 2.27-1.177 3.08-.744.9-1.99 1.57-2.987 1.57-.12 0-.23-.02-.3-.03-.01-.06-.04-.22-.04-.39 0-1.15.572-2.27 1.206-2.98.804-.94 2.142-1.64 3.248-1.68.03.13.05.28.05.43zm4.565 15.71c-.03.07-.463 1.58-1.518 3.12-.945 1.34-1.94 2.71-3.43 2.71-1.517 0-1.9-.88-3.63-.88-1.698 0-2.302.91-3.67.91-1.377 0-2.332-1.26-3.428-2.8-1.287-1.82-2.323-4.63-2.323-7.28 0-4.28 2.797-6.55 5.552-6.55 1.448 0 2.675.95 3.6.95.865 0 2.222-1.01 3.902-1.01.613 0 2.886.06 4.374 2.19-.13.09-2.383 1.37-2.383 4.19 0 3.26 2.854 4.42 2.957 4.45z"/>
                </svg>
                <span className="text-sm font-medium text-gray-700">Apple</span>
              </button>
            </div>
          </div>

          {/* Sign Up Link */}
         {/* Sign Up Link */}
<div className="mt-8 text-center">
  <p className="text-gray-600">
    Don't have an account?{' '}
    <Link
      to="/register"
      className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
    >
      Sign up for free
    </Link>
  </p>
</div>

        </div>
      </div>
    </div>
  );
}