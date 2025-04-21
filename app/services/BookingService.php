<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\Flight;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class BookingService
{
    /**
     * Get a list of authenticated user's bookings.
     */
    public function getUserBookings()
    {
        return Auth::user()->bookings()->with(['flight.airline', 'payment'])->get();
    }

    /**
     * Validate booking request data.
     */
    protected function validateBookingRequest(Request $request)
    {
        return Validator::make($request->all(), [
            'flight_id' => 'required|exists:flights,id',
            'meal_option' => 'required|boolean',
            'passenger_count' => 'required|integer|min:1',
            'passenger_details' => 'required|array|min:1',
            'passenger_details.*.name' => 'required|string',
            'passenger_details.*.email' => 'required|email',
            'passenger_details.*.phone' => 'required|string',
        ]);
    }

    /**
     * Create a new booking.
     */
    public function createBooking(Request $request)
    {
        $validator = $this->validateBookingRequest($request);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $flight = Flight::findOrFail($request->flight_id);

        if (!$flight->hasAvailableSeats($request->passenger_count)) {
            return response()->json([
                'message' => 'Not enough seats available for this flight',
            ], 400);
        }

        $pricePerPassenger = $request->meal_option ? $flight->price_with_meal : $flight->price_without_meal;
        $totalCost = $pricePerPassenger * $request->passenger_count;

        $booking = Booking::create([
            'user_id' => Auth::id(),
            'flight_id' => $flight->id,
            'booking_reference' => Booking::generateBookingReference(),
            'total_cost' => $totalCost,
            'meal_option' => $request->meal_option,
            'status' => Booking::STATUS_PENDING,
            'passenger_count' => $request->passenger_count,
            'passenger_details' => $request->passenger_details,
        ]);

        $flight->updateAvailableSeats($request->passenger_count);

        return response()->json([
            'message' => 'Booking created successfully',
            'booking' => $booking->load('flight.airline'),
        ], 201);
    }

    /**
     * Get a specific booking by ID.
     */
    public function getBookingById($id)
    {
        return Booking::with(['flight.airline', 'flight.transits', 'payment'])
            ->where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();
    }

    /**
     * Cancel a booking.
     */
    public function cancelBooking($id)
    {
        $booking = Booking::with(['flight', 'payment'])
            ->where('id', $id)
            ->where('user_id', Auth::id())
            ->firstOrFail();

        if (!$booking->canBeCancelled()) {
            return response()->json([
                'message' => 'This booking cannot be cancelled',
            ], 400);
        }

        $cancelled = $booking->cancel();

        if (!$cancelled) {
            return response()->json([
                'message' => 'Failed to cancel booking',
            ], 500);
        }

        if ($booking->payment) {
            $booking->payment->processRefund();
        }

        return response()->json([
            'message' => 'Booking cancelled successfully',
            'booking' => $booking->fresh(),
        ]);
    }
}
