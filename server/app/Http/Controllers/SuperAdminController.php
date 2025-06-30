<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Tenant;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Artisan;
use Illuminate\Support\Facades\Log;

class SuperAdminController extends Controller
{
    // GET /super/tenants
    public function tenants()
    {
        $tenants = Tenant::all();
        return response()->json(['tenants' => $tenants]);
    }

    // PUT /super/tenants/{id}
    public function updateTenant(Request $request, $id)
    {
        $tenant = Tenant::findOrFail($id);
        $tenant->fill($request->only(['name', 'subdomain', 'trial_ends_at', 'active']));
        if ($request->has('extend_trial_days')) {
            $tenant->trial_ends_at = now()->addDays($request->extend_trial_days);
        }
        if ($request->has('deactivate')) {
            $tenant->active = !$request->deactivate;
        }
        $tenant->save();
        return response()->json(['tenant' => $tenant]);
    }

    // GET /super/stats
    public function stats()
    {
        $tenantCount = Tenant::count();
        $activeTenants = Tenant::where('active', true)->count();
        $userCount = DB::table('users')->count(); // Central users
        return response()->json([
            'tenants' => $tenantCount,
            'active_tenants' => $activeTenants,
            'users' => $userCount,
        ]);
    }

    // GET /super/activity
    public function activity()
    {
        // Example: return last 100 log entries
        $logs = Log::getMonolog()->getHandlers()[0]->getRecords() ?? [];
        return response()->json(['activity' => array_slice($logs, -100)]);
    }

    // POST /super/tenants/{id}/backup
    public function backupTenant($id)
    {
        $tenant = Tenant::findOrFail($id);
        $dbName = 'tenant_' . $tenant->id;
        $backupPath = storage_path("app/backups/{$dbName}_" . now()->format('Ymd_His') . ".sql");
        $command = "mysqldump -u " . env('DB_USERNAME') . " -p'" . env('DB_PASSWORD') . "' $dbName > $backupPath";
        $result = null;
        $output = null;
        exec($command, $output, $result);
        if ($result === 0) {
            return response()->json(['message' => 'Backup successful', 'path' => $backupPath]);
        } else {
            return response()->json(['error' => 'Backup failed', 'output' => $output], 500);
        }
    }
} 