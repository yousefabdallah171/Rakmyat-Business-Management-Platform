<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;

class RolePermissionTest extends TestCase
{
    use RefreshDatabase;

    public function test_admin_can_access_admin_route()
    {
        $admin = User::factory()->create(['role' => 'admin']);
        $this->actingAs($admin, 'sanctum');
        $response = $this->getJson('/api/admin-only');
        $response->assertOk();
    }

    public function test_client_cannot_access_admin_route()
    {
        $client = User::factory()->create(['role' => 'client']);
        $this->actingAs($client, 'sanctum');
        $response = $this->getJson('/api/admin-only');
        $response->assertForbidden();
    }
} 