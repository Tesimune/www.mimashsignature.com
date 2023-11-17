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
        Schema::create('stores', function (Blueprint $table) {
            $table->id();
            $table->string('user_id');
            $table->string('username')->unique();
            $table->string('email');
            $table->string('tel');
            $table->string('country');
            $table->string('state');
            $table->string('lga')->nullable();
            $table->string('zip_code')->nullable();
            $table->string('store_address');
            $table->string('store_logo')->nullable();
            $table->string('store_name');
            $table->string('store_type');
            $table->text('store_description');
            $table->string('status')->default('active');
            $table->string('validation')->default('default');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('stores');
    }
};
