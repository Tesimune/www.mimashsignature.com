<?php

namespace App\Http\Controllers;

use App\Models\ImageUpload;
use App\Models\Products;
use App\Models\Store;
use Illuminate\Auth\Events\Validated;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProductsController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Store $store)
    {
        return Inertia::render('Store/Product/Index', [
            'products' => Products::where('store_id', $store->id)->latest()->get(),
        ]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create(Store $store)
    {
        // $this->authorize('create', Product::class);
        return Inertia::render('Store/Product/Create',[
            'store' => $store,
            'thumbnails' => ImageUpload::all(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request, Store $store)
    {
        $validated = $request->validate([
            'name' => ['required', 'string'],
            'cost_price' => ['numeric'],
            'selling_price' => ['required', 'numeric'],
            'discount' => ['required', 'numeric'],
            'quantity' => ['required', 'numeric'],
            'description' => ['required', 'string'],
            'image' => ['required'],
            'color' => [],
            'size' => [],
            'tag' => [],
            'store_id' => ['required'],
        ]);

        // Add user_id to the validated array
        $validated['user_id'] = auth()->user()->id;

        // Debugging to ensure the correct data is present
        // dd($validated);

        Products::create($validated);

        return redirect(route('myStore.show', $store->username));
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
    public function edit(Store $store, Products $product)
    {
        return Inertia::render('Store/Product/Edit', [
            'store' => $store,
            'product' => $product,
            'thumbnails' => ImageUpload::all(),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request$request, Store $store, Products $product)
    {
        $validated = $request->validate([
            'name' => ['required', 'string'],
            // Assuming cost_price can be nullable
            'cost_price' => ['numeric', 'nullable'], 
            'selling_price' => ['required', 'numeric'],
            'discount' => ['required', 'numeric'],
            'quantity' => ['required', 'numeric'],
            'description' => ['required', 'string'],
            'image' => ['required'],
            // Assuming color, size, and tag can be nullable or have specific validation rules
            'color' => [], 
            'size' => [],
            'tag' => [],
        ]);

        $product->name = $validated['name'];
        $product->cost_price = $validated['cost_price'];
        $product->selling_price = $validated['selling_price'];
        $product->discount = $validated['discount'];
        $product->quantity = $validated['quantity'];
        $product->description = $validated['description'];
        $product->image = $validated['image'];
        $product->color = $validated['color'];
        $product->size = $validated['size'];
        $product->tag = $validated['tag'];
        $product->save();

        return redirect(route('myStore.show', $store->username));

    }


    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Store $store, Products $product)
    {
        $product->delete();
        return redirect(route('myStore.show', $store->username));
    }
}
