<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
  
class ProfileController extends Controller
{
   public function show(Request $request)
{
    $user = $request->user()->load('services');

    return response()->json($user);
}

    public function update(Request $request)
{
    $user = $request->user();

    $request->validate([
        'name' => 'required|string|max:255',
        'email' => 'required|email|unique:users,email,' . $user->id,
        'phone' => 'required|string|max:20',
        'city' => 'required|string|max:100',
        'profession' => 'nullable|string|max:100',
        'bio' => 'nullable|string',
            'profile_photo' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',

    ]);   
    if ($request->hasFile('profile_photo')) {

    if ($user->profile_photo) {
        Storage::disk('public')->delete($user->profile_photo);
    }

    $profilePhoto = $request->file('profile_photo')->store('profile_photos', 'public');

    $user->profile_photo = $profilePhoto;
}
     
   
$user->update([
    'name' => $request->name,
    'email' => $request->email,
    'phone' => $request->phone,
    'city' => $request->city,
    'profession' => $request->profession,
    'bio' => $request->bio,
    'profile_photo' => $user->profile_photo,
]);

    return response()->json([
        'message' => 'Profile modifié avec succès',
        'user' => $user
    ]);
}

}
