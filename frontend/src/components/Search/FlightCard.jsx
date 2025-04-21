import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const FlightCard = ({ flight, isReturn }) => {
  const [showDetails, setShowDetails] = useState(false);
  
  // Format dates
  const departureTime = new Date(flight.departure_time);
  const arrivalTime = new Date(flight.arrival_time);
  
  // Calculate duration in hours and minutes
  const durationMinutes = Math.round((arrivalTime - departureTime) / (1000 * 60));
  const hours = Math.floor(durationMinutes / 60);
  const minutes = durationMinutes % 60;
  
  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="p-4">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4">
          <div className="flex items-center mb-2 sm:mb-0">
            <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full">
              <span className="font-bold text-blue-700">{flight.airline.code}</span>
            </div>
            <div className="ml-3">
              <h3 className="text-lg font-semibold text-gray-900">{flight.airline.name}</h3>
              <p className="text-sm text-gray-500">Flight {flight.flight_number}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-lg font-bold text-blue-600">${flight.price_without_meal}</p>
            <p className="text-sm text-gray-500">per person</p>
          </div>
        </div>
        
        <div className="flex flex-col md:flex-row justify-between">
          <div className="flex-1">
            <div className="flex items-center">
              <div className="text-center mr-4">
                <p className="text-xl font-bold">{format(departureTime, 'HH:mm')}</p>
                <p className="text-sm text-gray-500">{format(departureTime, 'dd MMM')}</p>
              </div>
              <div className="flex-1 px-4">
                <div className="relative">
                  <div className="flex items-center">
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                    <div className="flex-1 mx-2 border-t-2 border-gray-300 border-dashed"></div>
                    <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                  </div>
                  <div className="absolute top-4 left-0 right-0 text-center">
                    <span className="text-xs bg-white px-2 text-gray-500">{hours}h {minutes}m</span>
                  </div>
                </div>
              </div>
              <div className="text-center">
                <p className="text-xl font-bold">{format(arrivalTime, 'HH:mm')}</p>
                <p className="text-sm text-gray-500">{format(arrivalTime, 'dd MMM')}</p>
              </div>
            </div>
            <div className="flex justify-between mt-2">
              <p className="text-sm font-medium text-gray-600">{flight.origin}</p>
              <p className="text-sm font-medium text-gray-600">{flight.destination}</p>
            </div>
          </div>
          
          <div className="mt-4 md:mt-0 md:ml-6 flex flex-col justify-center items-start md:items-end">
            <button
              onClick={() => setShowDetails(!showDetails)}
              className="text-blue-600 hover:text-blue-800 text-sm font-medium flex items-center"
            >
              {showDetails ? 'Hide Details' : 'View Details'}
              <svg className={`ml-1 h-4 w-4 transform transition-transform ${showDetails ? 'rotate-180' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>
            
            <Link
              to={`/booking/${flight.id}`}
              className="mt-3 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm font-medium"
            >
              Select
            </Link>
          </div>
        </div>
      </div>
      
      {showDetails && (
        <div className="bg-gray-50 p-4 border-t border-gray-200">
          <div className="mb-4">
            <h4 className="text-sm font-medium text-gray-900 mb-2">Flight Details</h4>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-xs text-gray-500">Aircraft</p>
                <p className="text-sm font-medium">Boeing 737</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Distance</p>
                <p className="text-sm font-medium">1,453 miles</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Available Seats</p>
                <p className="text-sm font-medium">{flight.available_seats} / {flight.total_seats}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Meal Price</p>
                <p className="text-sm font-medium">+${(flight.price_with_meal - flight.price_without_meal).toFixed(2)}</p>
              </div>
            </div>
          </div>
          
          {flight.transits && flight.transits.length > 0 && (
            <div>
              <h4 className="text-sm font-medium text-gray-900 mb-2">Transits</h4>
              <div className="space-y-3">
                {flight.transits.map((transit, index) => (
                  <div key={transit.id} className="flex items-start">
                    <div className="w-6 h-6 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-xs font-medium text-blue-700">{index + 1}</span>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm font-medium">{transit.location}</p>
                      <p className="text-xs text-gray-500">
                        {format(new Date(transit.arrival_time), 'HH:mm')} - {format(new Date(transit.departure_time), 'HH:mm')}
                        {' • '}Terminal {transit.terminal}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default FlightCard;
