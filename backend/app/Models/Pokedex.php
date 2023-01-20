<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pokedex extends Model
{
    use HasFactory;

    protected $table = 'pokemon';
    public $timestamps = false;
    protected $fillable = ['number_pokedex', 'user_id'];
}
