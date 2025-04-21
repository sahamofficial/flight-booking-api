<?php

namespace Database\Seeders;

use App\Models\Transit;
use Illuminate\Database\Seeder;

class TransitSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $transits = [
            [
                'flight_id' => 3, // Los Angeles to Tokyo
                'location' => 'Honolulu',
                'departure_time' => '2025-06-18 12:00:00',
                'arrival_time' => '2025-06-19 16:00:00',
                'terminal' => 'Terminal 2',
            ],
            [
                'flight_id' => 4, // Tokyo to Los Angeles
                'location' => 'Honolulu',
               'departure_time' => '2025-04-10 14:00:00',
                'arrival_time' => '2025-04-10 22:00:00',
                'terminal' => 'Terminal 3',
            ],
            [
                'flight_id' => 7, // Paris to Sydney
                'location' => 'Dubai',
                'departure_time' => '2025-04-12 07:00:00',
                'arrival_time' => '2025-04-13 10:00:00',
                'terminal' => 'Terminal 1',
            ],
            [
                'flight_id' => 7, // Paris to Sydney (second transit)
                'location' => 'Singapore',
                'departure_time' => '2025-04-12 08:00:00',
                'arrival_time' => '2025-04-13 11:00:00',
                'terminal' => 'Terminal 3',
            ],
            [
                'flight_id' => 8, // Sydney to Paris
                'location' => 'Singapore',
                'departure_time' => '2025-04-13 08:00:00',
                'arrival_time' => '2025-04-14 11:00:00',
                'terminal' => 'Terminal 2',
            ],
            [
                'flight_id' => 8, // Sydney to Paris (second transit)
                'location' => 'Dubai',
                'departure_time' => '2025-04-13 10:00:00',
                'arrival_time' => '2025-04-14 13:00:00',
                'terminal' => 'Terminal 3',
            ],
        ];

        foreach ($transits as $transit) {
            Transit::create($transit);
        }
    }
}
