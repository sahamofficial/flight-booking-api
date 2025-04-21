<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transit extends Model
{
    use HasFactory;

    protected $fillable = [
        'flight_id',
        'location',
        'arrival_time',
        'departure_time',
        'terminal',
    ];

    protected $casts = [
        'arrival_time' => 'datetime',
        'departure_time' => 'datetime',
    ];

    /**
     * Get the flight that owns the transit.
     */
    public function flight()
    {
        return $this->belongsTo(Flight::class);
    }

    /**
     * Get layover duration in minutes
     */
    public function getLayoverDurationAttribute()
    {
        return $this->arrival_time->diffInMinutes($this->departure_time);
    }

    /**
     * Format layover duration as hours and minutes
     */
    public function getFormattedLayoverDurationAttribute()
    {
        $minutes = $this->layover_duration;
        $hours = floor($minutes / 60);
        $remainingMinutes = $minutes % 60;
        
        if ($hours > 0) {
            return $hours . 'h ' . $remainingMinutes . 'm';
        }
        
        return $remainingMinutes . 'm';
    }
}
