<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;
class ServiceController extends Controller
{
    public function store(Request $request){
        $request->validate([
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'duration' => 'required|integer',
        ]);

        $service = Service::create([
            'user_id' => $request->user()->id,
             'category_id' => $request->category_id,
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

    public function update(Request $request, $id){

        $service = Service::findOrFail($id);
              if ($service->user_id !== $request->user()->id) {
        return response()->json([
            'message' => 'Non autorisé'
        ], 403);
    }

            $request->validate([

            'category_id' => 'required|exists:categories,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'duration' => 'required|integer',
            ]);

            $service->update([
                'category_id' => $request->category_id,
                'title' => $request->title,
                'description' => $request->description,
                'price' => $request->price,
                'duration' => $request->duration,
            ]);

            return response()->json([
                'message' => 'Presation modifié avec succes',
                'service' => $service
            ]);
        }

    }


