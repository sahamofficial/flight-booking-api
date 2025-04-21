import React, { useState } from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import MealSelection from './MealSelection';

const BookingForm = ({ flight, onSubmit, isLoading }) => {
  const [step, setStep] = useState(1);
  const [passengers, setPassengers] = useState(1);
  const [mealOption, setMealOption] = useState(false);
  
  const { register, control, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      passengers: [{ name: '', email: '', phone: '' }]
    }
  });
  
  const { fields, append, remove } = useFieldArray({
    control,
    name: "passengers"
  });
  
  const handlePassengerCountChange = (e) => {
    const count = parseInt(e.target.value);
    setPassengers(count);
    
    // Adjust the number of passenger forms
    if (count > fields.length) {
      // Add more passenger forms
      for (let i = fields.length; i < count; i++) {
        append({ name: '', email: '', phone: '' });
      }
    } else if (count < fields.length) {
      // Remove excess passenger forms
      for (let i = fields.length - 1; i >= count; i--) {
        remove(i);
      }
    }
  };
  
  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);
  
  const handleFormSubmit = (data) => {
    const bookingData = {
      flight_id: flight.id,
      meal_option: mealOption,
      passenger_count: passengers,
      passenger_details: data.passengers
    };
    
    onSubmit(bookingData);
  };

  // Calculate total cost
  const pricePerPassenger = mealOption ? flight.price_with_meal : flight.price_without_meal;
  const totalCost = pricePerPassenger * passengers;
  
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Book Your Flight</h2>
        
        {/* Step indicators */}
        <div className="flex mb-8">
          <div className={`flex-1 text-center pb-4 relative ${step >= 1 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400 border-b-2 border-gray-200'}`}>
            <span className={`w-8 h-8 rounded-full inline-flex items-center justify-center ${step >= 1 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>1</span>
            <span className="block mt-2">Passenger Details</span>
          </div>
          <div className={`flex-1 text-center pb-4 relative ${step >= 2 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400 border-b-2 border-gray-200'}`}>
            <span className={`w-8 h-8 rounded-full inline-flex items-center justify-center ${step >= 2 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>2</span>
            <span className="block mt-2">Meal Options</span>
          </div>
          <div className={`flex-1 text-center pb-4 relative ${step >= 3 ? 'text-blue-600 border-b-2 border-blue-600' : 'text-gray-400 border-b-2 border-gray-200'}`}>
            <span className={`w-8 h-8 rounded-full inline-flex items-center justify-center ${step >= 3 ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-600'}`}>3</span>
            <span className="block mt-2">Review & Confirm</span>
          </div>
        </div>
        
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          {/* Step 1: Passenger Details */}
          {step === 1 && (
            <div>
              <div className="mb-6">
                <label htmlFor="passengerCount" className="form-label">Number of Passengers</label>
                <select
                  id="passengerCount"
                  value={passengers}
                  onChange={handlePassengerCountChange}
                  className="form-input"
                >
                  {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(num => (
                    <option key={num} value={num}>
                      {num} {num === 1 ? 'Passenger' : 'Passengers'}
                    </option>
                  ))}
                </select>
              </div>
              
              {fields.map((field, index) => (
                <div key={field.id} className="mb-8 p-4 border border-gray-200 rounded-md">
                  <h3 className="text-lg font-medium mb-4">Passenger {index + 1}</h3>
                  
                  <div className="mb-4">
                    <label className="form-label">Full Name</label>
                    <input
                      type="text"
                      {...register(`passengers.${index}.name`, { 
                        required: 'Name is required' 
                      })}
                      className="form-input"
                    />
                    {errors.passengers?.[index]?.name && (
                      <p className="form-error">{errors.passengers[index].name.message}</p>
                    )}
                  </div>
                  
                  <div className="mb-4">
                    <label className="form-label">Email</label>
                    <input
                      type="email"
                      {...register(`passengers.${index}.email`, { 
                        required: 'Email is required',
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email address'
                        }
                      })}
                      className="form-input"
                    />
                    {errors.passengers?.[index]?.email && (
                      <p className="form-error">{errors.passengers[index].email.message}</p>
                    )}
                  </div>
                  
                  <div>
                    <label className="form-label">Phone Number</label>
                    <input
                      type="tel"
                      {...register(`passengers.${index}.phone`, { 
                        required: 'Phone number is required',
                        pattern: {
                          value: /^[0-9+\-\s()]{8,20}$/,
                          message: 'Please enter a valid phone number'
                        }
                      })}
                      className="form-input"
                    />
                    {errors.passengers?.[index]?.phone && (
                      <p className="form-error">{errors.passengers[index].phone.message}</p>
                    )}
                  </div>
                </div>
              ))}
              
              <div className="mt-6 flex justify-end">
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn btn-primary"
                >
                  Next: Meal Selection
                </button>
              </div>
            </div>
          )}
          
          {/* Step 2: Meal Options */}
          {step === 2 && (
            <div>
              <MealSelection
                withMealPrice={flight.price_with_meal}
                withoutMealPrice={flight.price_without_meal}
                passengerCount={passengers}
                selectedOption={mealOption}
                onSelectOption={setMealOption}
              />
              
              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn btn-secondary"
                >
                  Back: Passenger Details
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="btn btn-primary"
                >
                  Next: Review & Confirm
                </button>
              </div>
            </div>
          )}
          
          {/* Step 3: Review & Confirm */}
          {step === 3 && (
            <div>
              <h3 className="text-xl font-semibold mb-4">Review Your Booking</h3>
              
              <div className="bg-gray-50 p-4 rounded-md mb-6">
                <h4 className="font-medium mb-2">Flight Details</h4>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">Airline</p>
                    <p className="font-medium">{flight.airline.name}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Flight Number</p>
                    <p className="font-medium">{flight.flight_number}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">From</p>
                    <p className="font-medium">{flight.origin}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">To</p>
                    <p className="font-medium">{flight.destination}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Departure</p>
                    <p className="font-medium">{new Date(flight.departure_time).toLocaleString()}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Arrival</p>
                    <p className="font-medium">{new Date(flight.arrival_time).toLocaleString()}</p>
                  </div>
                </div>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium mb-2">Passenger Summary</h4>
                <p>Number of Passengers: <span className="font-medium">{passengers}</span></p>
              </div>
              
              <div className="mb-6">
                <h4 className="font-medium mb-2">Meal Selection</h4>
                <p>Option: <span className="font-medium">{mealOption ? 'With Meal' : 'Without Meal'}</span></p>
                <p>Price per Passenger: <span className="font-medium">${pricePerPassenger}</span></p>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-md mb-6">
                <h4 className="font-medium text-blue-800 mb-2">Total Cost</h4>
                <p className="text-2xl font-bold text-blue-800">${totalCost.toFixed(2)}</p>
              </div>
              
              <div className="mt-6 flex justify-between">
                <button
                  type="button"
                  onClick={prevStep}
                  className="btn btn-secondary"
                >
                  Back: Meal Selection
                </button>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`btn btn-primary ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
                >
                  {isLoading ? 'Processing...' : 'Confirm Booking'}
                </button>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default BookingForm;
