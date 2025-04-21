import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const airports = [
  { code: 'JFK', name: 'New York' },
  { code: 'LHR', name: 'London' },
  { code: 'CDG', name: 'Paris' },
  { code: 'HND', name: 'Tokyo' },
  { code: 'DXB', name: 'Dubai' },
  { code: 'SYD', name: 'Sydney' },
  { code: 'LAX', name: 'Los Angeles' },
  { code: 'SIN', name: 'Singapore' },
];

const SearchForm = ({ onSearch }) => {
  const [tripType, setTripType] = useState('one-way');
  const { register, handleSubmit, formState: { errors }, watch } = useForm({
    defaultValues: {
      origin: '',
      destination: '',
      departure_date: '',
      return_date: '',
      passengers: 1,
    }
  });

  const watchOrigin = watch('origin');
  
  const onSubmit = (data) => {
    const searchParams = {
      origin: data.origin,
      destination: data.destination,
      departure_date: data.departure_date,
      passengers: data.passengers,
      ...(tripType === 'round-trip' && { return_date: data.return_date }),
    };
    
    onSearch(searchParams);
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <div className="flex space-x-4 mb-4">
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio text-blue-600"
            name="trip-type"
            value="one-way"
            checked={tripType === 'one-way'}
            onChange={() => setTripType('one-way')}
          />
          <span className="ml-2">One Way</span>
        </label>
        <label className="inline-flex items-center">
          <input
            type="radio"
            className="form-radio text-blue-600"
            name="trip-type"
            value="round-trip"
            checked={tripType === 'round-trip'}
            onChange={() => setTripType('round-trip')}
          />
          <span className="ml-2">Round Trip</span>
        </label>
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="col-span-1">
            <label htmlFor="origin" className="block text-sm font-medium text-gray-700">From</label>
            <select
              id="origin"
              {...register('origin', { required: 'Origin is required' })}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select origin</option>
              {airports.map((airport) => (
                <option key={airport.code} value={airport.name}>{airport.name} ({airport.code})</option>
              ))}
            </select>
            {errors.origin && <p className="mt-1 text-sm text-red-600">{errors.origin.message}</p>}
          </div>

          <div className="col-span-1">
            <label htmlFor="destination" className="block text-sm font-medium text-gray-700">To</label>
            <select
              id="destination"
              {...register('destination', { 
                required: 'Destination is required',
                validate: value => value !== watchOrigin || 'Origin and destination cannot be the same'
              })}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              <option value="">Select destination</option>
              {airports.map((airport) => (
                <option key={airport.code} value={airport.name}>{airport.name} ({airport.code})</option>
              ))}
            </select>
            {errors.destination && <p className="mt-1 text-sm text-red-600">{errors.destination.message}</p>}
          </div>

          <div className="col-span-1">
            <label htmlFor="departure_date" className="block text-sm font-medium text-gray-700">Departure Date</label>
            <input
              type="date"
              id="departure_date"
              {...register('departure_date', { required: 'Departure date is required' })}
              min={new Date().toISOString().split('T')[0]}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            />
            {errors.departure_date && <p className="mt-1 text-sm text-red-600">{errors.departure_date.message}</p>}
          </div>

          {tripType === 'round-trip' && (
            <div className="col-span-1">
              <label htmlFor="return_date" className="block text-sm font-medium text-gray-700">Return Date</label>
              <input
                type="date"
                id="return_date"
                {...register('return_date', { required: tripType === 'round-trip' ? 'Return date is required' : false })}
                min={watch('departure_date') || new Date().toISOString().split('T')[0]}
                className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
              {errors.return_date && <p className="mt-1 text-sm text-red-600">{errors.return_date.message}</p>}
            </div>
          )}

          <div className={`col-span-1 ${tripType === 'one-way' ? 'md:col-span-2 lg:col-span-1' : ''}`}>
            <label htmlFor="passengers" className="block text-sm font-medium text-gray-700">Passengers</label>
            <select
              id="passengers"
              {...register('passengers', { required: 'Number of passengers is required' })}
              className="mt-1 block w-full py-2 px-3 border border-gray-300 bg-white rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
            >
              {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                <option key={num} value={num}>{num} {num === 1 ? 'Passenger' : 'Passengers'}</option>
              ))}
            </select>
            {errors.passengers && <p className="mt-1 text-sm text-red-600">{errors.passengers.message}</p>}
          </div>

          <div className={`col-span-1 md:col-span-2 ${tripType === 'round-trip' ? 'lg:col-span-1' : 'lg:col-span-2'} flex items-end`}>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Search Flights
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default SearchForm;
