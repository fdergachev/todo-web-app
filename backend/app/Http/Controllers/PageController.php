<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PageController extends Controller
{
   public function index()
   {
      //$items = Todo::all();
      $user_id = Auth::user()->id;
      // error_log(message: $user_id);
      $items = Page::where('author_id', "=", $user_id)->get();
      return response()->json($items);
   }

   public function show($id)
   {
      $item = Page::find($id);
      return response()->json($item);
   }

   public function store(Request $request)
   {
      $item = Page::create([
         'title' => $request->get('title'),
         'description' => $request->get('description'),
         'author_id' => Auth::user()->id
      ]);
      return response()->json($item, 201);
   }

   public function update(Request $request, $id)
   {
      $item = Page::find($id);
      $item->update($request->only(["title", "description"]));
      // all()
      return response()->json($item, 200);
   }

   public function destroy($id)
   {
      Page::destroy($id);
      return response()->json(null, 204);
   }
}
