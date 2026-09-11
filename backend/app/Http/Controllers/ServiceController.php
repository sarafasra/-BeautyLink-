<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ServiceController extends Controller
{
    public function store(Request $request){
        $request->validate([
            'category_id' => 'reqyuired|exists:categories,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'duration' => 'required|integer',
        ]);

        $service = Service::create([
            'user_id' => $request->user()->id,
             'categoryç_id' => $request->category_id,
             'title' => $request->title,
             'description' => $request->description,
             'price' => $request->price,
             'duration' => $request->duration,
        ]);


        return response()->json([

            'message' =>'Prestation ajoutée avec succes',
            'service' => $service


        ],201);
    }

}
