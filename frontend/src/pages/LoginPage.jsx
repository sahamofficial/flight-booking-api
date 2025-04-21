import React from 'react';
import Login from '../components/Auth/Login';

const LoginPage = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Welcome Back
            </h1>
            <p className="mt-3 text-lg text-gray-500">
              Sign in to your Jet-Air account to manage your bookings, check flight status, and more.
            </p>
          </div>
          
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <Login />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
