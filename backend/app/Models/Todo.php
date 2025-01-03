<?php

namespace App\Models;

use DB;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Builder;
class Todo extends Model
{
   use HasFactory;


   protected $fillable = [
      'title',
      'content',
      'is_done',
      'page_id',
      // 'author_id',
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

   public function page()
   {
      return $this->belongsTo(Page::class);
   }

   protected static function booted(): void
   {
      static::creating(function (Todo $todo) {
         $page = DB::table('pages')
            ->where([['pages.id', "=", $todo->page_id], ['author_id', "=", auth()->id()]])
            ->first();
         if ($page) {
            $todo->page_id = $page->id;
         } else {
            abort(401);
         }
      });

      static::addGlobalScope("todos", function (Builder $builder) {
         $builder->whereHas('page', function (Builder $query) {
            $query->where('author_id', auth()->id());
         });
      });

      static::deleting(function ($model) {
         // This ensures the WHERE clause uses the fully qualified column name
         $model->qualifyColumn('id');
      });
   }
}

