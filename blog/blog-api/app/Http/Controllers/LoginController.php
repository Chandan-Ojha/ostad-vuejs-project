<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class LoginController extends Controller
{
    protected function login(Request $request)
    {
        $username = $request->input('username');
        $password = $request->input('password');

        //check username and password from post and return true
        if($username == 'admin' && $password == 'admin')
        {
            //return a username, id with role
            return response()->json([
                'user' => [
                    'id'=>1,
                    'username'=>'Admin',
                    'role'=>'admin'
                ]
            ]);
        }
        elseif($username == 'editor' && $password == 'editor')
        {
            //return a username, id with role
            return response()->json([
                'user' => [
                    'id'=>2,
                    'username'=>'Editor',
                    'role'=>'editor'
                ]
            ]);
        }
        else
        {
            return response()->json([
                'error' => 'Invalid username or password'
            ]);
        }

    }

}
