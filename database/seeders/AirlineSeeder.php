<?php

namespace Database\Seeders;

use App\Models\Airline;
use Illuminate\Database\Seeder;

class AirlineSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $airlines = [
            [
                'name' => 'Jet-Air Airways',
                'code' => 'JA',
                'logo' => 'jetair_logo.svg',
                'contact_number' => '1-800-JETAIR',
                'contact_email' => 'info@jetair.com',
            ],
            [
                'name' => 'SkyWing Airlines',
                'code' => 'SK',
                'logo' => 'skywing_logo.svg',
                'contact_number' => '1-800-SKYWING',
                'contact_email' => 'info@skywing.com',
            ],
            [
                'name' => 'Global Express',
                'code' => 'GE',
                'logo' => 'globalexpress_logo.svg',
                'contact_number' => '1-800-GLOBAL',
                'contact_email' => 'info@globalexpress.com',
            ],
            [
                'name' => 'AirBlue',
                'code' => 'AB',
                'logo' => 'airblue_logo.svg',
                'contact_number' => '1-800-AIRBLUE',
                'contact_email' => 'info@airblue.com',
            ],
        ];

        foreach ($airlines as $airline) {
            Airline::create($airline);
        }
    }
}
