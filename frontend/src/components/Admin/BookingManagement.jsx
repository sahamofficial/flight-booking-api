import React, { useState } from 'react';
import { format } from 'date-fns';

const BookingManagement = ({ bookings, isLoading }) => {
  const [filterStatus, setFilterStatus] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [viewingBooking, setViewingBooking] = useState(null);
  
  // Filter bookings
  const filteredBookings = bookings.filter(booking => {
    // Filter by status
    if (filterStatus !== 'all' && booking.status !== filterStatus) {
      return false;
    }
    
    // Filter by search query (reference or passenger name)
    if (searchQuery) {
      const reference = booking.booking_reference.toLowerCase();
      const hasMatchingPassenger = booking.passenger_details.some(
        passenger => passenger.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      const route = `${booking.flight.origin} ${booking.flight.destination}`.toLowerCase();
      
      if (!reference.includes(searchQuery.toLowerCase()) && 
          !hasMatchingPassenger && 
          !route.includes(searchQuery.toLowerCase())) {
        return false;
      }
    }
    
    return true;
  });
  
  if (isLoading) {
    return (
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading booking data...</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="px-6 py-4 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <h3 className="text-lg font-medium text-gray-900 mb-4 md:mb-0">All Bookings</h3>
          <div className="flex flex-col md:flex-row space-y-3 md:space-y-0 md:space-x-4">
            <div>
              <input
                type="text"
                placeholder="Search by reference, passenger or route"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              />
            </div>
            <div>
              <select
                value={filterStatus}
                onChange={(e) => setFilterStatus(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              >
                <option value="all">All Statuses</option>
                <option value="pending">Pending</option>
                <option value="confirmed">Confirmed</option>
                <option value="cancelled">Cancelled</option>
              </select>
            </div>
          </div>
        </div>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Reference
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                User
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Flight
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Status
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Payment
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => {
                const departureDate = new Date(booking.flight.departure_time);
                
                return (
                  <tr key={booking.id}>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{booking.booking_reference}</div>
                      <div className="text-sm text-gray-500">
                        {booking.passenger_count} passenger{booking.passenger_count > 1 ? 's' : ''}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">{booking.user.name}</div>
                      <div className="text-sm text-gray-500">{booking.user.email}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {booking.flight.airline.name} {booking.flight.flight_number}
                      </div>
                      <div className="text-sm text-gray-500">
                        {booking.flight.origin} → {booking.flight.destination}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm text-gray-900">{format(departureDate, 'dd MMM yyyy')}</div>
                      <div className="text-sm text-gray-500">{format(departureDate, 'h:mm a')}</div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full ${
                        booking.status === 'confirmed'
                          ? 'bg-green-100 text-green-800'
                          : booking.status === 'cancelled'
                          ? 'bg-red-100 text-red-800'
                          : 'bg-yellow-100 text-yellow-800'
                      }`}>
                        {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {booking.payment ? (
                        <div>
                          <div className="text-sm font-medium text-gray-900 capitalize">
                            {booking.payment.payment_method.replace('_', ' ')}
                          </div>
                          <div className="text-sm text-gray-500">${parseFloat(booking.total_cost).toFixed(2)}</div>
                        </div>
                      ) : (
                        <span className="text-sm text-gray-500">No payment</span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                      <button
                        onClick={() => setViewingBooking(booking)}
                        className="text-blue-600 hover:text-blue-900"
                      >
                        View Details
                      </button>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-4 text-center text-gray-500">
                  No bookings found matching your criteria
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      {/* Booking Details Modal */}
      {viewingBooking && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
              <h3 className="text-lg font-medium text-gray-900">Booking Details: {viewingBooking.booking_reference}</h3>
              <button
                onClick={() => setViewingBooking(null)}
                className="text-gray-400 hover:text-gray-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">Booking Information</h4>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Status</p>
                        <p className="font-medium capitalize">{viewingBooking.status}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Created</p>
                        <p className="font-medium">{format(new Date(viewingBooking.created_at), 'dd MMM yyyy, h:mm a')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Total Cost</p>
                        <p className="font-medium">${parseFloat(viewingBooking.total_cost).toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Meal Option</p>
                        <p className="font-medium">{viewingBooking.meal_option ? 'With Meal' : 'Without Meal'}</p>
                      </div>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">User Information</h4>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Name</p>
                        <p className="font-medium">{viewingBooking.user.name}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Email</p>
                        <p className="font-medium">{viewingBooking.user.email}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Phone</p>
                        <p className="font-medium">{viewingBooking.user.phone}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">User ID</p>
                        <p className="font-medium">{viewingBooking.user.id}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">Flight Information</h4>
                <div className="bg-gray-50 p-4 rounded-md">
                  <div className="flex items-center mb-4">
                    <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full">
                      <span className="font-bold text-blue-700">{viewingBooking.flight.airline.code}</span>
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{viewingBooking.flight.airline.name} {viewingBooking.flight.flight_number}</p>
                      <p className="text-sm text-gray-500">
                        {format(new Date(viewingBooking.flight.departure_time), 'dd MMM yyyy, h:mm a')}
                      </p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div>
                      <p className="text-xs text-gray-500">From</p>
                      <p className="font-medium">{viewingBooking.flight.origin}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">To</p>
                      <p className="font-medium">{viewingBooking.flight.destination}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500">Arrival</p>
                      <p className="font-medium">
                        {format(new Date(viewingBooking.flight.arrival_time), 'dd MMM yyyy, h:mm a')}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">Passenger Details</h4>
                <div className="space-y-3">
                  {viewingBooking.passenger_details.map((passenger, index) => (
                    <div key={index} className="bg-gray-50 p-4 rounded-md">
                      <p className="font-medium">Passenger {index + 1}: {passenger.name}</p>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-2 mt-2">
                        <p className="text-sm text-gray-600">Email: {passenger.email}</p>
                        <p className="text-sm text-gray-600">Phone: {passenger.phone}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
              
              {viewingBooking.payment && (
                <div>
                  <h4 className="text-sm font-medium text-gray-500 uppercase mb-2">Payment Information</h4>
                  <div className="bg-gray-50 p-4 rounded-md">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <p className="text-xs text-gray-500">Payment Method</p>
                        <p className="font-medium capitalize">{viewingBooking.payment.payment_method.replace('_', ' ')}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Transaction ID</p>
                        <p className="font-medium">{viewingBooking.payment.transaction_id || 'N/A'}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Status</p>
                        <p className="font-medium capitalize">{viewingBooking.payment.status}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Amount</p>
                        <p className="font-medium">${parseFloat(viewingBooking.payment.amount).toFixed(2)}</p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Date</p>
                        <p className="font-medium">{format(new Date(viewingBooking.payment.created_at), 'dd MMM yyyy, h:mm a')}</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="px-6 py-4 border-t border-gray-200 flex justify-end">
              <button
                onClick={() => setViewingBooking(null)}
                className="btn btn-secondary"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BookingManagement;
