<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
  
class ProfileController extends Controller
{
    public function show(Request $request){
        return response()->json($request->user());
    }

    public function update(Request $request){
        $user = $request->user();
        $user->update([
            'name' => $request->name ?? $user->name,
            'email' => $request->email ?? $user->email,
        ]);
    }
}
