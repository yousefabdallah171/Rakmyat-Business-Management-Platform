<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;
use App\Models\Invoice;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Mockery;
use Stripe\Stripe;
use Stripe\PaymentIntent;

class PaymentTest extends TestCase
{
    use RefreshDatabase;

    public function test_invoice_payment()
    {
        $user = User::factory()->create();
        $invoice = Invoice::factory()->create(['status' => 'sent']);
        $this->actingAs($user, 'sanctum');

        // Mock Stripe
        Stripe::shouldReceive('setApiKey')->once();
        PaymentIntent::shouldReceive('create')->once()->andReturn((object)['id' => 'pi_123']);

        $response = $this->postJson("/api/invoices/{$invoice->id}/pay", [
            'payment_method_id' => 'pm_test',
        ]);
        $response->assertOk()->assertJson(['message' => 'Invoice paid']);
    }
} 