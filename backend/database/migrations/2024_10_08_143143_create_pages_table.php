<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
   /**
    * Run the migrations.
    */
   public function up(): void
   {
      Schema::create('pages', function (Blueprint $table) {
         $table->id();
         $table->timestamps();
         $table->string('title', 200);
         $table->text('description');
         $table->bigInteger('author_id')->unsigned()->index()->nullable();
         $table->foreign('author_id')->references('id')->on('users')->onDelete('cascade');

      });
   }

   /**
    * Reverse the migrations.
    */
   public function down(): void
   {
      Schema::dropIfExists('pages');
   }
};
