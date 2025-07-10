<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Database\Eloquent\Relations\HasOne;

class Student extends Model
{
    use HasFactory;
    protected $guarded = ['created_at','updated_at'];

    public function information(): HasOne
    {
        return $this->hasOne(Information::class);
    }

    public function address(): HasOne
    {
        return $this->hasOne(Address::class);
    }

    public function education(): HasOne
    {
        return $this->hasOne(Education::class);
    }

    public function file(): HasOne
    {
        return $this->hasOne(File::class);
    }


}
