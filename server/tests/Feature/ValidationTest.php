<?php

namespace Tests\Feature;

use Tests\TestCase;
use Illuminate\Foundation\Testing\RefreshDatabase;

class ValidationTest extends TestCase
{
    use RefreshDatabase;

    public function test_register_requires_email_and_password()
    {
        $response = $this->postJson('/api/register', []);
        $response->assertStatus(422)
            ->assertJsonValidationErrors(['email', 'password']);
    }
} 