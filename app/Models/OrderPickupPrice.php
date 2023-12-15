<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class OrderPickupPrice extends Model
{
    use HasFactory;
    protected $fillable = [
        'store_id',
        'country',
        'state',
        'location_and_price',
    ];

    protected $casts = [
        'location_and_price' => 'array',
    ];

    public function store()
    {
        return $this->belongsTo(Store::class);
    }
}
