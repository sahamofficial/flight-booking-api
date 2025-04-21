import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';

const BookingConfirmation = ({ booking }) => {
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
  
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="bg-blue-600 text-white p-6">
        <h2 className="text-2xl font-bold">Booking Confirmed!</h2>
        <p className="mt-2">Your flight has been successfully booked and confirmed.</p>
      </div>
      
      <div className="p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="text-sm text-gray-500">Booking Reference</p>
            <p className="text-xl font-bold">{booking.booking_reference}</p>
          </div>
          <div className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-sm font-medium">
            {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
          </div>
        </div>
        
        <div className="border-t border-gray-200 pt-6 mb-6">
          <h3 className="text-lg font-semibold mb-4">Flight Details</h3>
          <div className="flex flex-col md:flex-row justify-between">
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
          <div className="space-y-2">
            <div className="flex justify-between">
              <span className="text-gray-600">Number of Passengers</span>
              <span>{booking.passenger_count}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Meal Option</span>
              <span>{booking.meal_option ? 'With Meal' : 'Without Meal'}</span>
            </div>
            {booking.payment && (
              <div className="flex justify-between">
                <span className="text-gray-600">Payment Method</span>
                <span className="capitalize">{booking.payment.payment_method.replace('_', ' ')}</span>
              </div>
            )}
            <div className="flex justify-between border-t border-gray-200 pt-2 mt-2 font-bold">
              <span>Total Cost</span>
              <span>${parseFloat(booking.total_cost).toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <div className="bg-blue-50 p-6 rounded-md mb-6">
          <h3 className="text-lg font-semibold text-blue-800 mb-2">Important Information</h3>
          <ul className="list-disc pl-5 space-y-1 text-blue-800">
            <li>Please arrive at the airport at least 2 hours before departure for domestic flights, or 3 hours for international flights.</li>
            <li>Carry a valid ID proof along with your booking confirmation.</li>
            <li>Check-in counters usually close 1 hour before departure.</li>
            <li>Baggage allowance: 1 cabin bag (7kg) and 1 check-in bag (23kg).</li>
          </ul>
        </div>
        
        <div className="flex flex-col sm:flex-row justify-between space-y-4 sm:space-y-0 sm:space-x-4">
          <Link
            to="/dashboard"
            className="btn btn-secondary text-center"
          >
            View My Bookings
          </Link>
          <button
            onClick={() => window.print()}
            className="btn btn-primary text-center"
          >
            Print Confirmation
          </button>
        </div>
      </div>
    </div>
  );
};

export default BookingConfirmation;
