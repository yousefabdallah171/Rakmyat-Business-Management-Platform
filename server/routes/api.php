use App\Http\Controllers\TenantRegistrationController;
use App\Http\Controllers\RegistrationController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\PasswordResetController;
use App\Http\Controllers\ProjectController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\AccountingController;
use App\Http\Controllers\ChatController;
use App\Http\Controllers\SuperAdminController;

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::post('/password/email', [PasswordResetController::class, 'sendResetLinkEmail']);
Route::post('/password/reset', [PasswordResetController::class, 'reset']);

Route::middleware(['auth:sanctum'])->group(function () {
    Route::get('/user', [AuthController::class, 'user']);
    Route::post('/logout', [AuthController::class, 'logout']);
});

Route::middleware(['tenant.subdomain'])->group(function () {
    // Place tenant-specific routes here
    Route::get('/tenant-test', function () {
        return response()->json(['message' => 'Tenant route accessed!']);
    });
});

Route::middleware(['auth:sanctum', 'tenant.subdomain'])->group(function () {
    Route::get('/projects/{id}/board', [ProjectController::class, 'board']);
    Route::put('/tasks/{id}/status', [TaskController::class, 'updateStatus']);
    Route::post('/tasks/{id}/time', [TaskController::class, 'logTime']);
    Route::get('/tasks/{id}/time', [TaskController::class, 'getTimeLogs']);
    Route::post('/tasks/{id}/attach', [TaskController::class, 'attachFile']);
    Route::get('/tasks/{id}/attachments', [TaskController::class, 'getAttachments']);
    Route::post('/invoices', [AccountingController::class, 'createInvoice']);
    Route::get('/invoices/{id}/pdf', [AccountingController::class, 'invoicePdf']);
    Route::post('/expenses', [AccountingController::class, 'createExpense']);
    Route::get('/expenses/report', [AccountingController::class, 'expensesReport']);
    Route::post('/invoices/{id}/pay', [AccountingController::class, 'payInvoice']);
    Route::get('/reports/financial', [AccountingController::class, 'financialReport']);
    Route::get('/chat/messages', [ChatController::class, 'messages']);
    Route::post('/chat/send', [ChatController::class, 'send']);
});

Route::middleware(['auth:sanctum', 'role:super_admin'])->prefix('super')->group(function () {
    Route::get('/tenants', [SuperAdminController::class, 'tenants']);
    Route::put('/tenants/{id}', [SuperAdminController::class, 'updateTenant']);
    Route::get('/stats', [SuperAdminController::class, 'stats']);
    Route::get('/activity', [SuperAdminController::class, 'activity']);
    Route::post('/tenants/{id}/backup', [SuperAdminController::class, 'backupTenant']);
});

Route::middleware(['throttle:60,1'])->group(function () {
    // Place all existing API routes here
}); 