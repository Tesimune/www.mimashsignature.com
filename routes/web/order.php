<?php

use App\Http\Controllers\OrderController;
use Illuminate\Support\Facades\Route;

Route::get('/order/{order:slug}', [OrderController::class, 'view'])->name('order.view');

Route::middleware('auth')->prefix("/{store:username}/order/")->name("order.")->group(function () {
    Route::get('/create', [OrderController::class, 'create'])->name('create');
    Route::post('/order', [OrderController::class, 'store'])->name('store');
    Route::get('/order', [OrderController::class, 'show'])->name('show');
    Route::get('/{order:id}', [OrderController::class, 'edit'])->name('edit');
    Route::put('/update/{order}', [OrderController::class, 'update'])->name('update');
    // Route::delete('/delete/{order}', [OrderController::class, 'destroy'])->name('destroy');
});
