<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;
class ServiceController extends Controller
{
    public function store(Request $request)
{
    $request->validate([
        'category_id' => 'required|exists:categories,id',
        'title' => 'required|string|max:255',
        'description' => 'required|string',
        'price' => 'required|numeric',
        'duration' => 'required|integer',
        'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
    ]);

    $imagePath = null;

    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('services', 'public');
    }

    $service = Service::create([
        'user_id' => $request->user()->id,
        'category_id' => $request->category_id,
        'title' => $request->title,
        'description' => $request->description,
        'price' => $request->price,
        'duration' => $request->duration,
        'image' => $imagePath,
    ]);

    return response()->json([
        'message' => 'Prestation ajoutée avec succes',
        'service' => $service->load('category')
    ], 201);
}
    public function show($id)
{
    $service = Service::with(['category', 'user.services'])->findOrFail($id);

    return response()->json($service);
}

  public function update(Request $request, $id)
{
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
        'image' => 'nullable|image|mimes:jpeg,png,jpg,webp|max:2048',
    ]);

    $imagePath = $service->image;

    if ($request->hasFile('image')) {
        $imagePath = $request->file('image')->store('services', 'public');
    }

    $service->update([
        'category_id' => $request->category_id,
        'title' => $request->title,
        'description' => $request->description,
        'price' => $request->price,
        'duration' => $request->duration,
        'image' => $imagePath,
    ]);

    return response()->json([
        'message' => 'Prestation modifiée avec succès',
        'service' => $service->load('category')
    ]);
}

        public function destroy(Request $request, $id){
                       
        $service = Service::findOrFail($id);

        if($service->user_id !==$request->user()->id){
            return response()->json([

            'message' => 'Non autorisé'
            ],403);
        }

        $service->delete();
        return response()->json([
            'message' => 'Prestation supprimée avec succès'
        ]);
        }


        public function index(){

        $service = Service::with(['category', 'user'])->get();

        return response()->json($service);
        }

    }


