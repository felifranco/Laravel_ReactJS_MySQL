<?php

namespace App\Http\Controllers;

use Validator;
use Illuminate\Http\Request;
use App\Models\Form;

class FormController extends Controller
{
    public function getAll()
    {
        $forms = Form::all();

        return response()->json([
            'valid' => true,
            'data' => $forms,
        ], 200);
    }

    public function FormById($id)
    {
        $form = Form::find($id);

        if (is_null($form)) {
            return response()->json([
                'valid' => false,
                'message' => 'No existe el formulario'
            ], 400);
        }

        return response()->json([
            'valid' => true,
            'data' => $form
        ], 200);
    }

    public function CreateForm(Request $request)
    {
        $validatedData = Validator::make($request->all(), [
            'name' => 'required|string|min:3|max:100',
            'email' => 'required|string|min:10|max:100',
            'birth' => 'required|date_format:Y-m-d',
            'message' => 'required|string',
        ]);

        if($validatedData->fails()) {
            return response()->json([
                'valid' => false,
                'message' => $validatedData->errors()->all()
            ], 400);
        }

        $form = new Form;

        $form->name = $request->name;
        $form->email = $request->email;
        $form->birth = $request->birth;
        $form->message = $request->message;
        $form->image = $request->image;

        $form->save();
        
        return response()->json([
            'valid' => true,
            'message' => 'Formulario creado correctamente.',
            'data' => $form
        ], 200);
    }

    public function UpdatePartialForm(Request $request, $id)
    {
        $form = Form::find($id);

        if (is_null($form)) {
            return response()->json([
                'valid' => false,
                'message' => 'No existe el formulario'
            ], 400);
        }

        $validatedData = Validator::make($request->all(), [
            'name' => 'string|min:3|max:100',
            'email' => 'string|min:10|max:100',
            'birth' => 'date_format:Y-m-d',
            'message' => 'string',
        ]);

        if($validatedData->fails()) {
            return response()->json([
                'valid' => false,
                'message' => $validatedData->errors()->all()
            ], 400);
        }

        if($request->has('name')) {
            $form->name = $request->name;
        }

        if($request->has('email')) {
            $form->email = $request->email;
        }

        if($request->has('birth')) {
            $form->birth = $request->birth;
        }

        if($request->has('message')) {
            $form->message = $request->message;
        }

        if($request->has('image')) {
            $form->image = $request->image;
        }

        $form->save();

        return response()->json([
            'valid' => true,
            'message' => 'Formulario actualizado correctamente.',
            'data' => $form,
        ], 200);
    }

    public function DeleteForm($id)
    {
        $form = Form::find($id);
        if (is_null($form)) {
            return response()->json([
                'valid' => false,
                'message' => 'No existe el formulario'
            ], 400);
        }

        $form->delete();

        return response()->json([
            'valid' => true,
            'message' => 'Formulario eliminado correctamente.',
        ], 200);
    }
    
}
