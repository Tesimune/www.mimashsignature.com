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
        Schema::create('orders', function (Blueprint $table) {
            $table->id();
            $table->string('slug');
            $table->string('reference');
            $table->string('order_status');
            $table->string('store_id');
            $table->string('user_id')->nullable();
            $table->string('order_type')->nullable();
            $table->string('total_price');
            $table->integer('paid_price');
            $table->integer('received');
            $table->integer('charges');
            $table->text('order_from');
            $table->text('order_to');
            $table->text('description')->nullable();
            $table->text('content');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('orders');
    }
};
