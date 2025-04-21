import React, { useState } from 'react';
import { useForm } from 'react-hook-form';

const PaymentForm = ({ booking, onSubmit, isLoading }) => {
  const [paymentMethod, setPaymentMethod] = useState('credit_card');
  const { register, handleSubmit, formState: { errors } } = useForm();
  
  const handleFormSubmit = (data) => {
    const paymentData = {
      booking_id: booking.id,
      payment_method: paymentMethod,
      ...data
    };
    
    onSubmit(paymentData);
  };
  
  return (
    <div className="bg-white shadow rounded-lg overflow-hidden">
      <div className="p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Details</h2>
        
        <div className="mb-6">
          <h3 className="text-lg font-medium mb-2">Booking Summary</h3>
          <div className="bg-gray-50 p-4 rounded-md">
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Booking Reference:</span>
              <span className="font-medium">{booking.booking_reference}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Flight:</span>
              <span className="font-medium">{booking.flight.airline.name} {booking.flight.flight_number}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Route:</span>
              <span className="font-medium">{booking.flight.origin} → {booking.flight.destination}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Passengers:</span>
              <span className="font-medium">{booking.passenger_count}</span>
            </div>
            <div className="flex justify-between mb-2">
              <span className="text-gray-600">Meal Option:</span>
              <span className="font-medium">{booking.meal_option ? 'With Meal' : 'Without Meal'}</span>
            </div>
            <div className="flex justify-between font-bold text-lg pt-2 border-t border-gray-200">
              <span>Total Amount:</span>
              <span>${parseFloat(booking.total_cost).toFixed(2)}</span>
            </div>
          </div>
        </div>
        
        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-6">
          <div>
            <h3 className="text-lg font-medium mb-4">Select Payment Method</h3>
            <div className="space-y-4">
              <div 
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${paymentMethod === 'credit_card' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                onClick={() => setPaymentMethod('credit_card')}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'credit_card' ? 'border-blue-500' : 'border-gray-300'}`}>
                      {paymentMethod === 'credit_card' && <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>}
                    </div>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium">Credit/Debit Card</h4>
                  </div>
                </div>
              </div>
              
              <div 
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${paymentMethod === 'paypal' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                onClick={() => setPaymentMethod('paypal')}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'paypal' ? 'border-blue-500' : 'border-gray-300'}`}>
                      {paymentMethod === 'paypal' && <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>}
                    </div>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium">PayPal</h4>
                  </div>
                </div>
              </div>
              
              <div 
                className={`border rounded-lg p-4 cursor-pointer transition-colors ${paymentMethod === 'bank_transfer' ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
                onClick={() => setPaymentMethod('bank_transfer')}
              >
                <div className="flex items-center">
                  <div className="flex-shrink-0">
                    <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${paymentMethod === 'bank_transfer' ? 'border-blue-500' : 'border-gray-300'}`}>
                      {paymentMethod === 'bank_transfer' && <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>}
                    </div>
                  </div>
                  <div className="ml-3">
                    <h4 className="font-medium">Bank Transfer</h4>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {paymentMethod === 'credit_card' && (
            <div className="space-y-4">
              <div>
                <label htmlFor="card_number" className="form-label">Card Number</label>
                <input
                  id="card_number"
                  type="text"
                  placeholder="1234 5678 9012 3456"
                  {...register('card_number', { 
                    required: 'Card number is required',
                    pattern: {
                      value: /^[0-9]{13,19}$/,
                      message: 'Please enter a valid card number'
                    }
                  })}
                  className="form-input"
                />
                {errors.card_number && <p className="form-error">{errors.card_number.message}</p>}
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label htmlFor="expiry_date" className="form-label">Expiry Date</label>
                  <input
                    id="expiry_date"
                    type="text"
                    placeholder="MM/YY"
                    {...register('expiry_date', { 
                      required: 'Expiry date is required',
                      pattern: {
                        value: /^(0[1-9]|1[0-2])\/([0-9]{2})$/,
                        message: 'Please enter a valid expiry date (MM/YY)'
                      }
                    })}
                    className="form-input"
                  />
                  {errors.expiry_date && <p className="form-error">{errors.expiry_date.message}</p>}
                </div>
                <div>
                  <label htmlFor="cvv" className="form-label">CVV</label>
                  <input
                    id="cvv"
                    type="text"
                    placeholder="123"
                    {...register('cvv', { 
                      required: 'CVV is required',
                      pattern: {
                        value: /^[0-9]{3,4}$/,
                        message: 'Please enter a valid CVV'
                      }
                    })}
                    className="form-input"
                  />
                  {errors.cvv && <p className="form-error">{errors.cvv.message}</p>}
                </div>
              </div>
              
              <div>
                <label htmlFor="card_holder_name" className="form-label">Cardholder Name</label>
                <input
                  id="card_holder_name"
                  type="text"
                  {...register('card_holder_name', { 
                    required: 'Cardholder name is required'
                  })}
                  className="form-input"
                />
                {errors.card_holder_name && <p className="form-error">{errors.card_holder_name.message}</p>}
              </div>
            </div>
          )}
          
          {paymentMethod === 'paypal' && (
            <div className="bg-blue-50 p-4 rounded-md">
              <p className="text-gray-700">
                You will be redirected to PayPal to complete your payment after clicking "Pay Now".
              </p>
            </div>
          )}
          
          {paymentMethod === 'bank_transfer' && (
            <div className="bg-blue-50 p-4 rounded-md">
              <p className="text-gray-700 mb-2">
                Please use the following details to make your bank transfer:
              </p>
              <div className="space-y-1 mb-2">
                <p><span className="font-medium">Bank:</span> Global Bank</p>
                <p><span className="font-medium">Account Name:</span> Jet-Air Travel Agency</p>
                <p><span className="font-medium">Account Number:</span> 1234567890</p>
                <p><span className="font-medium">Reference:</span> {booking.booking_reference}</p>
              </div>
              <p className="text-sm text-gray-600">
                Please include your booking reference as the payment reference.
              </p>
            </div>
          )}
          
          <div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full py-3 btn btn-primary ${isLoading ? 'opacity-75 cursor-not-allowed' : ''}`}
            >
              {isLoading ? 'Processing Payment...' : `Pay $${parseFloat(booking.total_cost).toFixed(2)}`}
            </button>
            <p className="text-sm text-gray-500 mt-2 text-center">
              Your payment information is secure and encrypted.
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PaymentForm;
