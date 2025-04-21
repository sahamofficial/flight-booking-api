import React from 'react';
import { Link } from 'react-router-dom';

const destinations = [
  {
    id: 1,
    name: 'Tokyo, Japan',
    description: 'Experience the blend of traditional culture and cutting-edge technology.',
    image: 'https://images.unsplash.com/photo-1605130284535-11dd9eedc58a',
    price: 'from $800',
  },
  {
    id: 2,
    name: 'Paris, France',
    description: 'Discover the city of love with its iconic landmarks and cuisine.',
    image: 'https://images.unsplash.com/photo-1554366347-897a5113f6ab',
    price: 'from $750',
  },
  {
    id: 3,
    name: 'Sydney, Australia',
    description: 'Visit the land down under with beautiful beaches and vibrant culture.',
    image: 'https://images.unsplash.com/photo-1606944331341-72bf6523ff5e',
    price: 'from $1100',
  },
  {
    id: 4,
    name: 'Dubai, UAE',
    description: 'Experience luxury in this ultramodern city in the Arabian Desert.',
    image: 'https://images.unsplash.com/photo-1594661745200-810105bcf054',
    price: 'from $550',
  },
];

const DestinationShowcase = () => {
  return (
    <div id="destinations" className="bg-white py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            Popular Destinations
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-500 mx-auto">
            Explore our most sought-after destinations and start planning your next adventure today.
          </p>
        </div>

        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {destinations.map((destination) => (
            <div key={destination.id} className="group rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="relative h-48">
                <img
                  src={destination.image}
                  alt={destination.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black opacity-60"></div>
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-xl font-bold text-white">{destination.name}</h3>
                  <p className="text-sm text-blue-200">{destination.price}</p>
                </div>
              </div>
              <div className="p-4 bg-white">
                <p className="text-gray-600">{destination.description}</p>
                <Link
                  to={`/search?destination=${destination.name.split(',')[0]}`}
                  className="mt-4 inline-flex items-center text-sm font-medium text-blue-600 hover:text-blue-500"
                >
                  View Flights
                  <svg className="ml-1 h-4 w-4" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                    <path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd" />
                  </svg>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DestinationShowcase;
