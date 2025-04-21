<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Flight extends Model
{
    use HasFactory;

    protected $fillable = [
        'airline_id',
        'flight_number',
        'origin',
        'destination',
        'departure_time',
        'arrival_time',
        'price_without_meal',
        'price_with_meal',
        'available_seats',
        'total_seats',
    ];

    protected $casts = [
        'departure_time' => 'datetime',
        'arrival_time' => 'datetime',
        'price_without_meal' => 'decimal:2',
        'price_with_meal' => 'decimal:2',
        'available_seats' => 'integer',
        'total_seats' => 'integer',
    ];

    /**
     * Get the airline that operates the flight.
     */
    public function airline()
    {
        return $this->belongsTo(Airline::class);
    }

    /**
     * Get the transits for the flight.
     */
    public function transits()
    {
        return $this->hasMany(Transit::class);
    }

    /**
     * Get the bookings for the flight.
     */
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }

    /**
     * Calculate duration of flight in minutes
     */
    public function getDurationAttribute()
    {
        return $this->departure_time->diffInMinutes($this->arrival_time);
    }

    /**
     * Format duration as hours and minutes
     */
    public function getFormattedDurationAttribute()
    {
        $minutes = $this->duration;
        $hours = floor($minutes / 60);
        $remainingMinutes = $minutes % 60;
        
        return $hours . 'h ' . $remainingMinutes . 'm';
    }

    /**
     * Get number of transits
     */
    public function getTransitCountAttribute()
    {
        return $this->transits()->count();
    }

    /**
     * Check if flight has available seats
     */
    public function hasAvailableSeats($count = 1)
    {
        return $this->available_seats >= $count;
    }

    /**
     * Update available seats
     */
    public function updateAvailableSeats($count = 1, $increase = false)
    {
        if ($increase) {
            $this->available_seats += $count;
        } else {
            $this->available_seats -= $count;
        }
        
        return $this->save();
    }
}
