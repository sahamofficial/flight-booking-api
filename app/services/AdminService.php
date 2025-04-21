<?php

namespace App\Services;

use App\Models\Airline;
use App\Models\Booking;
use App\Models\Flight;
use App\Models\Transit;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class AdminService
{
    /**
     * Get all flights.
     */
    public function getFlights()
    {
        return Flight::with(['airline', 'transits'])->get();
    }

    /**
     * Create a new flight.
     */
    public function createFlight(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'airline_id' => 'required|exists:airlines,id',
            'flight_number' => 'required|string',
            'origin' => 'required|string',
            'destination' => 'required|string',
            'departure_time' => 'required|date',
            'arrival_time' => 'required|date|after:departure_time',
            'price_without_meal' => 'required|numeric|min:0',
            'price_with_meal' => 'required|numeric|min:0',
            'total_seats' => 'required|integer|min:1',
            'available_seats' => 'required|integer|min:0|lte:total_seats',
            'transits' => 'nullable|array',
            'transits.*.location' => 'required|string',
            'transits.*.arrival_time' => 'required|date',
            'transits.*.departure_time' => 'required|date|after:transits.*.arrival_time',
            'transits.*.terminal' => 'required|string',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $flight = Flight::create($request->only([
            'airline_id', 'flight_number', 'origin', 'destination',
            'departure_time', 'arrival_time', 'price_without_meal',
            'price_with_meal', 'total_seats', 'available_seats'
        ]));

        if ($request->has('transits')) {
            foreach ($request->transits as $transitData) {
                Transit::create([
                    'flight_id' => $flight->id,
                    'location' => $transitData['location'],
                    'arrival_time' => $transitData['arrival_time'],
                    'departure_time' => $transitData['departure_time'],
                    'terminal' => $transitData['terminal'],
                ]);
            }
        }

        return response()->json([
            'message' => 'Flight created successfully',
            'flight' => $flight->load(['airline', 'transits']),
        ], 201);
    }

    /**
     * Update a flight.
     */
    public function updateFlight(Request $request, $id)
    {
        $flight = Flight::findOrFail($id);

        $validator = Validator::make($request->all(), [
            'airline_id' => 'nullable|exists:airlines,id',
            'flight_number' => 'nullable|string',
            'origin' => 'nullable|string',
            'destination' => 'nullable|string',
            'departure_time' => 'nullable|date',
            'arrival_time' => 'nullable|date|after:departure_time',
            'price_without_meal' => 'nullable|numeric|min:0',
            'price_with_meal' => 'nullable|numeric|min:0',
            'total_seats' => 'nullable|integer|min:1',
            'available_seats' => 'nullable|integer|min:0|lte:total_seats',
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $flight->update($request->all());

        return response()->json([
            'message' => 'Flight updated successfully',
            'flight' => $flight->fresh()->load(['airline', 'transits']),
        ]);
    }

    /**
     * Delete a flight.
     */
    public function deleteFlight($id)
    {
        $flight = Flight::findOrFail($id);

        if (Booking::where('flight_id', $id)->whereIn('status', [Booking::STATUS_PENDING, Booking::STATUS_CONFIRMED])->exists()) {
            return response()->json(['message' => 'Cannot delete flight with active bookings'], 400);
        }

        $flight->transits()->delete();
        $flight->delete();

        return response()->json(['message' => 'Flight deleted successfully']);
    }

    /**
     * Get all bookings.
     */
    public function getBookings()
    {
        return Booking::with(['user', 'flight.airline', 'payment'])->get();
    }

    /**
     * Get all airlines.
     */
    public function getAirlines()
    {
        return Airline::all();
    }
}
