<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Project;
use App\Models\Task;

class ProjectController extends Controller
{
    // GET /api/projects/{id}/board
    public function board($id)
    {
        $project = Project::findOrFail($id);
        $tasks = Task::where('project_id', $id)->get()->groupBy('status');
        return response()->json([
            'project' => $project,
            'board' => $tasks,
        ]);
    }
} 