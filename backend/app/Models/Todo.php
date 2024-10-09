<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Todo extends Model
{
   use HasFactory;


   protected $fillable = [
      'title',
      'content',
      'author_id',
   ];

   /**
    * The table associated with the model.
    *
    * @var string
    */
   protected $table = 'todos';
   /**
    * The primary key associated with the table.
    *
    * @var string
    */
   protected $primaryKey = 'id';

   /**
    * Indicates if the model's ID is auto-incrementing.
    *
    * @var bool
    */
   public $incrementing = true;

}

