<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Auth;

class TodoController extends Controller
{
   public function index()
   {
      //$items = Todo::all();
      $user_id = Auth::user()->id;
      // error_log(message: $user_id);
      // $items = Todo::where('author_id', "=", $user_id)->get();
      // $items = Todo::whereHas('page', function ($query) use ($user_id) {
      //    $query->where('author_id', $user_id);
      // })->get();
      $items = DB::table('todos')
         ->join('pages', 'todos.page_id', '=', 'pages.id')
         ->select('todos.*')
         ->where('pages.author_id', '=', $user_id)
         ->get();
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
         'page_id' => $request->get('page_id'),
      ]);
      return response()->json($item, 201);
   }

   public function update(Request $request, $id)
   {
      $item = Todo::find($id);
      $item->update($request->only(["title", "content", "is_done"]));
      // all()
      return response()->json($item, 200);
   }

   public function destroy($id)
   {
      Todo::destroy($id);
      return response()->json(null, 204);
   }
}
