<?php

namespace App\Providers;

use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        //
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        //
    }

    /**
     * Security best practices:
     * - Use Eloquent or query builder (never raw SQL with user input)
     * - Validate and sanitize all user input (see FormRequest classes)
     * - Escape output in Blade: {{ $var }}
     * - Use Hash::make for password storage
     */
}
