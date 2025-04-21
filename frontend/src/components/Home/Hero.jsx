import React from 'react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative overflow-hidden">
      <div className="absolute inset-0">
        <img
          src="https://images.unsplash.com/photo-1570362600150-49838a02c265"
          alt="Airplane flying through clouds"
          className="h-full w-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-900 to-transparent opacity-80"></div>
      </div>
      <div className="relative max-w-7xl mx-auto py-24 px-4 sm:py-32 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl">
          Fly with <span className="text-blue-300">Confidence</span>
        </h1>
        <p className="mt-6 text-xl text-white max-w-xl">
          Book your next adventure with Jet-Air Travel Agency. We offer the best flights at competitive prices to destinations worldwide.
        </p>
        <div className="mt-10 flex space-x-4">
          <Link
            to="/search"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Search Flights
          </Link>
          <a
            href="#destinations"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-blue-600 bg-white hover:bg-gray-50"
          >
            View Destinations
          </a>
        </div>
      </div>
    </div>
  );
};

export default Hero;
