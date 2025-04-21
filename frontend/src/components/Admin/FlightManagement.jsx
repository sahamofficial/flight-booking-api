import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { format } from 'date-fns';

const FlightManagement = ({ flights, airlines, isLoading, onAddFlight, onUpdateFlight, onDeleteFlight }) => {
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingFlight, setEditingFlight] = useState(null);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingFlight, setDeletingFlight] = useState(null);
  
  const { register, handleSubmit, formState: { errors }, reset, setValue } = useForm();
  
  const openAddModal = () => {
    reset({
      airline_id: '',
      flight_number: '',
      origin: '',
      destination: '',
      departure_time: '',
      arrival_time: '',
      price_without_meal: '',
      price_with_meal: '',
      total_seats: '',
      available_seats: ''
    });
    setShowAddModal(true);
  };
  
  const openEditModal = (flight) => {
    setEditingFlight(flight);
    setValue('airline_id', flight.airline_id);
    setValue('flight_number', flight.flight_number);
    setValue('origin', flight.origin);
    setValue('destination', flight.destination);
    setValue('departure_time', format(new Date(flight.departure_time), "yyyy-MM-dd'T'HH:mm"));
    setValue('arrival_time', format(new Date(flight.arrival_time), "yyyy-MM-dd'T'HH:mm"));
    setValue('price_without_meal', flight.price_without_meal);
    setValue('price_with_meal', flight.price_with_meal);
    setValue('total_seats', flight.total_seats);
    setValue('available_seats', flight.available_seats);
  };
  
  const openDeleteModal = (flight) => {
    setDeletingFlight(flight);
    setShowDeleteModal(true);
  };
  
  const handleAddSubmit = (data) => {
    onAddFlight(data);
    setShowAddModal(false);
  };
  
  const handleEditSubmit = (data) => {
    onUpdateFlight(editingFlight.id, data);
    setEditingFlight(null);
  };
  
  const handleDelete = () => {
    onDeleteFlight(deletingFlight.id);
    setShowDeleteModal(false);
    setDeletingFlight(null);
  };
  
  const closeModals = () => {
    setShowAddModal(false);
    setEditingFlight(null);
    setShowDeleteModal(false);
    setDeletingFlight(null);
  };
  
  if (isLoading) {
    return (
      <div className="text-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500 mx-auto"></div>
        <p className="mt-4 text-gray-600">Loading flight data...</p>
      </div>
    );
  }
  
  return (
    <div>
      <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center">
        <h3 className="text-lg font-medium text-gray-900">All Flights</h3>
        <button
          onClick={openAddModal}
          className="bg-blue-600 text-white py-2 px-4 rounded-md text-sm font-medium hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Add New Flight
        </button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Airline
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Flight Number
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Route
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date & Time
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Pricing
              </th>
              <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Seats
              </th>
              <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {flights.map((flight) => {
              const departureDate = new Date(flight.departure_time);
              const arrivalDate = new Date(flight.arrival_time);
              
              return (
                <tr key={flight.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10 flex items-center justify-center bg-blue-100 rounded-full">
                        <span className="text-blue-700 font-semibold">{flight.airline.code}</span>
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {flight.airline.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{flight.flight_number}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{flight.origin} → {flight.destination}</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">{format(departureDate, 'dd MMM yyyy')}</div>
                    <div className="text-sm text-gray-500">
                      {format(departureDate, 'h:mm a')} - {format(arrivalDate, 'h:mm a')}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">${flight.price_without_meal} / ${flight.price_with_meal}</div>
                    <div className="text-xs text-gray-500">Without / With Meal</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {flight.available_seats} / {flight.total_seats}
                    </div>
                    <div className="text-xs text-gray-500">Available / Total</div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button
                      onClick={() => openEditModal(flight)}
                      className="text-blue-600 hover:text-blue-900 mr-4"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => openDeleteModal(flight)}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      
      {/* Add Flight Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Add New Flight</h3>
            </div>
            <form onSubmit={handleSubmit(handleAddSubmit)} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="airline_id" className="form-label">Airline</label>
                  <select
                    id="airline_id"
                    {...register('airline_id', { required: 'Airline is required' })}
                    className="form-input"
                  >
                    <option value="">Select Airline</option>
                    {airlines.map(airline => (
                      <option key={airline.id} value={airline.id}>
                        {airline.name} ({airline.code})
                      </option>
                    ))}
                  </select>
                  {errors.airline_id && <p className="form-error">{errors.airline_id.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="flight_number" className="form-label">Flight Number</label>
                  <input
                    id="flight_number"
                    type="text"
                    {...register('flight_number', { required: 'Flight number is required' })}
                    className="form-input"
                  />
                  {errors.flight_number && <p className="form-error">{errors.flight_number.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="origin" className="form-label">Origin</label>
                  <input
                    id="origin"
                    type="text"
                    {...register('origin', { required: 'Origin is required' })}
                    className="form-input"
                  />
                  {errors.origin && <p className="form-error">{errors.origin.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="destination" className="form-label">Destination</label>
                  <input
                    id="destination"
                    type="text"
                    {...register('destination', { required: 'Destination is required' })}
                    className="form-input"
                  />
                  {errors.destination && <p className="form-error">{errors.destination.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="departure_time" className="form-label">Departure Time</label>
                  <input
                    id="departure_time"
                    type="datetime-local"
                    {...register('departure_time', { required: 'Departure time is required' })}
                    className="form-input"
                  />
                  {errors.departure_time && <p className="form-error">{errors.departure_time.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="arrival_time" className="form-label">Arrival Time</label>
                  <input
                    id="arrival_time"
                    type="datetime-local"
                    {...register('arrival_time', { required: 'Arrival time is required' })}
                    className="form-input"
                  />
                  {errors.arrival_time && <p className="form-error">{errors.arrival_time.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="price_without_meal" className="form-label">Price Without Meal ($)</label>
                  <input
                    id="price_without_meal"
                    type="number"
                    step="0.01"
                    {...register('price_without_meal', { 
                      required: 'Price without meal is required',
                      min: { value: 0, message: 'Price must be positive' }
                    })}
                    className="form-input"
                  />
                  {errors.price_without_meal && <p className="form-error">{errors.price_without_meal.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="price_with_meal" className="form-label">Price With Meal ($)</label>
                  <input
                    id="price_with_meal"
                    type="number"
                    step="0.01"
                    {...register('price_with_meal', { 
                      required: 'Price with meal is required',
                      min: { value: 0, message: 'Price must be positive' }
                    })}
                    className="form-input"
                  />
                  {errors.price_with_meal && <p className="form-error">{errors.price_with_meal.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="total_seats" className="form-label">Total Seats</label>
                  <input
                    id="total_seats"
                    type="number"
                    {...register('total_seats', { 
                      required: 'Total seats is required',
                      min: { value: 1, message: 'Must have at least 1 seat' }
                    })}
                    className="form-input"
                  />
                  {errors.total_seats && <p className="form-error">{errors.total_seats.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="available_seats" className="form-label">Available Seats</label>
                  <input
                    id="available_seats"
                    type="number"
                    {...register('available_seats', { 
                      required: 'Available seats is required',
                      min: { value: 0, message: 'Cannot be negative' }
                    })}
                    className="form-input"
                  />
                  {errors.available_seats && <p className="form-error">{errors.available_seats.message}</p>}
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModals}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Add Flight
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Edit Flight Modal */}
      {editingFlight && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div className="px-6 py-4 border-b border-gray-200">
              <h3 className="text-lg font-medium text-gray-900">Edit Flight</h3>
            </div>
            <form onSubmit={handleSubmit(handleEditSubmit)} className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="airline_id" className="form-label">Airline</label>
                  <select
                    id="airline_id"
                    {...register('airline_id', { required: 'Airline is required' })}
                    className="form-input"
                  >
                    <option value="">Select Airline</option>
                    {airlines.map(airline => (
                      <option key={airline.id} value={airline.id}>
                        {airline.name} ({airline.code})
                      </option>
                    ))}
                  </select>
                  {errors.airline_id && <p className="form-error">{errors.airline_id.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="flight_number" className="form-label">Flight Number</label>
                  <input
                    id="flight_number"
                    type="text"
                    {...register('flight_number', { required: 'Flight number is required' })}
                    className="form-input"
                  />
                  {errors.flight_number && <p className="form-error">{errors.flight_number.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="origin" className="form-label">Origin</label>
                  <input
                    id="origin"
                    type="text"
                    {...register('origin', { required: 'Origin is required' })}
                    className="form-input"
                  />
                  {errors.origin && <p className="form-error">{errors.origin.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="destination" className="form-label">Destination</label>
                  <input
                    id="destination"
                    type="text"
                    {...register('destination', { required: 'Destination is required' })}
                    className="form-input"
                  />
                  {errors.destination && <p className="form-error">{errors.destination.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="departure_time" className="form-label">Departure Time</label>
                  <input
                    id="departure_time"
                    type="datetime-local"
                    {...register('departure_time', { required: 'Departure time is required' })}
                    className="form-input"
                  />
                  {errors.departure_time && <p className="form-error">{errors.departure_time.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="arrival_time" className="form-label">Arrival Time</label>
                  <input
                    id="arrival_time"
                    type="datetime-local"
                    {...register('arrival_time', { required: 'Arrival time is required' })}
                    className="form-input"
                  />
                  {errors.arrival_time && <p className="form-error">{errors.arrival_time.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="price_without_meal" className="form-label">Price Without Meal ($)</label>
                  <input
                    id="price_without_meal"
                    type="number"
                    step="0.01"
                    {...register('price_without_meal', { 
                      required: 'Price without meal is required',
                      min: { value: 0, message: 'Price must be positive' }
                    })}
                    className="form-input"
                  />
                  {errors.price_without_meal && <p className="form-error">{errors.price_without_meal.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="price_with_meal" className="form-label">Price With Meal ($)</label>
                  <input
                    id="price_with_meal"
                    type="number"
                    step="0.01"
                    {...register('price_with_meal', { 
                      required: 'Price with meal is required',
                      min: { value: 0, message: 'Price must be positive' }
                    })}
                    className="form-input"
                  />
                  {errors.price_with_meal && <p className="form-error">{errors.price_with_meal.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="total_seats" className="form-label">Total Seats</label>
                  <input
                    id="total_seats"
                    type="number"
                    {...register('total_seats', { 
                      required: 'Total seats is required',
                      min: { value: 1, message: 'Must have at least 1 seat' }
                    })}
                    className="form-input"
                  />
                  {errors.total_seats && <p className="form-error">{errors.total_seats.message}</p>}
                </div>
                
                <div>
                  <label htmlFor="available_seats" className="form-label">Available Seats</label>
                  <input
                    id="available_seats"
                    type="number"
                    {...register('available_seats', { 
                      required: 'Available seats is required',
                      min: { value: 0, message: 'Cannot be negative' }
                    })}
                    className="form-input"
                  />
                  {errors.available_seats && <p className="form-error">{errors.available_seats.message}</p>}
                </div>
              </div>
              
              <div className="mt-6 flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={closeModals}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary"
                >
                  Update Flight
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      
      {/* Delete Confirmation Modal */}
      {showDeleteModal && deletingFlight && (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Confirm Delete</h3>
            <p className="text-gray-600 mb-6">
              Are you sure you want to delete flight {deletingFlight.flight_number} from {deletingFlight.origin} to {deletingFlight.destination}? This action cannot be undone.
            </p>
            <div className="flex justify-end space-x-3">
              <button
                type="button"
                onClick={closeModals}
                className="btn btn-secondary"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleDelete}
                className="btn btn-danger"
              >
                Delete Flight
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FlightManagement;
