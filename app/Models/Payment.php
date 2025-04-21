<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Payment extends Model
{
    use HasFactory;

    protected $fillable = [
        'booking_id',
        'amount',
        'payment_method',
        'transaction_id',
        'status',
    ];

    protected $casts = [
        'amount' => 'decimal:2',
    ];

    const STATUS_PENDING = 'pending';
    const STATUS_COMPLETED = 'completed';
    const STATUS_FAILED = 'failed';
    const STATUS_REFUNDED = 'refunded';

    /**
     * Get the booking that owns the payment.
     */
    public function booking()
    {
        return $this->belongsTo(Booking::class);
    }

    /**
     * Process payment (demo function)
     */
    public static function processPayment($bookingId, $amount, $paymentMethod)
    {
        // In a real application, this would integrate with a payment gateway
        // For demonstration purposes, we'll simulate a successful payment
        
        $payment = self::create([
            'booking_id' => $bookingId,
            'amount' => $amount,
            'payment_method' => $paymentMethod,
            'transaction_id' => 'TX' . strtoupper(substr(uniqid(), -10)),
            'status' => self::STATUS_COMPLETED,
        ]);

        return $payment;
    }

    /**
     * Process refund (demo function)
     */
    public function processRefund()
    {
        // In a real application, this would integrate with a payment gateway
        // For demonstration purposes, we'll simulate a successful refund
        
        $this->status = self::STATUS_REFUNDED;
        $this->save();

        return true;
    }
}
