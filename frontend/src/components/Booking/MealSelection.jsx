import React from 'react';

const MealSelection = ({ withMealPrice, withoutMealPrice, passengerCount, selectedOption, onSelectOption }) => {
  // Ensure prices are numbers
  const priceWithoutMeal = parseFloat(withoutMealPrice) || 0;
  const priceWithMeal = parseFloat(withMealPrice) || 0;

  // Calculate price difference
  const priceDifference = priceWithMeal - priceWithoutMeal;
  const totalPriceDifference = priceDifference * passengerCount;
  
  return (
    <div>
      <h3 className="text-xl font-semibold mb-4">Meal Selection</h3>
      <p className="text-gray-600 mb-6">
        Choose whether you'd like to include in-flight meals with your booking.
        Adding meals will enhance your travel experience with freshly prepared cuisine.
      </p>
      
      <div className="space-y-4">
        <div 
          className={`border rounded-lg p-4 cursor-pointer transition-colors ${!selectedOption ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
          onClick={() => onSelectOption(false)}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${!selectedOption ? 'border-blue-500' : 'border-gray-300'}`}>
                {!selectedOption && <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>}
              </div>
            </div>
            <div className="ml-3 flex-1">
              <h4 className="font-medium text-lg">Without Meal</h4>
              <p className="text-gray-600 mt-1">Basic ticket without in-flight meal service.</p>
              <p className="text-blue-700 font-medium mt-2">
                ${priceWithoutMeal.toFixed(2)} per passenger
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Total for {passengerCount} passenger{passengerCount > 1 ? 's' : ''}: ${(priceWithoutMeal * passengerCount).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
        
        <div 
          className={`border rounded-lg p-4 cursor-pointer transition-colors ${selectedOption ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-blue-300'}`}
          onClick={() => onSelectOption(true)}
        >
          <div className="flex items-start">
            <div className="flex-shrink-0 mt-1">
              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${selectedOption ? 'border-blue-500' : 'border-gray-300'}`}>
                {selectedOption && <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>}
              </div>
            </div>
            <div className="ml-3 flex-1">
              <h4 className="font-medium text-lg">With Meal</h4>
              <p className="text-gray-600 mt-1">
                Enjoy a delicious in-flight meal with beverage service.
              </p>
              <p className="text-blue-700 font-medium mt-2">
                ${priceWithMeal.toFixed(2)} per passenger <span className="text-sm text-gray-500">(+${priceDifference.toFixed(2)} per passenger)</span>
              </p>
              <p className="text-sm text-gray-500 mt-1">
                Total for {passengerCount} passenger{passengerCount > 1 ? 's' : ''}: ${(priceWithMeal * passengerCount).toFixed(2)}
              </p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="mt-6">
        <div className="bg-gray-50 p-4 rounded-md">
          <h4 className="font-medium mb-2">Price Summary</h4>
          <div className="space-y-2">
            <div className="flex justify-between">
              <span>Base price ({passengerCount} × ${priceWithoutMeal.toFixed(2)})</span>
              <span>${(priceWithoutMeal * passengerCount).toFixed(2)}</span>
            </div>
            {selectedOption && (
              <div className="flex justify-between text-blue-700">
                <span>Meal option ({passengerCount} × ${priceDifference.toFixed(2)})</span>
                <span>+${totalPriceDifference.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between font-bold pt-2 border-t">
              <span>Total</span>
              <span>${((selectedOption ? priceWithMeal : priceWithoutMeal) * passengerCount).toFixed(2)}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MealSelection;
