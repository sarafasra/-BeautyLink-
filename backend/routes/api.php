<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\AuthController;
use App\Http\Controllers\ProfileController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\ServiceController;
use App\Http\Controllers\ReviewController;
use App\Http\Controllers\FavoriteController;




Route::post('/register', [AuthController::class, 'register']);
Route::post('/login', [AuthController::class, 'login']);

Route::get('/services', [ServiceController::class, 'index']);
Route::get('/services/{id}', [ServiceController::class, 'show']);

Route::get('/profile/{id}', [ProfileController::class, 'professionalProfile']);



Route::middleware('auth:sanctum')->group(function () {

    Route::post('/logout', [AuthController::class, 'logout']);

    Route::get('/user', function (Request $request) {
        return response()->json([
            'user' => $request->user()
        ]);
    });


    Route::get('/favorites', [FavoriteController::class, 'index']);
    Route::post('/favorites', [FavoriteController::class, 'store']);
    Route::delete('/favorites/{serviceId}', [FavoriteController::class, 'destroy']);


    Route::get('/profile', [ProfileController::class, 'show']);
    Route::put('/profile', [ProfileController::class, 'update']);
    Route::post('/profile/photo', [ProfileController::class, 'updatePhoto']);


    Route::get('/reservations', [ReservationController::class, 'index']);
    Route::get(
        '/professional/reservations',
        [ReservationController::class, 'professionalReservations']
    );

    Route::post('/reservations', [ReservationController::class, 'store']);

    Route::put(
        '/reservations/{id}/status',
        [ReservationController::class, 'updateStatus']
    );

    Route::put(
        '/reservations/{id}/cancel',
        [ReservationController::class, 'cancel']
    );


    Route::post('/services', [ServiceController::class, 'store']);
    Route::put('/services/{id}', [ServiceController::class, 'update']);
    Route::delete('/services/{id}', [ServiceController::class, 'destroy']);


    Route::get(
        '/professionals/{professionalId}/reviews',
        [ReviewController::class, 'index']
    );

    Route::post('/reviews', [ReviewController::class, 'store']);
});