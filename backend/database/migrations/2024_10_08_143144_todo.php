<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
   public function up()
   {
      Schema::create('todos', function (Blueprint $table) {
         $table->increments('id');
         $table->string('title', 200);
         $table->string('content', 500);
         $table->boolean('is_done')->default(false);
         $table->bigInteger('page_id')->unsigned()->index()->nullable();
         $table->foreign('page_id')->references('id')->on('pages')->onDelete('cascade');
         $table->timestamps();
      });
   }

   public function down()
   {
      Schema::drop('todos');
   }
};
