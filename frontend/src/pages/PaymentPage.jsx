import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PaymentForm from '../components/Booking/PaymentForm';
import { getBookingById, processPayment } from '../api/api';
import { useAuth } from '../context/AuthContext';

const PaymentPage = () => {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [booking, setBooking] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBookingDetails = async () => {
      try {
        setIsLoading(true);
        const response = await getBookingById(bookingId);
        setBooking(response.data.booking);
        
        // If booking is already paid, redirect to confirmation
        if (response.data.booking.payment && 
            response.data.booking.payment.status === 'completed') {
          navigate(`/confirmation/${bookingId}`);
        }
      } catch (err) {
        console.error('Error fetching booking details:', err);
        setError('Failed to load booking details. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBookingDetails();
  }, [bookingId, navigate]);

  const handleSubmit = async (paymentData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      await processPayment(paymentData);
      
      // Redirect to confirmation page
      navigate(`/confirmation/${bookingId}`);
    } catch (err) {
      console.error('Error processing payment:', err);
      setError(err.response?.data?.message || 'Failed to process payment. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading payment details...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-red-50 border-l-4 border-red-500 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <svg className="h-5 w-5 text-red-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
              <div className="mt-4">
                <button
                  onClick={() => navigate('/dashboard')}
                  className="bg-red-100 px-2 py-1 rounded-md text-sm font-medium text-red-800 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Return to Dashboard
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Booking Not Found</h2>
        <p className="mt-4 text-lg text-gray-500">
          The booking you're looking for doesn't exist or has been removed.
        </p>
        <div className="mt-6">
          <button
            onClick={() => navigate('/dashboard')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Complete Your Payment</h1>
          <p className="mt-2 text-gray-600">Secure your booking by completing the payment process</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <PaymentForm 
              booking={booking} 
              onSubmit={handleSubmit} 
              isLoading={isSubmitting} 
            />
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow overflow-hidden sticky top-8">
              <div className="bg-blue-600 px-4 py-5 sm:px-6">
                <h2 className="text-xl font-bold text-white">Booking Summary</h2>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Booking Reference</p>
                  <p className="text-lg font-bold">{booking.booking_reference}</p>
                </div>
                
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full">
                    <span className="font-bold text-blue-700">{booking.flight.airline.code}</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">{booking.flight.airline.name}</h3>
                    <p className="text-sm text-gray-500">Flight {booking.flight.flight_number}</p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Departure</p>
                      <p className="text-base font-semibold">
                        {new Date(booking.flight.departure_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <p className="text-sm font-medium">{booking.flight.origin}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(booking.flight.departure_time).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Arrival</p>
                      <p className="text-base font-semibold">
                        {new Date(booking.flight.arrival_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <p className="text-sm font-medium">{booking.flight.destination}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(booking.flight.arrival_time).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <h3 className="text-base font-medium text-gray-900 mb-2">Passengers</h3>
                  <p className="text-sm text-gray-600">
                    {booking.passenger_count} {booking.passenger_count === 1 ? 'passenger' : 'passengers'}
                  </p>
                  <div className="mt-2 text-sm text-gray-600">
                    Meal option: <span className="font-medium">{booking.meal_option ? 'Included' : 'Not included'}</span>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-base font-medium text-gray-900 mb-2">Payment Amount</h3>
                  <div className="text-2xl font-bold text-blue-600">
                    ${parseFloat(booking.total_cost).toFixed(2)}
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    This is a one-time payment for your flight booking.
                  </p>
                </div>
                
                <div className="mt-6 bg-blue-50 p-4 rounded-md">
                  <div className="flex items-start">
                    <div className="flex-shrink-0">
                      <svg className="h-5 w-5 text-blue-400" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                      </svg>
                    </div>
                    <div className="ml-3">
                      <p className="text-sm text-blue-700">
                        This is a demonstration website. No actual payment will be processed.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PaymentPage;
