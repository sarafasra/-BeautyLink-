<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
  
class ProfileController extends Controller
{
    public function show(Request $request){
        return response()->json($request->user());
    }

    public function update(Request $request)
{
    $user = $request->user();

    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email,' . $user->id,
    ]);

    $user->update([
        'name' => $request->name,
        'email' => $request->email,
    ]);

    return response()->json([
        'message' => 'Profile modifié avec succès',
        'user' => $user
    ]);
}

}
