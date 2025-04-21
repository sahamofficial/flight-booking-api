import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const BookingDetails = ({ booking, onCancelBooking, isLoading }) => {
  if (!booking) {
    return (
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading booking details...</p>
      </div>
    );
  }
  
  const departureDate = new Date(booking.flight.departure_time);
  const arrivalDate = new Date(booking.flight.arrival_time);
  const canCancel = booking.status === 'confirmed' && new Date(booking.flight.departure_time) > new Date();
  
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Booking Details</h2>
            <p className="mt-1 text-gray-600">Reference: {booking.booking_reference}</p>
          </div>
          <div className={`mt-2 sm:mt-0 px-3 py-1 rounded-full text-sm font-medium ${
            booking.status === 'confirmed'
              ? 'bg-green-100 text-green-800'
              : booking.status === 'cancelled'
              ? 'bg-red-100 text-red-800'
              : 'bg-yellow-100 text-yellow-800'
          }`}>
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Flight Information</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex flex-col md:flex-row justify-between mb-4">
              <div className="mb-4 md:mb-0">
                <div className="flex items-center">
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full">
                    <span className="font-bold text-blue-700">{booking.flight.airline.code}</span>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">{booking.flight.airline.name}</p>
                    <p className="text-sm text-gray-500">Flight {booking.flight.flight_number}</p>
                  </div>
                </div>
              </div>
              
              <div className="flex-1 max-w-md">
                <div className="flex items-center">
                  <div className="text-center mr-4">
                    <p className="text-lg font-bold">{format(departureDate, 'HH:mm')}</p>
                    <p className="text-sm text-gray-500">{format(departureDate, 'dd MMM')}</p>
                  </div>
                  <div className="flex-1 px-4">
                    <div className="relative">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                        <div className="flex-1 mx-2 border-t-2 border-gray-300 border-dashed"></div>
                        <div className="w-3 h-3 bg-blue-600 rounded-full"></div>
                      </div>
                    </div>
                  </div>
                  <div className="text-center">
                    <p className="text-lg font-bold">{format(arrivalDate, 'HH:mm')}</p>
                    <p className="text-sm text-gray-500">{format(arrivalDate, 'dd MMM')}</p>
                  </div>
                </div>
                <div className="flex justify-between mt-2">
                  <p className="text-sm font-medium">{booking.flight.origin}</p>
                  <p className="text-sm font-medium">{booking.flight.destination}</p>
                </div>
              </div>
            </div>
            
            {booking.flight.transits && booking.flight.transits.length > 0 && (
              <div className="mt-4 border-t border-gray-200 pt-4">
                <h4 className="text-sm font-medium text-gray-900 mb-2">Transits</h4>
                <div className="space-y-3">
                  {booking.flight.transits.map((transit, index) => (
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
        </div>
        
        <div className="border-t border-gray-200 pt-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Passenger Information</h3>
          <div className="space-y-4">
            {booking.passenger_details.map((passenger, index) => (
              <div key={index} className="bg-gray-50 p-4 rounded-md">
                <p className="font-medium">{passenger.name}</p>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                  <p className="text-sm text-gray-600">Email: {passenger.email}</p>
                  <p className="text-sm text-gray-600">Phone: {passenger.phone}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Booking Summary</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-500">Number of Passengers</p>
                <p className="font-medium">{booking.passenger_count}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Meal Option</p>
                <p className="font-medium">{booking.meal_option ? 'With Meal' : 'Without Meal'}</p>
              </div>
              {booking.payment && (
                <>
                  <div>
                    <p className="text-sm text-gray-500">Payment Method</p>
                    <p className="font-medium capitalize">{booking.payment.payment_method.replace('_', ' ')}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Payment Status</p>
                    <p className="font-medium capitalize">{booking.payment.status}</p>
                  </div>
                </>
              )}
              <div className="md:col-span-2">
                <p className="text-sm text-gray-500">Total Cost</p>
                <p className="text-xl font-bold text-blue-600">${parseFloat(booking.total_cost).toFixed(2)}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/dashboard"
            className="btn btn-secondary text-center"
          >
            Back to Dashboard
          </Link>
          
          {canCancel && (
            <button
              onClick={() => onCancelBooking(booking.id)}
              disabled={isLoading}
              className={`btn btn-danger text-center ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Processing...' : 'Cancel Booking'}
            </button>
          )}
          
          <button
            onClick={() => window.print()}
            className="btn btn-primary text-center"
          >
            Print Details
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingDetails;
