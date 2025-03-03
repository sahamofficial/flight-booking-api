<?php

namespace App\Http\Controllers;

use App\Models\Booking;
use App\Models\Flight;
use Illuminate\Http\Request;

class BookingController extends Controller
{
    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'flight_id' => 'required|exists:flights,id',
            'seats_booked' => 'required|integer|min:1'
        ]);

        $flight = Flight::find($request->flight_id);
        if ($flight->available_seats < $request->seats_booked) {
            return response()->json(['message' => 'Not enough available seats'], 400);
        }

        $totalPrice = $request->seats_booked * $flight->price;

        $booking = Booking::create([
            'user_id' => $request->user_id,
            'flight_id' => $request->flight_id,
            'seats_booked' => $request->seats_booked,
            'total_price' => $totalPrice,
            'status' => 'confirmed'
        ]);

        $flight->update(['available_seats' => $flight->available_seats - $request->seats_booked]);

        return response()->json($booking, 201);
    }

    public function userBookings($userId)
    {
        return response()->json(Booking::where('user_id', $userId)->with('flight')->get());
    }

    public function update(Request $request, $id)
    {
        $booking = Booking::find($id);
        if (!$booking) {
            return response()->json(['message' => 'Booking not found'], 404);
        }

        $request->validate([
            'seats_booked' => 'integer|min:1'
        ]);

        // Calculate the price difference if seats are changed
        $flight = Flight::find($booking->flight_id);
        if ($request->has('seats_booked')) {
            $seatDifference = $request->seats_booked - $booking->seats_booked;

            if ($seatDifference > 0 && $flight->available_seats < $seatDifference) {
                return response()->json(['message' => 'Not enough available seats'], 400);
            }

            $booking->total_price = $request->seats_booked * $flight->price;
            $flight->update(['available_seats' => $flight->available_seats - $seatDifference]);
        }

        $booking->update($request->only(['seats_booked', 'status']));

        return response()->json([
            'message' => 'Booking updated successfully',
            'booking' => $booking
        ]);
    }

    public function destroy($id)
    {
        $booking = Booking::find($id);

        if (!$booking) {
            return response()->json(['message' => 'Booking not found'], 404);
        }

        // Restore available seats when booking is deleted
        $flight = $booking->flight;
        $flight->update([
            'available_seats' => $flight->available_seats + $booking->seats_booked
        ]);

        $booking->delete();

        return response()->json(['message' => 'Booking deleted successfully']);
    }


}
