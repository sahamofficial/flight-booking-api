<?php

namespace App\Http\Controllers;

use App\Services\BookingService;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    protected $bookingService;

    public function __construct(BookingService $bookingService)
    {
        $this->bookingService = $bookingService;
    }

    public function index()
    {
        return response()->json([
            'bookings' => $this->bookingService->getUserBookings(),
        ]);
    }

    public function store(Request $request)
    {
        return $this->bookingService->createBooking($request);
    }

    public function show($id)
    {
        return response()->json([
            'booking' => $this->bookingService->getBookingById($id),
        ]);
    }

    public function cancel($id)
    {
        return $this->bookingService->cancelBooking($id);
    }
}
