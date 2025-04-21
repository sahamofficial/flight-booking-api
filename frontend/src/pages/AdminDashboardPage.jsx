import React, { useState, useEffect } from 'react';
import Dashboard from '../components/Admin/Dashboard';
import { 
  getAdminFlights, 
  getAdminBookings, 
  getAirlines,
  createFlight,
  updateFlight,
  deleteFlight
} from '../api/api';
import { useAuth } from '../context/AuthContext';

const AdminDashboardPage = () => {
  const { user } = useAuth();
  const [flights, setFlights] = useState([]);
  const [bookings, setBookings] = useState([]);
  const [airlines, setAirlines] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [flightsResponse, bookingsResponse, airlinesResponse] = await Promise.all([
          getAdminFlights(),
          getAdminBookings(),
          getAirlines()
        ]);
        
        setFlights(flightsResponse.data.flights);
        setBookings(bookingsResponse.data.bookings);
        setAirlines(airlinesResponse.data.airlines);
      } catch (err) {
        console.error('Error fetching admin data:', err);
        setError('Failed to load data. Please ensure you have admin privileges.');
      } finally {
        setIsLoading(false);
      }
    };

    if (user && user.is_admin) {
      fetchData();
    }
  }, [user]);

  const handleAddFlight = async (flightData) => {
    try {
      const response = await createFlight(flightData);
      setFlights([...flights, response.data.flight]);
      return true;
    } catch (err) {
      console.error('Error adding flight:', err);
      setError(err.response?.data?.message || 'Failed to add flight. Please try again.');
      return false;
    }
  };

  const handleUpdateFlight = async (id, flightData) => {
    try {
      const response = await updateFlight(id, flightData);
      const updatedFlights = flights.map(flight => 
        flight.id === id ? response.data.flight : flight
      );
      setFlights(updatedFlights);
      return true;
    } catch (err) {
      console.error('Error updating flight:', err);
      setError(err.response?.data?.message || 'Failed to update flight. Please try again.');
      return false;
    }
  };

  const handleDeleteFlight = async (id) => {
    try {
      await deleteFlight(id);
      const filteredFlights = flights.filter(flight => flight.id !== id);
      setFlights(filteredFlights);
      return true;
    } catch (err) {
      console.error('Error deleting flight:', err);
      setError(err.response?.data?.message || 'Failed to delete flight. Please try again.');
      return false;
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
        
        <Dashboard 
          flights={flights} 
          bookings={bookings} 
          airlines={airlines}
          isLoading={isLoading} 
          onAddFlight={handleAddFlight}
          onUpdateFlight={handleUpdateFlight}
          onDeleteFlight={handleDeleteFlight}
        />
      </div>
    </div>
  );
};

export default AdminDashboardPage;
