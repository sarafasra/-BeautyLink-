<?php

namespace App\Http\Controllers;

use App\Models\Favorite;
use Illuminate\Http\Request;

class FavoriteController extends Controller
{
    public function index(Request $request)
    {
        $favorites = Favorite::with('service')
            ->where('user_id', $request->user()->id)
            ->get();

        return response()->json($favorites);
    }

    public function store(Request $request)
    {
        $favorite = Favorite::firstOrCreate([
            'user_id' => $request->user()->id,
            'service_id' => $request->service_id,
        ]);

        return response()->json([
            'message' => 'Service ajouté aux favoris',
            'favorite' => $favorite,
        ]);
    }

    public function destroy($serviceId, Request $request)
    {
        Favorite::where('user_id', $request->user()->id)
            ->where('service_id', $serviceId)
            ->delete();

        return response()->json([
            'message' => 'Service retiré des favoris',
        ]);
    }
}
