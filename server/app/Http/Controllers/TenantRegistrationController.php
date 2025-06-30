<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Artisan;
use App\Models\Tenant;
use App\Models\User;
use Carbon\Carbon;

class TenantRegistrationController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'company_name' => 'required|string|max:255',
            'name' => 'required|string|max:255',
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);

        // Create tenant in central DB
        $subdomain = strtolower(preg_replace('/[^a-z0-9]+/', '', $request->company_name));
        $tenant = Tenant::create([
            'name' => $request->company_name,
            'subdomain' => $subdomain,
            'trial_ends_at' => Carbon::now()->addDays(14),
        ]);

        // Create tenant database
        $tenantDbName = 'tenant_' . $tenant->id;
        DB::statement("CREATE DATABASE IF NOT EXISTS `$tenantDbName` CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci");

        // Set up tenant connection
        config(['database.connections.tenant.database' => $tenantDbName]);
        DB::purge('tenant');
        DB::reconnect('tenant');

        // Run tenant migrations
        Artisan::call('migrate', [
            '--database' => 'tenant',
            '--path' => '/database/migrations/tenant',
            '--force' => true,
        ]);

        // Create admin user in tenant DB
        $admin = new User([
            'name' => $request->name,
            'email' => $request->email,
            'password' => Hash::make($request->password),
        ]);
        $admin->setConnection('tenant');
        $admin->save();

        return response()->json([
            'message' => 'Tenant registered successfully!',
            'tenant' => $tenant,
            'admin' => $admin,
            'login_url' => "https://{$subdomain}.raqmena.app/login"
        ]);
    }
} 