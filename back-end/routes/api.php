<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FlightController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\AirlineController;

// Authentication Routes
Route::post('/register', [AuthController::class, 'register']); // Register a new user
Route::post('/login', [AuthController::class, 'login'])->name('login');

// Public Flight Routes (No authentication required)
// Route::get('/flights', [FlightController::class, 'index']);
// Route::get('/flights/{id}', [FlightController::class, 'show']);

Route::post('/register', [UserController::class, 'register']);

Route::post('/airlines', [AirlineController::class, 'store']); 
Route::get('/airlines', [AirlineController::class, 'index']); 
Route::get('/airlines/{id}', [AirlineController::class, 'show']); 
Route::put('/airlines/{id}', [AirlineController::class, 'update']); 
Route::delete('/airlines/{id}', [AirlineController::class, 'destroy']); 

// Protected Routes (Requires authentication)
Route::middleware(['auth:sanctum'])->group(function () {  

    // Flight Management (Only Admins should have access, consider adding role checks)
    Route::post('/flights', [FlightController::class, 'store']);
    Route::put('/flights/{id}', [FlightController::class, 'update']);
    Route::delete('/flights/{id}', [FlightController::class, 'destroy']);

    // Booking Routes
    Route::post('/book-flight', [BookingController::class, 'store']);
    Route::get('/bookings/{userId}', [BookingController::class, 'userBookings']);
    Route::put('/bookings/{id}', [BookingController::class, 'update']);
    Route::delete('/bookings/{id}', [BookingController::class, 'destroy']);

    // Route::post('/cancel-booking/{id}', [BookingController::class, 'cancelBooking']);

    Route::put('/user/update', [AuthController::class, 'update']);

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::delete('/user/delete', [UserController::class, 'destroy']);

});
