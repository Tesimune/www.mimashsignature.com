<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    use HasFactory;
    protected $fillable = [
        'user_id',
        'username',
        'email',
        'tel',
        'country',
        'state',
        'zip_code',
        'store_address',
        'store_logo',
        'store_name',
        'store_type',
        'store_description',
        'status',
    ];
    
    public function products()
    {
        return $this->hasMany(Products::class);
    }

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

