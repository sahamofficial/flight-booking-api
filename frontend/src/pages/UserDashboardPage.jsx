import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Dashboard from '../components/User/Dashboard';
import BookingDetails from '../components/User/BookingDetails';
import { getUserBookings, cancelBooking } from '../api/api';
import { useAuth } from '../context/AuthContext';

const UserDashboardPage = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isCancelling, setIsCancelling] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookings = async () => {
      try {
        setIsLoading(true);
        const response = await getUserBookings();
        setBookings(response.data.bookings);
      } catch (err) {
        console.error('Error fetching bookings:', err);
        setError('Failed to load your bookings. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookings();
  }, []);

  const handleCancelBooking = async (bookingId) => {
    if (window.confirm('Are you sure you want to cancel this booking? This action cannot be undone.')) {
      try {
        setIsCancelling(true);
        await cancelBooking(bookingId);
        
        // Update bookings list
        const updatedBookings = bookings.map(booking => {
          if (booking.id === bookingId) {
            return { ...booking, status: 'cancelled' };
          }
          return booking;
        });
        
        setBookings(updatedBookings);
        
        // Update selected booking if it's currently being viewed
        if (selectedBooking && selectedBooking.id === bookingId) {
          setSelectedBooking({ ...selectedBooking, status: 'cancelled' });
        }
      } catch (err) {
        console.error('Error cancelling booking:', err);
        setError(err.response?.data?.message || 'Failed to cancel booking. Please try again.');
      } finally {
        setIsCancelling(false);
      }
    }
  };

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {error && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6">
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

        {selectedBooking ? (
          <div>
            <button
              onClick={() => setSelectedBooking(null)}
              className="inline-flex items-center mb-6 text-sm text-blue-600 hover:text-blue-800"
            >
              <svg className="h-5 w-5 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
              </svg>
              Back to My Bookings
            </button>
            
            <BookingDetails 
              booking={selectedBooking} 
              onCancelBooking={handleCancelBooking} 
              isLoading={isCancelling} 
            />
          </div>
        ) : (
          <Dashboard 
            bookings={bookings} 
            isLoading={isLoading}
            onCancelBooking={handleCancelBooking}
          />
        )}
      </div>
    </div>
  );
};

export default UserDashboardPage;
