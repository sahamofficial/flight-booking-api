import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import BookingHistory from './BookingHistory';

const Dashboard = ({ bookings, isLoading, onCancelBooking }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('upcoming');
  
  if (!user) {
    return (
      <div className="text-center py-10">
        <p className="text-gray-600">Please login to view your dashboard.</p>
        <Link to="/login" className="mt-4 inline-block btn btn-primary">
          Login
        </Link>
      </div>
    );
  }
  
  // Filter bookings by status
  const upcomingBookings = bookings.filter(booking => booking.status === 'confirmed');
  const pastBookings = bookings.filter(booking => 
    booking.status === 'confirmed' && new Date(booking.flight.arrival_time) < new Date()
  );
  const cancelledBookings = bookings.filter(booking => booking.status === 'cancelled');
  
  // Get bookings based on active tab
  const getFilteredBookings = () => {
    switch (activeTab) {
      case 'upcoming':
        return upcomingBookings;
      case 'past':
        return pastBookings;
      case 'cancelled':
        return cancelledBookings;
      default:
        return bookings;
    }
  };
  
  return (
    <div>
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">My Dashboard</h2>
              <p className="mt-1 text-gray-600">Welcome back, {user.name}</p>
            </div>
            <div className="mt-4 sm:mt-0">
              <Link
                to="/search"
                className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="-ml-1 mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M11 17a1 1 0 001.447.894l4-2A1 1 0 0017 15V9.236a1 1 0 00-1.447-.894l-4 2a1 1 0 00-.553.894V17zM15.211 6.276a1 1 0 000-1.788l-4.764-2.382a1 1 0 00-.894 0L4.789 4.488a1 1 0 000 1.788l4.764 2.382a1 1 0 00.894 0l4.764-2.382zM4.447 8.342A1 1 0 003 9.236V15a1 1 0 00.553.894l4 2A1 1 0 009 17v-5.764a1 1 0 00-.553-.894l-4-2z" />
                </svg>
                Book New Flight
              </Link>
            </div>
          </div>
          
          <div className="mt-8">
            <div className="border-b border-gray-200">
              <nav className="-mb-px flex space-x-8">
                <button
                  onClick={() => setActiveTab('upcoming')}
                  className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'upcoming'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Upcoming Bookings
                  <span className="ml-2 py-0.5 px-2 rounded-full text-xs bg-blue-100 text-blue-800">
                    {upcomingBookings.length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('past')}
                  className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'past'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Past Bookings
                  <span className="ml-2 py-0.5 px-2 rounded-full text-xs bg-gray-100 text-gray-800">
                    {pastBookings.length}
                  </span>
                </button>
                <button
                  onClick={() => setActiveTab('cancelled')}
                  className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                    activeTab === 'cancelled'
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Cancelled
                  <span className="ml-2 py-0.5 px-2 rounded-full text-xs bg-red-100 text-red-800">
                    {cancelledBookings.length}
                  </span>
                </button>
              </nav>
            </div>
          </div>
        </div>
        
        <BookingHistory 
          bookings={getFilteredBookings()} 
          isLoading={isLoading} 
          onCancelBooking={onCancelBooking}
          emptyMessage={activeTab === 'upcoming' 
            ? "You don't have any upcoming bookings." 
            : activeTab === 'past' 
              ? "You don't have any past bookings." 
              : "You don't have any cancelled bookings."
          }
        />
      </div>
    </div>
  );
};

export default Dashboard;
