<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Products extends Model
{
    use HasFactory;
    protected $fillable = [
        'name', 
        'cost_price', 
        'selling_price', 
        'discount', 
        'quantity', 
        'description', 
        'image',
        'color',
        'size',
        'category',
        'tag',
        'store_id',
        'user_id', 
    ];

    protected $casts = [
        'image' => 'array',
        'color' => 'array',
        'size' => 'array',
        'tag' => 'array',
    ];
    

    public function user()
    {
        return $this->belongsTo(User::class);
    }
    public function store()
    {
        return $this->belongsTo(Store::class);
    }
}