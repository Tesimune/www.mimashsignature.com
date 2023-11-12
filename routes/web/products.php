<?php

use App\Http\Controllers\ProductsController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')->group(function () {
    Route::get('/products', [ProductsController::class, 'index'])->name('products');
    Route::get('/product', [ProductsController::class, 'show'])->name('product.edit');
    Route::get('/product', [ProductsController::class, 'edit'])->name('product.edit');
    Route::patch('/product', [ProductsController::class, 'update'])->name('product.update');
    Route::delete('/product', [ProductsController::class, 'destroy'])->name('product.destroy');
});