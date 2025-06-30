<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use App\Models\Tenant;
use Spatie\Multitenancy\Models\Tenant as SpatieTenant;

class IdentifyTenantFromSubdomain
{
    public function handle(Request $request, Closure $next)
    {
        $host = $request->getHost();
        $subdomain = explode('.', $host)[0];

        $tenant = Tenant::where('subdomain', $subdomain)->first();
        if ($tenant) {
            SpatieTenant::current($tenant);
        }

        return $next($request);
    }
} 