<?php

use App\Http\Controllers\ImageController;
use App\Http\Controllers\ProfileController;
use App\Models\Order;
use App\Models\Products;
use App\Models\Store;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return Inertia::render('Welcome', [
        'products' => Products::where('store_id', 2)->latest()->get(),
        'canLogin' => Route::has('login'),
        'canRegister' => Route::has('register'),
        'laravelVersion' => Application::VERSION,
        'phpVersion' => PHP_VERSION,
    ]);
})->name('home');

Route::get('/dashboard', function () {
    return Inertia::render('Dashboard', [
        'order' => Order::where('user_id', auth()->user('id'))->get(),
    ]);
})->middleware(['auth', 'verified'])->name('dashboard');

Route::get('/{store:username}/cart', function (Store $store) {
    return Inertia::render('Cart', [
        'store' => $store
    ]);
})->name('cart');

Route::get('/{store:username}/cart/payment', function (Store $store) {
    $PAYSTACK_PUBLIC_KEY = env('PAYSTACK_PUBLIC_KEY');
    return Inertia::render('Payment', [
        'store' => $store,
        'paystack_pub' => $PAYSTACK_PUBLIC_KEY
    ]);
})->name('cart.pay');

Route::post('/upload', [ImageController::class, 'store'])->name('upload');

Route::middleware('auth')->group(function () {
    Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
    Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
    Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
});

require __DIR__.'/auth.php';
require __DIR__ . '/web/store.php';
require __DIR__ . '/web/products.php';
