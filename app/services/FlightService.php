<?php

namespace App\Services;

use App\Models\Flight;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;

class FlightService
{
    /**
     * Get all flights with airline and transit details.
     */
    public function getAllFlights()
    {
        return Flight::with(['airline', 'transits'])->get();
    }

    /**
     * Validate request and search for flights.
     */
    public function searchFlights(Request $request)
    {
        // Validate request
        $validator = Validator::make($request->all(), [
            'origin' => 'required|string',
            'destination' => 'required|string',
            'departure_date' => 'required|date_format:Y-m-d',
            'return_date' => 'nullable|date_format:Y-m-d|after_or_equal:departure_date',
            'passengers' => 'required|integer|min:1',
            'airline_id' => 'nullable|exists:airlines,id',
            'max_price' => 'nullable|numeric|min:0',
        ]);

        if ($validator->fails()) {
            return [
                'success' => false,
                'errors' => $validator->errors(),
            ];
        }

        $departureDate = date('Y-m-d', strtotime($request->departure_date));

        $query = Flight::with(['airline', 'transits'])
            ->where('origin', $request->origin)
            ->where('destination', $request->destination)
            ->whereDate('departure_time', $departureDate)
            ->where('available_seats', '>=', $request->passengers);

        if ($request->airline_id) {
            $query->where('airline_id', $request->airline_id);
        }

        if ($request->max_price) {
            $query->where('price_without_meal', '<=', $request->max_price);
        }

        $flights = $query->get();

        $returnFlights = [];
        if ($request->return_date) {
            $returnDate = date('Y-m-d', strtotime($request->return_date));

            $returnQuery = Flight::with(['airline', 'transits'])
                ->where('origin', $request->destination)
                ->where('destination', $request->origin)
                ->whereDate('departure_time', $returnDate)
                ->where('available_seats', '>=', $request->passengers);

            if ($request->airline_id) {
                $returnQuery->where('airline_id', $request->airline_id);
            }

            if ($request->max_price) {
                $returnQuery->where('price_without_meal', '<=', $request->max_price);
            }

            $returnFlights = $returnQuery->get();
        }

        return [
            'success' => true,
            'outbound_flights' => $flights,
            'return_flights' => $returnFlights,
        ];
    }

    /**
     * Get a single flight by ID.
     */
    public function getFlightById($id)
    {
        return Flight::with(['airline', 'transits'])->findOrFail($id);
    }
}
