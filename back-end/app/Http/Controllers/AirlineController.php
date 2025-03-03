<?php

namespace App\Http\Controllers;

use App\Models\Airline;
use Illuminate\Http\Request;

class AirlineController extends Controller
{
    // Create a new airline
    public function store(Request $request)
    {
        $request->validate([
            'name' => 'required|unique:airlines,name|max:255',
            'iata_code' => 'required|unique:airlines,iata_code|max:3',
            'icao_code' => 'nullable|unique:airlines,icao_code|max:4',
            'country' => 'required|max:255',
        ]);

        $airline = Airline::create($request->all());

        return response()->json(['message' => 'Airline created successfully', 'data' => $airline], 201);
    }

    // Get all airlines
    public function index()
    {
        return response()->json(Airline::all(), 200);
    }

    // Get a specific airline by ID
    public function show($id)
    {
        $airline = Airline::find($id);
        if (!$airline) {
            return response()->json(['message' => 'Airline not found'], 404);
        }
        return response()->json($airline, 200);
    }

    // Update an airline
    public function update(Request $request, $id)
    {
        $airline = Airline::find($id);
        if (!$airline) {
            return response()->json(['message' => 'Airline not found'], 404);
        }

        $request->validate([
            'name' => 'sometimes|required|unique:airlines,name,' . $id . '|max:255',
            'iata_code' => 'sometimes|required|unique:airlines,iata_code,' . $id . '|max:3',
            'icao_code' => 'nullable|unique:airlines,icao_code,' . $id . '|max:4',
            'country' => 'sometimes|required|max:255',
        ]);

        $airline->update($request->all());

        return response()->json(['message' => 'Airline updated successfully', 'data' => $airline], 200);
    }

    // Delete an airline
    public function destroy($id)
    {
        $airline = Airline::find($id);
        if (!$airline) {
            return response()->json(['message' => 'Airline not found'], 404);
        }

        $airline->delete();

        return response()->json(['message' => 'Airline deleted successfully'], 200);
    }
}
