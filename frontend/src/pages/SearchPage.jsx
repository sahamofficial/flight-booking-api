import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchForm from '../components/Search/SearchForm';
import FlightResults from '../components/Search/FlightResults';
import { searchFlights } from '../api/api';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const [isLoading, setIsLoading] = useState(false);
  const [outboundFlights, setOutboundFlights] = useState([]);
  const [returnFlights, setReturnFlights] = useState([]);
  const [isRoundTrip, setIsRoundTrip] = useState(false);
  const [searchPerformed, setSearchPerformed] = useState(false);
  const [error, setError] = useState(null);

  // Check if there are URL params to auto-search
  useEffect(() => {
    const destination = searchParams.get('destination');
    if (destination) {
      // Auto-populate search based on the destination showcase click
      handleSearch({
        origin: 'New York', // Default origin
        destination: destination,
        departure_date: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0], // 1 week from now
        passengers: 1
      });
    }
  }, [searchParams]);

  const handleSearch = async (params) => {
    setIsLoading(true);
    setError(null);
    setSearchPerformed(true);
    setIsRoundTrip(!!params.return_date);

    try {
      const response = await searchFlights(params);
      setOutboundFlights(response.data.outbound_flights || []);
      setReturnFlights(response.data.return_flights || []);
    } catch (err) {
      console.error('Error searching flights:', err);
      setError('Failed to fetch flights. Please try again.');
      setOutboundFlights([]);
      setReturnFlights([]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Search Flights</h1>
          <p className="mt-2 text-gray-600">Find the best flights at competitive prices</p>
        </div>

        <div className="mb-8">
          <SearchForm onSearch={handleSearch} />
        </div>

        {isLoading && (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Searching for the best flights...</p>
          </div>
        )}

        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-8">
            <div className="flex">
              <div className="flex-shrink-0">
                <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
              </div>
              <div className="ml-3">
                <p className="text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {searchPerformed && !isLoading && (
          <>
            {outboundFlights.length === 0 && returnFlights.length === 0 ? (
              <div className="bg-white p-8 rounded-lg shadow text-center">
                <img 
                  src="https://images.unsplash.com/photo-1682922135189-ef8d6355c3b7" 
                  alt="No flights found" 
                  className="w-48 h-48 object-cover rounded-full mx-auto opacity-50"
                />
                <h3 className="text-xl font-semibold text-gray-800 mt-6 mb-2">No Flights Found</h3>
                <p className="text-gray-600 max-w-md mx-auto">
                  We couldn't find any flights matching your search criteria. Please try different dates or destinations.
                </p>
              </div>
            ) : (
              <FlightResults 
                outboundFlights={outboundFlights} 
                returnFlights={returnFlights} 
                isRoundTrip={isRoundTrip} 
              />
            )}
          </>
        )}

        {!searchPerformed && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-10">
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Popular Destinations</h3>
              <div className="grid grid-cols-2 gap-4">
                <div className="text-sm p-3 bg-blue-50 rounded hover:bg-blue-100 cursor-pointer">
                  New York ↔ London
                </div>
                <div className="text-sm p-3 bg-blue-50 rounded hover:bg-blue-100 cursor-pointer">
                  Los Angeles ↔ Tokyo
                </div>
                <div className="text-sm p-3 bg-blue-50 rounded hover:bg-blue-100 cursor-pointer">
                  Dubai ↔ Singapore
                </div>
                <div className="text-sm p-3 bg-blue-50 rounded hover:bg-blue-100 cursor-pointer">
                  Paris ↔ Sydney
                </div>
              </div>
            </div>
            <div className="bg-blue-600 text-white p-6 rounded-lg shadow-md">
              <h3 className="text-lg font-semibold mb-4">Travel Tips</h3>
              <ul className="space-y-2">
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Book 3-4 weeks in advance for the best prices
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Flexible dates can save you money
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Tuesday and Wednesday flights often have lower prices
                </li>
                <li className="flex items-center">
                  <svg className="h-5 w-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Consider nearby airports for better deals
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
