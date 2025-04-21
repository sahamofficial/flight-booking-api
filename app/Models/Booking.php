<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Booking extends Model
{
    use HasFactory;

    protected $fillable = [
        'user_id',
        'flight_id',
        'booking_reference',
        'total_cost',
        'meal_option',
        'status',
        'passenger_count',
        'passenger_details',
    ];

    protected $casts = [
        'total_cost' => 'decimal:2',
        'passenger_details' => 'array',
    ];

    const STATUS_PENDING = 'pending';
    const STATUS_CONFIRMED = 'confirmed';
    const STATUS_CANCELLED = 'cancelled';

    /**
     * Generate a unique booking reference
     */
    public static function generateBookingReference()
    {
        do {
            $reference = 'JA' . strtoupper(substr(uniqid(), -8));
        } while (self::where('booking_reference', $reference)->exists());

        return $reference;
    }

    /**
     * Get the user that made the booking.
     */
    public function user()
    {
        return $this->belongsTo(User::class);
    }

    /**
     * Get the flight that was booked.
     */
    public function flight()
    {
        return $this->belongsTo(Flight::class);
    }

    /**
     * Get the payment for the booking.
     */
    public function payment()
    {
        return $this->hasOne(Payment::class);
    }

    /**
     * Check if booking can be cancelled
     */
    public function canBeCancelled()
    {
        return $this->status === self::STATUS_CONFIRMED;
    }

    /**
     * Cancel the booking
     */
    public function cancel()
    {
        if (!$this->canBeCancelled()) {
            return false;
        }

        $this->status = self::STATUS_CANCELLED;
        $this->save();

        // Update flight available seats
        $this->flight->updateAvailableSeats($this->passenger_count, true);

        return true;
    }

    /**
     * Confirm the booking
     */
    public function confirm()
    {
        if ($this->status !== self::STATUS_PENDING) {
            return false;
        }

        $this->status = self::STATUS_CONFIRMED;
        $this->save();

        return true;
    }
}
