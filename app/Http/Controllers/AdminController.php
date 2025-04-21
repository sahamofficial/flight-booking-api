<?php

namespace App\Http\Controllers;

use App\Services\AdminService;
use Illuminate\Http\Request;

class AdminController extends Controller
{
    protected $adminService;

    public function __construct(AdminService $adminService)
    {
        $this->middleware('auth'); 
        $this->middleware('admin'); 
        $this->adminService = $adminService;
    }

    public function flights()
    {
        return response()->json(['flights' => $this->adminService->getFlights()]);
    }

    public function createFlight(Request $request)
    {
        return $this->adminService->createFlight($request);
    }

    public function updateFlight(Request $request, $id)
    {
        return $this->adminService->updateFlight($request, $id);
    }

    public function deleteFlight($id)
    {
        return $this->adminService->deleteFlight($id);
    }

    public function bookings()
    {
        return response()->json(['bookings' => $this->adminService->getBookings()]);
    }

    public function airlines()
    {
        return response()->json(['airlines' => $this->adminService->getAirlines()]);
    }
}
