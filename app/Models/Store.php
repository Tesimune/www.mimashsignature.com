<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Store extends Model
{
    use HasFactory;
    protected $fillable = [
        'username',
        'email',
        'tel',
        'store_address',
        'store_type',
        'store_description',
        'status',
    ];

    public function user()
    {
        return $this->belongsTo(User::class);
    }
}

