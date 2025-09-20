<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Student2 extends Model
{
    use HasFactory;
    protected $guarded = ['created_at','updated_at'];

    public function feecode(): HasOne
    {
        return $this->hasOne(FeeCode::class);
    }
}
