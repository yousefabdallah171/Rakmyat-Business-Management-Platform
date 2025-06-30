<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Invoice;
use App\Models\Expense;
use Barryvdh\DomPDF\Facade\Pdf;
use Stripe\Stripe;
use Stripe\PaymentIntent;
use Illuminate\Support\Facades\Storage;

class AccountingController extends Controller
{
    // POST /api/invoices
    public function createInvoice(Request $request)
    {
        $request->validate([
            'client_id' => 'required|integer',
            'amount' => 'required|numeric',
            'status' => 'required|string',
            'due_date' => 'required|date',
        ]);
        $invoice = Invoice::create($request->all());
        return response()->json(['invoice' => $invoice]);
    }

    // GET /api/invoices/{id}/pdf
    public function invoicePdf($id)
    {
        $invoice = Invoice::findOrFail($id);
        $pdf = Pdf::loadView('pdf.invoice', ['invoice' => $invoice]);
        return $pdf->download("invoice_{$invoice->id}.pdf");
    }

    // POST /api/expenses
    public function createExpense(Request $request)
    {
        $request->validate([
            'user_id' => 'required|integer',
            'amount' => 'required|numeric',
            'category' => 'required|string',
            'date' => 'required|date',
        ]);
        $expense = Expense::create($request->all());
        return response()->json(['expense' => $expense]);
    }

    // GET /api/expenses/report
    public function expensesReport(Request $request)
    {
        $month = $request->query('month', now()->format('m'));
        $year = $request->query('year', now()->format('Y'));
        $expenses = Expense::whereMonth('date', $month)->whereYear('date', $year)->get();
        $total = $expenses->sum('amount');
        return response()->json(['month' => $month, 'year' => $year, 'total' => $total, 'expenses' => $expenses]);
    }

    // POST /api/invoices/{id}/pay
    public function payInvoice(Request $request, $id)
    {
        $invoice = Invoice::findOrFail($id);
        $request->validate(['payment_method_id' => 'required|string']);
        Stripe::setApiKey(config('services.stripe.secret'));
        $intent = PaymentIntent::create([
            'amount' => intval($invoice->amount * 100),
            'currency' => 'usd',
            'payment_method' => $request->payment_method_id,
            'confirmation_method' => 'manual',
            'confirm' => true,
        ]);
        $invoice->status = 'paid';
        $invoice->save();
        return response()->json(['message' => 'Invoice paid', 'intent' => $intent]);
    }

    // GET /api/reports/financial
    public function financialReport(Request $request)
    {
        $year = $request->query('year', now()->format('Y'));
        $income = Invoice::where('status', 'paid')->whereYear('due_date', $year)->sum('amount');
        $expenses = Expense::whereYear('date', $year)->sum('amount');
        $profit = $income - $expenses;
        return response()->json([
            'year' => $year,
            'income' => $income,
            'expenses' => $expenses,
            'profit' => $profit,
        ]);
    }
} 