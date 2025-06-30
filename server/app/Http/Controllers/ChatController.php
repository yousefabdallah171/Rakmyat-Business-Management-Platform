<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Message;
use App\Events\MessageSent;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Auth;

class ChatController extends Controller
{
    // GET /api/chat/messages
    public function messages(Request $request)
    {
        $tenantId = tenant('id');
        $messages = Message::where('tenant_id', $tenantId)
            ->orderBy('created_at', 'asc')
            ->get();
        return response()->json(['messages' => $messages]);
    }

    // POST /api/chat/send
    public function send(Request $request)
    {
        $request->validate([
            'content' => 'nullable|string',
            'receiver_id' => 'nullable|integer',
            'file' => 'nullable|file',
        ]);
        $tenantId = tenant('id');
        $fileUrl = null;
        if ($request->hasFile('file')) {
            $file = $request->file('file');
            $fileUrl = Storage::disk('s3')->putFile('chat', $file);
            $fileUrl = Storage::disk('s3')->url($fileUrl);
        }
        $message = Message::create([
            'tenant_id' => $tenantId,
            'sender_id' => $request->user()->id,
            'receiver_id' => $request->receiver_id,
            'content' => $request->content,
            'attachment' => $fileUrl,
        ]);
        broadcast(new MessageSent($tenantId, $message->content, $message->sender_id, $message->receiver_id, $fileUrl))->toOthers();
        return response()->json(['message' => $message]);
    }
} 