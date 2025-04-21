<?php

use App\Http\Controllers\AdminController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\BookingController;
use App\Http\Controllers\FlightController;
use App\Http\Controllers\PaymentController;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

// Authentication routes
Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

// Public flight routes
Route::get('/flights', [FlightController::class, 'index']);
Route::get('/flights/search', [FlightController::class, 'search']);
Route::get('/flights/{id}', [FlightController::class, 'show']);

// Protected routes that require authentication
Route::middleware('auth:sanctum')->group(function () {
    // User routes
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
    
    // Booking routes
    Route::get('/bookings', [BookingController::class, 'index']);
    Route::post('/bookings', [BookingController::class, 'store']);
    Route::get('/bookings/{id}', [BookingController::class, 'show']);
    Route::put('/bookings/{id}/cancel', [BookingController::class, 'cancel']);
    
    // Payment routes
    Route::post('/payments', [PaymentController::class, 'process']);
    
    // Admin routes
    Route::prefix('admin')->group(function () {
        Route::get('/flights', [AdminController::class, 'flights']);
        Route::post('/flights', [AdminController::class, 'createFlight']);
        Route::put('/flights/{id}', [AdminController::class, 'updateFlight']);
        Route::delete('/flights/{id}', [AdminController::class, 'deleteFlight']);
        Route::get('/bookings', [AdminController::class, 'bookings']);
        Route::get('/airlines', [AdminController::class, 'airlines']);
    });
});
