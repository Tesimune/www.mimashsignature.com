<?php

namespace App\Http\Controllers;

use App\Models\Order;
use App\Models\Store;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;

class OrderController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function view()
    {
        $reference = "2";
        return inertia::render('Store/Order/View', [
            'orders' => Order::where('reference', $reference)->get()
        ]);
    }
    /**
     * Display a listing of the resource.
     */
    public function index(Store $store)
    {
        return Inertia::render('Store/Order/Index', [
            'orders' => Order::where('store_id', $store)->get()
        ]);
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
    public function store(Request $request, Store $store)
    {
        $validated = $request->validate([
            'reference' => ['required'],
            'total_price' => ['required'],
            'paid_price' => ['required'],
            'received' => ['required'],
            'charges' => ['required'],
            'order_from' => ['required'],
            'order_to' => ['required'],
            // 'description' => ['max:9999'],
            'content' => ['required'],
        ]);

        // Auto-generate the slug using a combination of the reference and a unique identifier
        $slug = Str::slug($validated['reference'] . '-' . Str::random(8));
        $validated['slug'] = $slug;

        // Add user_id to the validated array
        $validated['user_id'] = auth()->user()->id;
        $validated['store_id'] = $store->id;

        $validated['order_status'] = "1"; // 0 Invoice, 1 Paid and pending, 2 Shipped 3 Received
        $validated['order_type'] = "1"; // 1 full payment, 2 pay on delivery, 3 part payments

        // Debugging to ensure the correct data is present
        // dd($validated);

        Order::create($validated);

        return redirect(route('order.view', $slug));
    }


    /**
     * Display the specified resource.
     */
    public function show(Order $order)
    {
        return Inertia::render('Store/Order/Show', [
            'order' => $order
        ]);
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
    public function update(Request $request, Order $order)
    {
        $validated = $request->validate([
            'slug' => ['required', 'string'],
            'reference' => ['required', 'string'],
            'order_status' => ['required', 'string'],
            'order_type' => ['required', 'string'],
            'total_price' => ['required', 'string'],
            'paid_price' => ['required', 'string'],
            'received' => ['required', 'string'],
            'charges' => ['required', 'string'],
            'order_from' => ['required', 'string'],
            'order_to' => ['required', 'string'],
            'description' => ['required', 'string'],
            'content' => ['required', 'string'],
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        //
    }
}
