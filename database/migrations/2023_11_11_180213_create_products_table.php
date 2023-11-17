<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('products', function (Blueprint $table) {
            $table->id();
            $table->string('name');
            $table->integer('cost_price')->nullable();
            $table->integer('selling_price');
            $table->integer('discount')->nullable();
            $table->integer('quantity')->nullable();
            $table->text('description')->nullable();
            $table->text('image');
            $table->text('tag')->nullable();
            $table->text('color')->nullable();
            $table->text('size')->nullable();
            $table->foreignId('store_id')->references('id')->on('stores');
            $table->foreignId('user_id')->references('id')->on('users');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('products');
    }
};
