<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\TodoController;
use App\Http\Controllers\AuthController;

// Route::get('/user', function (Request $request) {
//    return $request->user();
// })->middleware('auth:sanctum');


Route::group(['middleware' => 'auth:sanctum'], function () {
   Route::get('/todos', [TodoController::class, 'index']);
   Route::get('/todos/{id}', [TodoController::class, 'show']);
   Route::post('/todos', [TodoController::class, 'store']);
   Route::put('/todos/{id}', [TodoController::class, 'update']);
   Route::delete('/todos/{id}', [TodoController::class, 'destroy']);
});



Route::group(['prefix' => 'auth'], function () {
   Route::post('login', [AuthController::class, 'login']);
   Route::post('register', [AuthController::class, 'register']);

   Route::group(['middleware' => 'auth:sanctum'], function () {
      Route::get('logout', [AuthController::class, 'logout']);
      Route::get('user', [AuthController::class, 'user']);
   });
});