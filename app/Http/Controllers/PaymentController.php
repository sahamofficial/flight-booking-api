<?php

namespace App\Http\Controllers;

use App\Services\PaymentService;
use Illuminate\Http\Request;

class PaymentController extends Controller
{
    protected $paymentService;

    public function __construct(PaymentService $paymentService)
    {
        $this->paymentService = $paymentService;
    }

    /**
     * Process a payment for a booking.
     */
    public function process(Request $request)
    {
        $result = $this->paymentService->processPayment($request);

        if (!$result['success']) {
            return response()->json(['errors' => $result['errors'] ?? $result['message']], 422);
        }

        return response()->json($result);
    }
}
