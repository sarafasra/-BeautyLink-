<?php

namespace App\Http\Controllers;

use App\Models\Review;
use App\Models\Reservation;
use Illuminate\Http\Request;

class ReviewController extends Controller
{
    public function index($professionalId)
    {
        $reviews = Review::with('user')
            ->whereHas('reservation.service', function ($query) use ($professionalId) {
                $query->where('user_id', $professionalId);
            })
            ->latest()
            ->get();

        return response()->json($reviews);
    }

    public function store(Request $request)
    {
        $request->validate([
            'reservation_id' => 'required|exists:reservations,id',
            'rating' => 'required|integer|min:1|max:5',
            'comment' => 'nullable|string',
        ]);

        $reservation = Reservation::findOrFail($request->reservation_id);

        if ($reservation->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Vous ne pouvez pas noter cette réservation.'
            ], 403);
        }

        if ($reservation->status !== 'accepted') {
            return response()->json([
                'message' => 'Vous pouvez noter uniquement une réservation acceptée.'
            ], 400);
        }

        $review = Review::create([
            'user_id' => $request->user()->id,
            'reservation_id' => $reservation->id,
            'rating' => $request->rating,
            'comment' => $request->comment,
        ]);

        return response()->json([
            'message' => 'Avis ajouté avec succès',
            'review' => $review->load('user'),
        ], 201);
    }
}
