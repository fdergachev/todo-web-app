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
         $table->bigInteger('author_id')->unsigned()->index()->nullable();
         $table->foreign('author_id')->references('id')->on('users')->onDelete('cascade');
         $table->timestamps();
      });
   }

   public function down()
   {
      Schema::drop('todos');
   }
};
