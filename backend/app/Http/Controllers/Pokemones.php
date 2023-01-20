<?php

namespace App\Http\Controllers;

use App\Models\Pokedex;
use App\Models\Usuarios;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class Pokemones extends Controller
{

    public function saveInformacion(Request $request)
    {
        try {

            $entrenador = $request->entrenador;
            $arrPokemones = $request->pokemones;

            //se guardara el usuario
            $dataUser = [
                "name" => $entrenador
            ];

            Usuarios::create($dataUser);

            //se va a obtener el id de entrenador
            $max_id = DB::table('users')->selectRaw('MAX(id) AS max_id')->get();

            //se va a ingresar los datos de los pokemones relacionando con el usuario
            foreach ($arrPokemones as $pokemon) {

                $dataPokemon = [
                    "number_pokedex" => $pokemon["id"],
                    "user_id" => $max_id[0]->max_id
                ];

                Pokedex::create($dataPokemon);
            }

            return ["estatus" => 200, "message" => "success", "response" => "ok"];
        } catch (Exception $e) {
            return ["estatus" => 0, "message" => $e->getMessage()];
        }
    }

    public function getEntrenadores(Request $request)
    {

        try {

            $dataEntrenadores = [];

            /* $usuarios = Usuarios::all(); */
            $usuarios = DB::table('users');

            //se obtiene registros
            $total_registros_bd = $usuarios;
            $total_registros_bd = $total_registros_bd->count();

            // se aplica paginado
            $pagina = isset($request->pagina) ? $request->pagina : 1;
            $registros_por_pagina = isset($request->registros_por_pagina) ? $request->registros_por_pagina : 10;
            $usuarios = $usuarios->skip($registros_por_pagina * ($pagina - 1))->take($registros_por_pagina)->get();

            // SE ARMA PAGINADO RESPONSE
            $paginado = [];
            $paginado['pagina'] = $pagina;
            $paginado['registros_por_pagina'] = $registros_por_pagina;
            $paginado['total_paginas'] = ceil($total_registros_bd / $registros_por_pagina);
            $paginado['total_registros'] = $total_registros_bd;

            foreach ($usuarios as $usuario) {
                $pokemones = DB::table('pokemon')->where('user_id', '=', $usuario->id)->get();
                $dataEntrenadores[] = [
                    "id" => $usuario->id,
                    "name" => $usuario->name,
                    "pokemones" => $pokemones
                ];
            }

            return ["estatus" => 200, "message" => "success", "paginado"=>$paginado, "response" => $dataEntrenadores];
        } catch (Exception $e) {
            return ["estatus" => 0, "message" => $e->getMessage()];
        }
    }
}
