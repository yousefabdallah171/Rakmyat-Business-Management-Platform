<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Task;
use App\Models\TaskTimeLog;
use App\Models\TaskAttachment;
use Illuminate\Support\Facades\Storage;

class TaskController extends Controller
{
    // PUT /api/tasks/{id}/status
    public function updateStatus(Request $request, $id)
    {
        $request->validate(['status' => 'required|string']);
        $task = Task::findOrFail($id);
        $task->status = $request->status;
        $task->save();
        return response()->json(['message' => 'Status updated', 'task' => $task]);
    }

    // POST /api/tasks/{id}/time
    public function logTime(Request $request, $id)
    {
        $request->validate(['minutes' => 'required|integer|min:1']);
        $log = TaskTimeLog::create([
            'task_id' => $id,
            'user_id' => $request->user()->id,
            'minutes' => $request->minutes,
            'logged_at' => now(),
        ]);
        return response()->json(['message' => 'Time logged', 'log' => $log]);
    }

    // GET /api/tasks/{id}/time
    public function getTimeLogs($id)
    {
        $logs = TaskTimeLog::where('task_id', $id)->with('user')->get();
        return response()->json(['logs' => $logs]);
    }

    // POST /api/tasks/{id}/attach
    public function attachFile(Request $request, $id)
    {
        $request->validate(['file' => 'required|file']);
        $file = $request->file('file');
        $path = $file->store('task_attachments');
        $attachment = TaskAttachment::create([
            'task_id' => $id,
            'user_id' => $request->user()->id,
            'file_path' => $path,
            'uploaded_at' => now(),
        ]);
        return response()->json(['message' => 'File attached', 'attachment' => $attachment]);
    }

    // GET /api/tasks/{id}/attachments
    public function getAttachments($id)
    {
        $attachments = TaskAttachment::where('task_id', $id)->with('user')->get();
        return response()->json(['attachments' => $attachments]);
    }
} 