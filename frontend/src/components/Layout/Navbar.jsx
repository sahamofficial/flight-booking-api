import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import logoSvg from '../../assets/logo.svg';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await logout();
    navigate('/');
  };

  return (
    <nav className="bg-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex">
            <Link to="/" className="flex-shrink-0 flex items-center">
              <img className="h-8 w-auto" src={logoSvg} alt="Jet-Air Logo" />
              <span className="ml-2 text-xl font-bold text-blue-700">Jet-Air</span>
            </Link>
            <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
              <Link to="/" className="border-transparent text-gray-500 hover:border-blue-500 hover:text-blue-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Home
              </Link>
              <Link to="/search" className="border-transparent text-gray-500 hover:border-blue-500 hover:text-blue-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                Search Flights
              </Link>
              {user && user.is_admin && (
                <Link to="/admin" className="border-transparent text-gray-500 hover:border-blue-500 hover:text-blue-700 inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium">
                  Admin Dashboard
                </Link>
              )}
            </div>
          </div>
          <div className="hidden sm:ml-6 sm:flex sm:items-center">
            {user ? (
              <div className="ml-3 relative flex items-center space-x-4">
                <Link to="/dashboard" className="text-gray-700 hover:text-blue-700">
                  My Bookings
                </Link>
                <span className="text-gray-500">{user.name}</span>
                <button
                  onClick={handleLogout}
                  className="bg-blue-600 text-white py-1 px-3 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-x-2">
                <Link
                  to="/login"
                  className="border border-blue-600 text-blue-600 py-1 px-3 rounded-md text-sm font-medium hover:bg-blue-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-blue-600 text-white py-1 px-3 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  Register
                </Link>
              </div>
            )}
          </div>
          <div className="-mr-2 flex items-center sm:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500"
            >
              <span className="sr-only">Open main menu</span>
              {mobileMenuOpen ? (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="block h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="sm:hidden">
          <div className="pt-2 pb-3 space-y-1">
            <Link to="/" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-blue-500 hover:text-blue-700">
              Home
            </Link>
            <Link to="/search" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-blue-500 hover:text-blue-700">
              Search Flights
            </Link>
            {user && user.is_admin && (
              <Link to="/admin" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-blue-500 hover:text-blue-700">
                Admin Dashboard
              </Link>
            )}
          </div>
          <div className="pt-4 pb-3 border-t border-gray-200">
            {user ? (
              <div className="space-y-1">
                <div className="px-4 py-2 text-sm text-gray-500">{user.name}</div>
                <Link to="/dashboard" className="block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-blue-500 hover:text-blue-700">
                  My Bookings
                </Link>
                <button
                  onClick={handleLogout}
                  className="w-full text-left block pl-3 pr-4 py-2 border-l-4 border-transparent text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-red-500 hover:text-red-700"
                >
                  Logout
                </button>
              </div>
            ) : (
              <div className="space-y-1 px-4">
                <Link to="/login" className="block py-2 text-base font-medium text-blue-600 hover:text-blue-700">
                  Login
                </Link>
                <Link to="/register" className="block py-2 text-base font-medium text-blue-600 hover:text-blue-700">
                  Register
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
