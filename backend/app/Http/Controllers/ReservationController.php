<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    public function index(Request $request)
    {
        $reservations = Reservation::where('user_id', $request->user()->id)
            ->with('service')
            ->get();

        return response()->json($reservations);
    }

    public function store(Request $request)
    {
        $request->validate([
            'service_id' => 'required|exists:services,id',
            'date' => 'required|date',
            'time' => 'required',
        ]);

        $reservation = Reservation::create([
            'user_id' => $request->user()->id,
            'service_id' => $request->service_id,
            'date' => $request->date,
            'time' => $request->time,
            'status' => 'pending',
        ]);

        return response()->json([
            'message' => 'Réservation créée avec succès',
            'reservation' => $reservation
        ], 201);
    }
}