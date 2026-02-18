<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Laravel\Fortify\Features;


Route::get('/', function () {
    return Inertia::render('welcome', [
        'canRegister' => Features::enabled(Features::registration()),
    ]);
})->name('home');

// Hal route oo dashboard ah oo leh middleware sax ah
Route::get('/dashboard', function () {
    return Inertia::render('apps/dashboard');
})->middleware(['auth', 'verified'])->name('dashboard');

// Landing page
Route::get('/landing', function () {
    return Inertia::render('apps/landing');
})->name('landing');

// Signin page
Route::get('/signin', function () {
    return Inertia::render('apps/signin');
})->name('signin');

// Signup page
Route::get('/signup', function () {
    return Inertia::render('apps/signup');
})->name('signup');

// Login POST route with proper Auth and error handling for Inertia
Route::post('/signin', function(Request $request) {
    $credentials = $request->only('email', 'password');

    if (Auth::attempt($credentials)) {
        $request->session()->regenerate();
        return redirect()->intended('apps/dashboard');
    }

    return Inertia::render('apps/signin', [
        'errors' => ['email' => 'The provided credentials do not match our records.'],
    ]);
})->name('signin.post');
// Logout route
Route::post('/logout', function(Request $request) {
    Auth::logout();
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return redirect('/');
})->name('logout');

require __DIR__.'/settings.php';
