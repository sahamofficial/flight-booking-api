import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import FlightManagement from './FlightManagement';
import BookingManagement from './BookingManagement';

const Dashboard = ({ flights, bookings, airlines, isLoading, onAddFlight, onUpdateFlight, onDeleteFlight }) => {
  const { user } = useAuth();
  const [activeTab, setActiveTab] = useState('flights');
  
  if (!user || !user.is_admin) {
    return (
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <div className="p-6 text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h2>
          <p className="text-gray-600">You don't have permission to access the admin dashboard.</p>
        </div>
      </div>
    );
  }
  
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900">Admin Dashboard</h2>
        <p className="mt-1 text-gray-600">Manage flights, bookings, and more</p>
        
        <div className="mt-8">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setActiveTab('flights')}
                className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'flights'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Flight Management
              </button>
              <button
                onClick={() => setActiveTab('bookings')}
                className={`whitespace-nowrap pb-4 px-1 border-b-2 font-medium text-sm ${
                  activeTab === 'bookings'
                    ? 'border-blue-500 text-blue-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Booking Management
              </button>
            </nav>
          </div>
        </div>
      </div>
      
      <div>
        {activeTab === 'flights' && (
          <FlightManagement 
            flights={flights} 
            airlines={airlines}
            isLoading={isLoading} 
            onAddFlight={onAddFlight}
            onUpdateFlight={onUpdateFlight}
            onDeleteFlight={onDeleteFlight}
          />
        )}
        
        {activeTab === 'bookings' && (
          <BookingManagement 
            bookings={bookings} 
            isLoading={isLoading} 
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
