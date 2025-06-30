<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\Tenant;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class TenantIsolationTest extends TestCase
{
    use RefreshDatabase;

    public function test_tenant_cannot_access_other_tenant_data()
    {
        $tenantA = Tenant::factory()->create();
        $tenantB = Tenant::factory()->create();
        $userA = User::factory()->create(['tenant_id' => $tenantA->id]);
        $userB = User::factory()->create(['tenant_id' => $tenantB->id]);

        $this->actingAs($userA, 'sanctum');
        $response = $this->getJson("/api/employees?tenant_id={$tenantB->id}");
        $response->assertForbidden(); // or assertStatus(403/404)
    }
} 