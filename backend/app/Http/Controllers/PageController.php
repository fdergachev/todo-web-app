<?php

namespace App\Http\Controllers;

use App\Models\Page;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;

class PageController extends Controller
{
   public function index()
   {
      $items = Page::orderBy('updated_at', 'desc')->get();
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
      ]);
      return response()->json($item, 201);
   }

   public function update(Request $request, $id)
   {
      $item = Page::find($id);
      if ($item) {
         $item->update($request->only(["title", "description"]));
         return response()->json($item, 200);
      }
      return response()->json(null, 404);
      // all()
   }

   public function destroy($id)
   {
      Page::destroy($id);
      return response()->json(null, 204);
   }
}
