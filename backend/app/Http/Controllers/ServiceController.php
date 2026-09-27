<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Service;

class ServiceController extends Controller
{
    public function store(Request $request)
{
    try {

        $validated = $request->validate([
            'category_id' => 'required|exists:categories,id',
            'title' => 'required|string|max:255',
            'description' => 'required|string',
            'price' => 'required|numeric',
            'duration' => 'required|integer',
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $imagePath = null;

        if ($request->hasFile('image')) {
            $imagePath = $request->file('image')
                ->store('services', 'public');
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
            'message' => 'Prestation ajoutée avec succès',
            'service' => $service->load(['category', 'user']),
        ], 201);

    } catch (\Illuminate\Validation\ValidationException $e) {

        return response()->json([
            'message' => 'Erreur de validation',
            'errors' => $e->errors(),
        ], 422);

    } catch (\Exception $e) {

        return response()->json([
            'message' => 'Erreur serveur',
            'error' => $e->getMessage(),
        ], 500);
    }
}

    public function show($id)
    {
        $service = Service::with(['category', 'user.services'])
            ->findOrFail($id);

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
            'image' => 'nullable|image|mimes:jpg,jpeg,png,webp|max:2048',
        ]);

        $imagePath = $service->image;

        if ($request->hasFile('image')) {

            if ($service->image) {
                $oldImage = storage_path('app/public/' . $service->image);

                if (file_exists($oldImage)) {
                    unlink($oldImage);
                }
            }

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
            'service' => $service->load('category'),
        ]);
    }

    public function destroy(Request $request, $id)
    {
        $service = Service::findOrFail($id);

        if ($service->user_id !== $request->user()->id) {
            return response()->json([
                'message' => 'Non autorisé'
            ], 403);
        }

        if ($service->image) {
            $imagePath = storage_path('app/public/' . $service->image);

            if (file_exists($imagePath)) {
                unlink($imagePath);
            }
        }

        $service->delete();

        return response()->json([
            'message' => 'Prestation supprimée avec succès'
        ]);
    }

    public function index()
    {
        $services = Service::with(['category', 'user'])->get();

        return response()->json($services);
    }
}