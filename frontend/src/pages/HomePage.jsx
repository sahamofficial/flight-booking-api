import React from 'react';
import Hero from '../components/Home/Hero';
import DestinationShowcase from '../components/Home/DestinationShowcase';

const HomePage = () => {
  return (
    <div>
      <Hero />
      
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              Why Choose Jet-Air?
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Experience hassle-free travel with our premium services and competitive prices.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-md bg-blue-600 text-white mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-medium text-gray-900">Best Prices</h3>
                <p className="mt-2 text-gray-500">
                  We offer competitive pricing on flights to all destinations worldwide.
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-md bg-blue-600 text-white mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-medium text-gray-900">24/7 Support</h3>
                <p className="mt-2 text-gray-500">
                  Our customer service team is available around the clock to assist you.
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center h-16 w-16 rounded-md bg-blue-600 text-white mx-auto">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                  </svg>
                </div>
                <h3 className="mt-4 text-xl font-medium text-gray-900">Secure Booking</h3>
                <p className="mt-2 text-gray-500">
                  Your payment and personal information are protected with advanced security.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
              How It Works
            </h2>
            <p className="mt-4 max-w-2xl mx-auto text-xl text-gray-500">
              Booking your flight is quick and easy with Jet-Air.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white mx-auto">
                  <span className="text-lg font-bold">1</span>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Search</h3>
                <p className="mt-2 text-gray-500">
                  Enter your destination, dates, and number of passengers.
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white mx-auto">
                  <span className="text-lg font-bold">2</span>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Select</h3>
                <p className="mt-2 text-gray-500">
                  Choose the flight that best suits your schedule and budget.
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white mx-auto">
                  <span className="text-lg font-bold">3</span>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Book</h3>
                <p className="mt-2 text-gray-500">
                  Enter passenger details and customize your journey with meal options.
                </p>
              </div>

              <div className="text-center">
                <div className="flex items-center justify-center h-12 w-12 rounded-full bg-blue-600 text-white mx-auto">
                  <span className="text-lg font-bold">4</span>
                </div>
                <h3 className="mt-4 text-lg font-medium text-gray-900">Fly</h3>
                <p className="mt-2 text-gray-500">
                  Receive your confirmation and get ready for your journey.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <DestinationShowcase />

      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-blue-700 rounded-lg shadow-xl overflow-hidden">
            <div className="pt-10 pb-12 px-6 sm:pt-16 sm:px-16 lg:py-16 lg:pr-0 xl:py-20 xl:px-20 flex flex-col lg:flex-row">
              <div className="lg:flex-1">
                <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                  <span className="block">Ready to take off?</span>
                  <span className="block">Book your flight today.</span>
                </h2>
                <p className="mt-4 text-lg leading-6 text-blue-100">
                  Sign up for an account to get exclusive deals and manage your bookings with ease.
                </p>
                <div className="mt-8 flex space-x-4">
                  <a
                    href="/search"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-blue-700 bg-white hover:bg-blue-50"
                  >
                    Search Flights
                  </a>
                  <a
                    href="/register"
                    className="inline-flex items-center justify-center px-5 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-800 hover:bg-blue-900"
                  >
                    Sign Up
                  </a>
                </div>
              </div>
              <div className="mt-10 lg:mt-0 lg:flex-1 lg:flex lg:justify-end">
                <img
                  className="h-56 w-full object-cover lg:w-80 lg:h-auto rounded-md"
                  src="https://images.unsplash.com/photo-1631478365665-aeb1f97f702b"
                  alt="Airplane interior"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
