<?php

namespace App\Http\Controllers;

use App\Models\ProductCategory;
use App\Models\Store;
use Illuminate\Http\Request;

class ProductCategoryController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'name' => ['required', 'string'],
            'description' => ['max:225'],
            'store_id' => ['required'],
        ]);

        // Add user_id to the validated array
        $validated['user_id'] = auth()->user()->id;

        // Debugging to ensure the correct data is present
        // dd($validated);

        ProductCategory::create($validated);
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Store $store, ProductCategory $productCategory)
    {
        $validated = $request->validate([
            'name' => ['required', 'string'],
            'description' => ['required', 'string'],
        ]);

        $productCategory->name = $validated['name'];
        $productCategory->description = $validated['description'];
        $productCategory->save();

    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Store $store, ProductCategory $productCategory)
    {
        $productCategory->delete();
    }
}
