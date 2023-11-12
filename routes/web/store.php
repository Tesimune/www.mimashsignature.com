<?php

use App\Http\Controllers\StoreController;
use Illuminate\Support\Facades\Route;


Route::middleware('auth')->group(function () {
    Route::get('/stores', [StoreController::class, 'index'])->name('stores');
    Route::get('/store', [StoreController::class, 'show'])->name('store.show');
    Route::get('/store/create', [StoreController::class, 'create'])->name('store.create');
    Route::get('/store/edit', [StoreController::class, 'edit'])->name('store.edit');
    Route::patch('/store', [StoreController::class, 'update'])->name('store.update');
    Route::delete('/store', [StoreController::class, 'destroy'])->name('store.destroy');
});
