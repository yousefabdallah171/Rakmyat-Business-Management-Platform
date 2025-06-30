<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Mail;
use App\Models\Tenant;
use App\Models\User;
use Carbon\Carbon;

class RegistrationController extends Controller
{
    public function register(Request $request)
    {
        $request->validate([
            'company_name' => 'required|string|max:255',
            'admin_name' => 'required|string|max:255',
            'admin_email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);

        // Generate unique subdomain
        $subdomain = strtolower(preg_replace('/[^a-z0-9]+/', '', $request->company_name));
        if (Tenant::where('subdomain', $subdomain)->exists()) {
            return response()->json(['error' => 'Subdomain already taken.'], 422);
        }

        // Create tenant in central DB
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

        // Validate unique email in tenant DB
        if (User::on('tenant')->where('email', $request->admin_email)->exists()) {
            return response()->json(['error' => 'Admin email already exists in this company.'], 422);
        }

        // Create admin user in tenant DB
        $admin = new User([
            'name' => $request->admin_name,
            'email' => $request->admin_email,
            'password' => Hash::make($request->password),
        ]);
        $admin->setConnection('tenant');
        $admin->save();

        // Send welcome email
        try {
            Mail::raw(
                "Welcome to Raqmena!\nYour company has been registered.\nLogin: https://{$subdomain}.raqmena.app/login\nEmail: {$request->admin_email}\nPassword: (the one you set)",
                function ($message) use ($request) {
                    $message->to($request->admin_email)
                        ->subject('Welcome to Raqmena!');
                }
            );
        } catch (\Exception $e) {
            // Log or handle mail error
        }

        // Redirect URL
        $redirectUrl = "https://{$subdomain}.raqmena.app";

        return response()->json([
            'message' => 'Company registered successfully!',
            'tenant' => $tenant,
            'admin' => $admin,
            'redirect_url' => $redirectUrl
        ]);
    }
} 