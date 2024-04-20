<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FormController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::get('/formulario', [FormController::class, 'getAll']);

Route::get('/formulario/{id}', [FormController::class, 'FormById']);

Route::post('/formulario', [FormController::class, 'CreateForm']);

Route::patch('/formulario/{id}', [FormController::class, 'UpdatePartialForm']);

Route::delete('/formulario/{id}', [FormController::class, 'DeleteForm']);