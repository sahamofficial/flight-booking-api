<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    public function up()
    {
        Schema::create('airlines', function (Blueprint $table) {
            $table->id(); // Auto-incrementing ID
            $table->string('name')->unique(); // Airline name
            $table->string('iata_code', 3)->unique(); // IATA Code (e.g., EK for Emirates)
            $table->string('icao_code', 4)->unique()->nullable(); // ICAO Code (e.g., UAE for Emirates)
            $table->string('country'); // Country of operation
            $table->timestamps(); // Created at & Updated at
        });
    }

    public function down()
    {
        Schema::dropIfExists('airlines');
    }
};
