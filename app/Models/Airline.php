<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Airline extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'code',
        'logo',
        'contact_number',
        'contact_email',
    ];

    /**
     * Get the flights for the airline.
     */
    public function flights()
    {
        return $this->hasMany(Flight::class);
    }
}
