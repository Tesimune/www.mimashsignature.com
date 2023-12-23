<?php

namespace App\Http\Controllers;

use App\Models\OrderPickupPrice;
use App\Models\Products;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;
use Inertia\Inertia;

class StoreController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function stores()
    {
        return Inertia::render('Store/Stores', [
            'stores' => Store::all()
        ]);
    }

    /**
     * Display the specified resource.
     */
    public function view(Store $store)
    {
        return Inertia::render('Store/View', [
            'store' => $store,
            'products' => Products::where('store_id', $store->id)->latest()->get(),
        ]);
    }



    /**
     * Display a listing of the resource.
     */
    public function index(Store $store)
    {
        $user_id = auth()->user()->id;
        return Inertia::render('Store/Index', [
            'stores' => Store::where('user_id', $user_id)->latest()->get(),
        ]);
    }


    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Store/Create');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'email' => ['required', 'string'],
            'tel' => ['required', 'string'],
            'country' => ['required', 'string'],
            'state' => ['required', 'string'],
            'zip_code' => ['required', 'string'],
            'store_address' => ['string'],
            'store_name' => ['required', 'string', 'unique:stores'],
            'store_type' => ['required', 'string'],
            'store_description' => ['required', 'string'],
        ]);

        $user_id = auth()->user()->id;
        $username = str_replace(' ', '-', $validated['store_name']);

        Store::create([
            'user_id' => $user_id,
            'username' => $username,
            'email' => $validated['email'],
            'tel' => $validated['tel'],
            'country' => $validated['country'],
            'state' => $validated['state'],
            'zip_code' => $validated['zip_code'],
            'store_address' => $validated['store_address'],
            'store_name' => $validated['store_name'], // Pass the actual value
            'store_type' => $validated['store_type'],
            'store_description' => $validated['store_description'],
        ]);

        return redirect()->route('myStores.index');
    }



    /**
     * Display the specified resource.
     */
    public function show(Store $store)
    {
        return Inertia::render('Store/Show', [
            'store' => $store,
            'products' => Products::where('store_id', $store->id)->latest()->get(),
        ]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Store $store)
    {
        return Inertia::render('Store/Edit', [
            'store' => $store,
            'orderPickupPrices' => OrderPickupPrice::where('store_id', $store->id)->get()
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Store $store)
    {
        $validated = $request->validate([
            'username' => [
                'required',
                'string',
                Rule::unique('stores')->ignore($store->id),
            ],
            'email' => ['required', 'string'],
            'tel' => ['required', 'string'],
            'country' => ['required', 'string'],
            'state' => ['required', 'string'],
            'zip_code' => ['required', 'string'],
            'store_address' => ['string'],
            'store_name' => [
                'required',
                'string',
                Rule::unique('stores')->ignore($store->id),
            ],
            'store_type' => ['required', 'string'],
            'store_description' => ['required', 'string'],
        ]);

        $username = str_replace(' ', '-', $validated['store_name']);

        $store->username = $username;
        $store->email = $validated['email'];
        $store->tel = $validated['tel'];
        $store->country = $validated['country'];
        $store->state = $validated['state'];
        $store->zip_code = $validated['zip_code'];
        $store->store_address = $validated['store_address'];
        // $store->store_logo = $validated['store_logo'];
        $store->store_name = $validated['store_name'];
        $store->store_type = $validated['store_type'];
        $store->store_description = $validated['store_description'];
        // $store->status = $validated['email'];
        $store->save();

        return redirect()->route('myStores.index');
    }





    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Store $store)
    {
        $store->delete();
        return redirect()->route( 'myStores.index');
    }
}
