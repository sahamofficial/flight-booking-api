<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Flight extends Model
{
    use HasFactory;
    protected $fillable = [
        'id',
        'airline_id',
        'flight_number',
        'departure',
        'destination',
        'departure_time',
        'arrival_time',
        'price',
        'total_seats',
        'available_seats',
        'num_transits'
    ];
    public function bookings()
    {
        return $this->hasMany(Booking::class);
    }
    

}
