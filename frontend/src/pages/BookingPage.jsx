import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import BookingForm from '../components/Booking/BookingForm';
import { getFlightById, createBooking } from '../api/api';
import { useAuth } from '../context/AuthContext';

const BookingPage = () => {
  const { flightId } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [flight, setFlight] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchFlightDetails = async () => {
      try {
        setIsLoading(true);
        const response = await getFlightById(flightId);
        setFlight(response.data.flight);
      } catch (err) {
        console.error('Error fetching flight details:', err);
        setError('Failed to load flight details. Please try again.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchFlightDetails();
  }, [flightId]);

  const handleSubmit = async (bookingData) => {
    try {
      setIsSubmitting(true);
      setError(null);
      
      const response = await createBooking(bookingData);
      const newBookingId = response.data.booking.id;
      
      // Redirect to payment page
      navigate(`/payment/${newBookingId}`);
    } catch (err) {
      console.error('Error creating booking:', err);
      setError(err.response?.data?.message || 'Failed to create booking. Please try again.');
      setIsSubmitting(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading flight details...</p>
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
                  onClick={() => navigate('/search')}
                  className="bg-red-100 px-2 py-1 rounded-md text-sm font-medium text-red-800 hover:bg-red-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Return to Flight Search
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!flight) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 text-center">
        <h2 className="text-3xl font-extrabold text-gray-900">Flight Not Found</h2>
        <p className="mt-4 text-lg text-gray-500">
          The flight you're looking for doesn't exist or has been removed.
        </p>
        <div className="mt-6">
          <button
            onClick={() => navigate('/search')}
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700"
          >
            Search for Flights
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Book Your Flight</h1>
          <p className="mt-2 text-gray-600">Complete your booking details</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <BookingForm 
              flight={flight} 
              onSubmit={handleSubmit} 
              isLoading={isSubmitting} 
            />
          </div>
          
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow overflow-hidden sticky top-8">
              <div className="bg-blue-600 px-4 py-5 sm:px-6">
                <h2 className="text-xl font-bold text-white">Flight Summary</h2>
              </div>
              <div className="px-4 py-5 sm:p-6">
                <div className="flex items-center mb-4">
                  <div className="w-10 h-10 flex items-center justify-center bg-blue-100 rounded-full">
                    <span className="font-bold text-blue-700">{flight.airline.code}</span>
                  </div>
                  <div className="ml-3">
                    <h3 className="text-lg font-medium text-gray-900">{flight.airline.name}</h3>
                    <p className="text-sm text-gray-500">Flight {flight.flight_number}</p>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <div className="flex justify-between">
                    <div>
                      <p className="text-sm text-gray-500">Departure</p>
                      <p className="text-base font-semibold">
                        {new Date(flight.departure_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <p className="text-sm font-medium">{flight.origin}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(flight.departure_time).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-gray-500">Arrival</p>
                      <p className="text-base font-semibold">
                        {new Date(flight.arrival_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                      </p>
                      <p className="text-sm font-medium">{flight.destination}</p>
                      <p className="text-xs text-gray-500">
                        {new Date(flight.arrival_time).toLocaleDateString([], { weekday: 'short', month: 'short', day: 'numeric' })}
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="border-t border-gray-200 pt-4 mb-4">
                  <h3 className="text-base font-medium text-gray-900 mb-2">Pricing</h3>
                  <div className="flex justify-between text-sm">
                    <span>Base fare (without meal)</span>
                    <span>${flight.price_without_meal}</span>
                  </div>
                  <div className="flex justify-between text-sm mt-1">
                    <span>With meal option</span>
                    <span>${flight.price_with_meal}</span>
                  </div>
                </div>
                
                {flight.transits && flight.transits.length > 0 && (
                  <div className="border-t border-gray-200 pt-4 mb-4">
                    <h3 className="text-base font-medium text-gray-900 mb-2">Transit Information</h3>
                    {flight.transits.map((transit, index) => (
                      <div key={transit.id} className="mb-2 last:mb-0">
                        <p className="text-sm font-medium">{transit.location}</p>
                        <p className="text-xs text-gray-500">
                          Layover: {Math.round((new Date(transit.departure_time) - new Date(transit.arrival_time)) / (1000 * 60))} minutes
                        </p>
                      </div>
                    ))}
                  </div>
                )}
                
                <div className="border-t border-gray-200 pt-4">
                  <h3 className="text-base font-medium text-gray-900 mb-2">Need Help?</h3>
                  <p className="text-sm text-gray-600 mb-4">
                    If you need assistance with your booking, please contact our customer service team.
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Phone:</span> 1-800-JETAIR
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Email:</span> support@jetair.com
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
