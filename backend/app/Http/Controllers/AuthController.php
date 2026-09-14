<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;

class AuthController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'name' => 'required',
            'email' => 'required|email|unique:users',
            'password' => 'required|confirmed',
            'role' => 'required|in:client,professionnel',
        ]);

        $user = User::create([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
            'role' => $request->role,
        ]);

        return response()->json([
            'message' => 'Inscription réussie',
            'user' => $user
        ], 201);
    }


    public function login(Request $request){
              $request->validate([
                'email' => 'required|email',
                'password' => 'required',
              ]);

              $user = User::where('email', $request->email)->first();

              if (!$user || !Hash::check($request->password, $user->password)) {


        return response()->json([
            'message' => 'Email ou mot de passe incorrect'
        ], 401);
    }


    
    $token = $user->createToken('auth_token')->plainTextToken;
            return response()->json([
                'message' => 'Connexion réussie',
                'token' => $token,
                'user' => $user
            ], 200);

    }
public function logout(Request $request)
{
    $request->user()->currentAccessToken()->delete();

    return response()->json([
        'message' => 'Déconnexion réussie'
    ]);
}
}
