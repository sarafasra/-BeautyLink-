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
        'phone' => 'required|string|max:20',
        'city' => 'required|string|max:20',
        'profession' => 'nullable|string|max:100',
        'bio' => 'nullable|string',
    ]);   
     

    $user->update([
        'name' => $request->name,
        'email' => $request->email,
        'phone' => $request->phone,
        'city' => $request->city,
        'profession' => $request->profession,
        'bio' => $request->bio,
    ]);

    return response()->json([
        'message' => 'Profile modifié avec succès',
        'user' => $user
    ]);
}

}
