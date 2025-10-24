import React, { useState } from 'react';
import { Mail, Lock, User, Phone, Eye, EyeOff, ArrowRight } from 'lucide-react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    phone: '',
    password: '',
    is_business_owner: false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ ...formData, [name]: type === 'checkbox' ? checked : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post(
        'http://localhost:8000/api/accounts/register/',
        formData,
        { withCredentials: true } // crucial: allows cookies from backend
      );

      navigate('/appointments');
    } catch (err) {
      console.error(err);
      setError(
        err.response?.data?.detail ||
        'Registration failed. Please check your info and try again.'
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-indigo-50 to-purple-50 flex items-center justify-center py-12 px-6">
      <div className="max-w-6xl w-full grid lg:grid-cols-2 gap-8 items-center">
        <div className="bg-white rounded-3xl shadow-2xl p-8 lg:p-12">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Account</h1>
            <p className="text-gray-600">Register to book your first gym appointment</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Username */}
            <div>
              <label htmlFor="username" className="block text-sm font-semibold text-gray-700 mb-2">
                Username
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <User className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="text"
                  id="username"
                  name="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                  placeholder="Your username"
                />
              </div>
            </div>

            {/* Email */}
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
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label htmlFor="phone" className="block text-sm font-semibold text-gray-700 mb-2">
                Phone Number
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                  <Phone className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  required
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-12 pr-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
                  placeholder="+30 69X XXX XXXX"
                />
              </div>
            </div>

            {/* Password */}
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
                  className="w-full pl-12 pr-12 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-600 focus:border-transparent outline-none transition-all"
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

            {/* Business Checkbox */}
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="is_business_owner"
                name="is_business_owner"
                checked={formData.is_business_owner}
                onChange={handleChange}
                className="w-4 h-4 rounded border-gray-300 text-indigo-600 focus:ring-2 focus:ring-indigo-600"
              />
              <label htmlFor="is_business_owner" className="text-sm text-gray-700">
                I’m a business owner (gym, barber, salon, etc.)
              </label>
            </div>

            {/* Error message */}
            {error && <p className="text-red-600 text-sm text-center">{error}</p>}

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold px-6 py-4 rounded-lg shadow-md hover:shadow-xl hover:opacity-90 transition-all duration-200 flex items-center justify-center gap-2 group"
            >
              {loading ? 'Creating...' : 'Create Account'}
              <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Link to Login */}
          <div className="mt-8 text-center">
            <p className="text-gray-600">
              Already have an account?{' '}
              <Link
                to="/login"
                className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
              >
                Sign in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
