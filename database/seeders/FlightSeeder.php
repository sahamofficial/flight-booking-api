<?php

namespace Database\Seeders;

use App\Models\Flight;
use Illuminate\Database\Seeder;

class FlightSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $flights = [
            [
                'airline_id' => 1,
                'flight_number' => 'JA101',
                'origin' => 'New York',
                'destination' => 'London',
                'departure_time' => '2025-06-15 08:00:00',
                'arrival_time' => '2025-06-15 20:00:00',
                'price_without_meal' => 500.00,
                'price_with_meal' => 550.00,
                'available_seats' => 150,
                'total_seats' => 200,
            ],
            [
                'airline_id' => 1,
                'flight_number' => 'JA102',
                'origin' => 'London',
                'destination' => 'New York',
                'departure_time' => '2025-06-20 10:00:00',
                'arrival_time' => '2025-06-20 22:00:00',
                'price_without_meal' => 550.00,
                'price_with_meal' => 600.00,
                'available_seats' => 180,
                'total_seats' => 200,
            ],
            [
                'airline_id' => 2,
                'flight_number' => 'SK201',
                'origin' => 'Los Angeles',
                'destination' => 'Tokyo',
                'departure_time' => '2025-06-18 12:00:00',
                'arrival_time' => '2025-06-19 16:00:00',
                'price_without_meal' => 800.00,
                'price_with_meal' => 875.00,
                'available_seats' => 220,
                'total_seats' => 250,
            ],
            [
                'airline_id' => 2,
                'flight_number' => 'SK202',
                'origin' => 'Tokyo',
                'destination' => 'Los Angeles',
                'departure_time' => '2025-04-10 14:00:00',
                'arrival_time' => '2025-04-10 22:00:00',
                'price_without_meal' => 850.00,
                'price_with_meal' => 925.00,
                'available_seats' => 210,
                'total_seats' => 250,
            ],
            [
                'airline_id' => 3,
                'flight_number' => 'GE301',
                'origin' => 'Dubai',
                'destination' => 'Singapore',
                'departure_time' => '2025-04-10 09:00:00',
                'arrival_time' => '2025-04-10 21:00:00',
                'price_without_meal' => 450.00,
                'price_with_meal' => 500.00,
                'available_seats' => 120,
                'total_seats' => 150,
            ],
            [
                'airline_id' => 3,
                'flight_number' => 'GE302',
                'origin' => 'Singapore',
                'destination' => 'Dubai',
                'departure_time' => '2025-04-11 11:00:00',
                'arrival_time' => '2025-04-11 23:00:00',
                'price_without_meal' => 475.00,
                'price_with_meal' => 525.00,
                'available_seats' => 130,
                'total_seats' => 150,
            ],
            [
                'airline_id' => 4,
                'flight_number' => 'AB401',
                'origin' => 'Paris',
                'destination' => 'Sydney',
                'departure_time' => '2025-04-12 07:00:00',
                'arrival_time' => '2025-04-13 10:00:00',
                'price_without_meal' => 1000.00,
                'price_with_meal' => 1100.00,
                'available_seats' => 180,
                'total_seats' => 200,
            ],
            [
                'airline_id' => 4,
                'flight_number' => 'AB402',
                'origin' => 'Sydney',
                'destination' => 'Paris',
                'departure_time' => '2025-04-13 08:00:00',
                'arrival_time' => '2025-04-14 11:00:00',
                'price_without_meal' => 1050.00,
                'price_with_meal' => 1150.00,
                'available_seats' => 190,
                'total_seats' => 200,
            ],
        ];

        foreach ($flights as $flight) {
            Flight::create($flight);
        }
    }
}
