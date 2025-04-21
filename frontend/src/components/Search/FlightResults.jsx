import React, { useState } from 'react';
import FlightCard from './FlightCard';

const FlightResults = ({ outboundFlights, returnFlights, isRoundTrip }) => {
  const [sortBy, setSortBy] = useState('price');
  const [filterAirline, setFilterAirline] = useState('');
  const [filterMaxPrice, setFilterMaxPrice] = useState('');

  // Get unique airlines for filtering
  const airlines = [...new Set([
    ...outboundFlights.map(flight => flight.airline.name),
    ...(returnFlights ? returnFlights.map(flight => flight.airline.name) : [])
  ])];

  // Sort flights
  const sortFlights = (flights) => {
    if (!flights) return [];
    
    return [...flights].sort((a, b) => {
      switch (sortBy) {
        case 'price':
          return a.price_without_meal - b.price_without_meal;
        case 'duration':
          return (new Date(a.arrival_time) - new Date(a.departure_time)) - 
                 (new Date(b.arrival_time) - new Date(b.departure_time));
        case 'departure':
          return new Date(a.departure_time) - new Date(b.departure_time);
        default:
          return 0;
      }
    });
  };

  // Filter flights
  const filterFlights = (flights) => {
    if (!flights) return [];
    
    return flights.filter(flight => {
      let match = true;
      
      if (filterAirline && flight.airline.name !== filterAirline) {
        match = false;
      }
      
      if (filterMaxPrice && flight.price_without_meal > parseFloat(filterMaxPrice)) {
        match = false;
      }
      
      return match;
    });
  };

  const filteredSortedOutboundFlights = sortFlights(filterFlights(outboundFlights));
  const filteredSortedReturnFlights = isRoundTrip ? sortFlights(filterFlights(returnFlights)) : [];

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-lg font-medium text-gray-900 mb-4">Filter & Sort</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <label htmlFor="sortBy" className="block text-sm font-medium text-gray-700">Sort by</label>
            <select
              id="sortBy"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="price">Price (Low to High)</option>
              <option value="duration">Duration (Shortest)</option>
              <option value="departure">Departure Time (Earliest)</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="filterAirline" className="block text-sm font-medium text-gray-700">Airline</label>
            <select
              id="filterAirline"
              value={filterAirline}
              onChange={(e) => setFilterAirline(e.target.value)}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">All Airlines</option>
              {airlines.map((airline) => (
                <option key={airline} value={airline}>{airline}</option>
              ))}
            </select>
          </div>
          
          <div>
            <label htmlFor="filterMaxPrice" className="block text-sm font-medium text-gray-700">Max Price</label>
            <input
              type="number"
              id="filterMaxPrice"
              value={filterMaxPrice}
              onChange={(e) => setFilterMaxPrice(e.target.value)}
              placeholder="Enter max price"
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
          </div>
        </div>
      </div>

      {outboundFlights.length > 0 ? (
        <>
          <h3 className="text-xl font-semibold text-gray-800">Outbound Flights</h3>
          <div className="space-y-4">
            {filteredSortedOutboundFlights.length > 0 ? (
              filteredSortedOutboundFlights.map((flight) => (
                <FlightCard key={flight.id} flight={flight} isReturn={false} />
              ))
            ) : (
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <p className="text-gray-500">No flights match your filters. Please adjust your criteria.</p>
              </div>
            )}
          </div>
        </>
      ) : (
        <div className="bg-white p-6 rounded-lg shadow text-center">
          <h3 className="text-xl font-semibold text-gray-800 mb-2">No Flights Found</h3>
          <p className="text-gray-600">We couldn't find any flights matching your search criteria. Please try different dates or destinations.</p>
        </div>
      )}

      {isRoundTrip && returnFlights && returnFlights.length > 0 && (
        <>
          <h3 className="text-xl font-semibold text-gray-800 mt-8">Return Flights</h3>
          <div className="space-y-4">
            {filteredSortedReturnFlights.length > 0 ? (
              filteredSortedReturnFlights.map((flight) => (
                <FlightCard key={flight.id} flight={flight} isReturn={true} />
              ))
            ) : (
              <div className="bg-white p-4 rounded-lg shadow text-center">
                <p className="text-gray-500">No return flights match your filters. Please adjust your criteria.</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default FlightResults;
