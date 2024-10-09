<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;
use Illuminate\Support\Facades\Auth;
class TodoController extends Controller
{
   public function index()
   {
      //$items = Todo::all();
      $user_id = Auth::user()->id;
      // error_log(message: $user_id);
      $items = Todo::where('author_id', "=", $user_id)->get();
      return response()->json($items);
   }

   public function show($id)
   {
      $item = Todo::find($id);
      return response()->json($item);
   }

   public function store(Request $request)
   {
      $item = Todo::create([
         'title' => $request->get('title'),
         'content' => $request->get('content'),
         'author_id' => Auth::user()->id
      ]);
      return response()->json($item, 201);
   }

   public function update(Request $request, $id)
   {
      $item = Todo::find($id);
      $item->update($request->all());
      return response()->json($item, 200);
   }

   public function destroy($id)
   {
      Todo::destroy($id);
      return response()->json(null, 204);
   }
}
