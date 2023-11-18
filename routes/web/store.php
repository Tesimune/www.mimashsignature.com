<?php

use App\Http\Controllers\StoreController;
use Illuminate\Support\Facades\Route;


Route::get('/stores', [StoreController::class, 'stores'])->name('stores.stores');
Route::get('/{store:username}', [StoreController::class, 'view'])->name('store.view');


Route::middleware('auth')->get('/mystores/store', [StoreController::class, 'index'])->name('myStores.index');

Route::middleware('auth')->prefix("/mystore")->name("myStore.")->group(function () {
    Route::get('/create', [StoreController::class, 'create'])->name('create');
    Route::post('/store', [StoreController::class, 'store'])->name('store');
    Route::get('/{store:username}', [StoreController::class, 'show'])->name('show');
    Route::get('/edit/{store:username}', [StoreController::class, 'edit'])->name('edit');
    Route::put('/store/{store:username}', [StoreController::class, 'update'])->name('update');
    Route::delete('/delete/{store:username}', [StoreController::class, 'destroy'])->name('destroy');
});
