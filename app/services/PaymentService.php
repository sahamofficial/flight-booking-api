<?php

namespace App\Services;

use App\Models\Booking;
use App\Models\Payment;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class PaymentService
{
    /**
     * Validate payment request.
     */
    public function validatePaymentRequest(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'booking_id' => 'required|exists:bookings,id',
            'payment_method' => 'required|string|in:credit_card,paypal,bank_transfer',
            'card_number' => 'required_if:payment_method,credit_card|string',
            'expiry_date' => 'required_if:payment_method,credit_card|string',
            'cvv' => 'required_if:payment_method,credit_card|string',
            'card_holder_name' => 'required_if:payment_method,credit_card|string',
        ]);

        if ($validator->fails()) {
            return [
                'success' => false,
                'errors' => $validator->errors(),
            ];
        }

        return ['success' => true];
    }

    /**
     * Process the payment for a booking.
     */
    public function processPayment(Request $request)
    {
        // Validate request
        $validation = $this->validatePaymentRequest($request);
        if (!$validation['success']) {
            return $validation;
        }

        $booking = Booking::where('id', $request->booking_id)
            ->where('user_id', Auth::id())
            ->first();

        if (!$booking) {
            return [
                'success' => false,
                'message' => 'Booking not found or does not belong to you',
            ];
        }

        // Check if booking is already paid
        if ($booking->payment && $booking->payment->status === Payment::STATUS_COMPLETED) {
            return [
                'success' => false,
                'message' => 'This booking has already been paid',
            ];
        }

        // Process payment
        $payment = Payment::processPayment(
            $booking->id,
            $booking->total_cost,
            $request->payment_method
        );

        // Confirm booking
        $booking->confirm();

        return [
            'success' => true,
            'message' => 'Payment processed successfully',
            'payment' => $payment,
            'booking' => $booking->fresh(),
        ];
    }
}
