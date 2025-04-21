<?php

namespace App\Http\Controllers;

use App\Services\FlightService;
use Illuminate\Http\Request;

class FlightController extends Controller
{
    protected $flightService;

    public function __construct(FlightService $flightService)
    {
        $this->flightService = $flightService;
    }

    public function index()
    {
        return response()->json([
            'flights' => $this->flightService->getAllFlights(),
        ]);
    }

    public function search(Request $request)
    {
        $result = $this->flightService->searchFlights($request);

        if (!$result['success']) {
            return response()->json(['errors' => $result['errors']], 422);
        }

        return response()->json($result);
    }

    public function show($id)
    {
        return response()->json([
            'flight' => $this->flightService->getFlightById($id),
        ]);
    }
}
