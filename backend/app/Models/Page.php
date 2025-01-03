<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;

class Page extends Model
{
   use HasFactory;

   protected $fillable = [
      'title',
      'description',
      'author_id',
   ];

   /**
    * The table associated with the model.
    *
    * @var string
    */
   protected $table = 'pages';
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
   protected static function booted(): void
   {
      static::creating(function (Page $page) {
         $page->author_id = auth()->id();
      });

      static::addGlobalScope(function (Builder $builder) {
         $builder->where('author_id', auth()->id());
      });
   }
}
