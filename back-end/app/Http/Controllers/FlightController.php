<?php

namespace App\Http\Controllers;

use Carbon\Carbon;
use App\Models\Flight;
use Illuminate\Http\Request;

class FlightController extends Controller
{
    // Fetch all flights
    public function index()
    {
        return response()->json(Flight::all());
    }

    // Fetch a single flight by ID
    public function show($id)
    {
        $flight = Flight::find($id);
        return $flight
            ? response()->json($flight)
            : response()->json(['message' => 'Flight not found'], 404);
    }

    // Store a new flight
    public function store(Request $request)
    {
        try {
            $validatedData = $request->validate([
                'airline_id' => 'required|string',
                'flight_number' => 'required|string|unique:flights',
                'departure' => 'required|min:1',
                'destination' => 'required|min:1',
                'departure_time' => 'required|date_format:Y-m-d H:i:s',
                'arrival_time' => 'required|date_format:Y-m-d H:i:s|after:departure_time',
                'price' => 'required|numeric|min:0',
                'total_seats' => 'required|integer|min:1',
                'available_seats' => 'required|integer|min:0|max:' . $request->total_seats,
                'num_transits' => 'nullable|integer|min:0',
            ]);
            
            $flight = Flight::create($validatedData);
    
            return response()->json([
                'message' => 'Flight registered successfully',
                'flight' => $flight
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error registering flight',
                'error' => $e->getMessage()
            ], 500);
        }
    }
    

    // Update an existing flight
    public function update(Request $request, $id)
    {
        $flight = Flight::find($id);
        if (!$flight) {
            return response()->json(['message' => 'Flight not found'], 404);
        }

        $validatedData = $request->validate([
            'flight_number' => 'required|string|unique:flights,flight_number,' . $id,
            'airline_id' => 'required|string',
            'departure' => 'required|string',
            'destination' => 'required|string',
            'departure_time' => 'required|date_format:Y-m-d H:i:s',
            'arrival_time' => 'required|date_format:Y-m-d H:i:s|after:departure_time',
            'price' => 'required|numeric|min:0',
            'total_seats' => 'required|integer|min:1',
            'available_seats' => 'required|integer|min:0|max:' . $request->total_seats,
            'num_transits' => 'nullable|integer|min:0'
        ]);

        $flight->update($validatedData);

        return response()->json([
            'message' => 'Flight updated successfully',
            'flight' => $flight
        ]);
    }

    // Delete a flight
    public function destroy($id)
    {
        $flight = Flight::find($id);
        if (!$flight) {
            return response()->json(['message' => 'Flight not found'], 404);
        }

        $flight->delete();

        return response()->json(['message' => 'Flight deleted successfully']);
    }

    // Multi-City Search
    public function searchFlights(Request $request)
    {
        $departures = $request->input('departures');
        $destinations = $request->input('destinations');
        $dates = $request->input('dates');

        if (!$departures || !$destinations || !$dates || count($departures) !== count($destinations) || count($departures) !== count($dates)) {
            return response()->json(['message' => 'Invalid search parameters'], 400);
        }

        $flights = [];

        foreach ($departures as $index => $departure) {
            $destination = $destinations[$index];
            $date = Carbon::createFromFormat('Y-m-d', $dates[$index])->startOfDay();

            $flightResults = Flight::where('departure', $departure)
                ->where('destination', $destination)
                ->whereDate('departure_time', '=', $date)
                ->get();

            $flights[] = [
                'from' => $departure,
                'to' => $destination,
                'date' => $dates[$index],
                'flights' => $flightResults
            ];
        }

        return response()->json($flights);
    }

    // Get unique locations
    public function getLocations()
    {
        $departures = Flight::distinct()->pluck('departure');
        $destinations = Flight::distinct()->pluck('destination');

        return response()->json([
            'departures' => $departures,
            'destinations' => $destinations,
        ]);
    }
}
