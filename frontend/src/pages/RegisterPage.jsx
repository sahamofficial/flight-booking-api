import React from 'react';
import Register from '../components/Auth/Register';

const RegisterPage = () => {
  return (
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-xl mx-auto">
          <div className="text-center mb-10">
            <h1 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Create Your Account
            </h1>
            <p className="mt-3 text-lg text-gray-500">
              Join Jet-Air to enjoy a seamless booking experience, exclusive deals, and personalized travel options.
            </p>
          </div>
          
          <div className="bg-white shadow overflow-hidden rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <Register />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;
