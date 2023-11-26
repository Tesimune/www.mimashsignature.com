<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Order extends Model
{
    use HasFactory;
    protected $fillable = [
        'slug',
        'reference',
        'order_status',
        'store_id',
        'user_id',
        'order_type',
        'total_price',
        'paid_price',
        'received',
        'charges',
        'order_from',
        'order_to',
        'description',
        'content',         
    ];
     

    protected $casts = [
        'order_from' => 'array',
        'order_to' => 'array',
        'content' => 'array',
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